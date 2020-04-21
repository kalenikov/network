import {AuthAPI} from '../api/api'
import {stopSubmit} from 'redux-form'

const SET_USER_DATA = 'SET_USER_DATA'

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    // debugger
    switch (action.type) {
        case SET_USER_DATA:
            // debugger
            return {...state, ...action.payload}
        default:
            return {...state}
    }

}

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})

export const getAuthUserData = () => (dispatch) => {
    return AuthAPI.me().then(response => {
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    })
}

export const login = (email, password, rememberMe) => (dispatch) => {

    AuthAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            } else {
                let message = response.data.message.length > 0 ? response.data.message[0]: 'some error'
                dispatch(stopSubmit('login',{_error: message}))
            }
        })
}

export const logout = () => (dispatch) => {
    AuthAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
}


export default authReducer