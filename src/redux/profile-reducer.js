import {profileAPI, UsersAPI} from '../api/api'
import {stopSubmit} from 'redux-form'

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'


const initialState = {
    posts: [
        {id: 1, message: 'post1', likesCount: 10},
        {id: 2, message: 'post2', likesCount: 20},
        {id: 3, message: 'post3', likesCount: 30}],
    profile: null,
    status: ''
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts: [{
                    id: 5,
                    message: action.newPostText,
                    likesCount: 50
                }, ...state.posts,],
            }

        }
        case DELETE_POST:
            return {...state, posts: state.posts.filter(item => item.id != action.id)}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        case SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos}}
        case SET_STATUS:
            return {...state, status: action.status}
        default:
            return state
    }

}

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})
export const setUserProfile = profile => ({type: SET_USER_PROFILE, profile})
export const setStatus = status => ({type: SET_STATUS, status})
export const deletePost = id => ({type: DELETE_POST, id})
export const savePhotoSuccess = photos => ({type: SAVE_PHOTO_SUCCESS, photos})


export const getUserProfile = userId => async (dispatch) => {
    let response = await UsersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatus = userId => async dispatch => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
}

export const updateStatus = status => async dispatch => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(response.data))
    }
}

export const savePhoto = file => async dispatch => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = profile => async (dispatch, getState) => {
    const id = getState().auth.userId
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(id))
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer