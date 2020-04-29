import {AuthAPI, SecurityAPI} from '../api/api'
import {stopSubmit} from 'redux-form'

const SET_USER_DATA = 'SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: ''
}

const authReducer = (state = initialState, action) => {
    // debugger
    switch (action.type) {
        case SET_USER_DATA:
            // debugger
            return {...state, ...action.payload}
        case GET_CAPTCHA_URL_SUCCESS:
            return {...state, ...action.payload}
        default:
            return {...state}
    }

}

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})

export const getCaptchaUrlSuccess = captchaUrl => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
})


export const getAuthUserData = () => async dispatch => {
    let response = await AuthAPI.me()

    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))

    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await AuthAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {

        if (response.data.resultCode === 10) {
        }

        let message = response.data.message.length > 0 ? response.data.message[0] : 'some error'
        dispatch(stopSubmit('login', {_error: message}))

    }
}

export const getCaptchaURL = () => async (dispatch) => {
    let response = await SecurityAPI.getCaptchaURL()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch) => {
    let response = await AuthAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer