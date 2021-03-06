import {FormAction, stopSubmit} from 'redux-form'
import {PhotosType, PostType, ProfileType} from '../types/types'
import {UsersAPI} from "../api/users-api"
import {profileAPI} from "../api/profile-api"
import {BaseThunkType, InferActionsTypes} from "./redux-store"


const initialState = {
    posts: [
        {id: 1, message: 'post1', likesCount: 10},
        {id: 2, message: 'post2', likesCount: 20},
        {id: 3, message: 'post3', likesCount: 30}] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'SM/PROFILE/ADD-POST': {
            return {
                ...state,
                posts: [{
                    id: 5,
                    message: action.newPostText,
                    likesCount: 50
                }, ...state.posts,],
            }

        }
        case 'SM/PROFILE/DELETE_POST':
            return {...state, posts: state.posts.filter(item => item.id != action.id)}
        case 'SM/PROFILE/SET_USER_PROFILE':
            return {...state, profile: action.profile}
        case 'SM/PROFILE/SAVE_PHOTO_SUCCESS':
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        case 'SM/PROFILE/SET_STATUS':
            return {...state, status: action.status}
        default:
            return state
    }

}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'SM/PROFILE/ADD-POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SM/PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SM/PROFILE/SET_STATUS', status} as const),
    deletePost: (id: number) => ({type: 'SM/PROFILE/DELETE_POST', id} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SM/PROFILE/SAVE_PHOTO_SUCCESS', photos} as const),
}


export const getUserProfile = (userId: number): ThunkType => async (dispatch: any) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(response))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(response))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const id = getState().auth.userId
    let data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if (id !== null) {
            dispatch(getUserProfile(id))
        } else {
            throw new Error('user id can`t be null')
        }
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
