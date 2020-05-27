import {getAuthUserData} from './auth-reducer'
import {SecurityAPI} from "../api/security-api"
import {InferActionsTypes} from "./redux-store"


const initialState = {
    initialized: false,
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {...state, initialized: true}
        default:
            return {...state}
    }

}

export const actions = {
    initializedSucces: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = () => (dispatch: any) => {
    let dispatchResult = dispatch(getAuthUserData())
    dispatchResult.then(() => {
        dispatch(actions.initializedSucces())
    })
}


export const getCaptchaURL = () => async (dispatch: any) => {
    let response = await SecurityAPI.getCaptchaURL()
    const captchaUrl = response.url
    // dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default appReducer
