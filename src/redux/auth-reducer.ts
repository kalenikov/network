import {ResultCodeEnum} from '../api/api'
import {FormAction, stopSubmit} from 'redux-form'
import {AuthAPI} from "../api/auth-api"
import {SecurityAPI} from "../api/security-api"
import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {Action} from "redux"

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {...state, ...action.payload}
        case 'GET_CAPTCHA_URL_SUCCESS':
            return {...state, ...action.payload}
        default:
            return {...state}
    }
}


export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let response = await AuthAPI.me()
    if (response.resultCode === ResultCodeEnum.Success) {
        let {id, login, email} = response.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let data = await AuthAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : 'some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const getCaptchaURL = (): ThunkType => async (dispatch: any) => {
    let response = await SecurityAPI.getCaptchaURL()
    const captchaUrl = response.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch: any) => {
    let response = await AuthAPI.logout()
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA',
        payload: {userId, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'GET_CAPTCHA_URL_SUCCESS',
        payload: {captchaUrl}
    } as const)
}

export default authReducer


export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
