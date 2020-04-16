import {UsersAPI} from '../api/api'

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

const initialState = {
    posts: [
        {id: 1, message: 'post1', likesCount: 10},
        {id: 2, message: 'post2', likesCount: 20},
        {id: 3, message: 'post3', likesCount: 30}],
    newPostText: 'new post text',
    profile: null
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 50
            }
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost],
            }

        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newPostText
            }
        }

        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        default:
            return state
    }

}

export const addPostActionCreator = () => ({type: ADD_POST})
export const updateNewPostTextActionCreator = text => ({type: UPDATE_NEW_POST_TEXT, newPostText: text})
export const setUserProfile = profile => ({type: SET_USER_PROFILE, profile})

export const getUserProfile = userId => (dispatch) => {
    UsersAPI.getProfile(userId).then(response =>
        dispatch(setUserProfile(response.data))
    )
}

export default profileReducer