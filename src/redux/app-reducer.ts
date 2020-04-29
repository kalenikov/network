import {getAuthUserData} from './auth-reducer'

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

const initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true}
        default:
            return {...state}
    }

}

export const initializedSucces = () => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => dispatch => {
    let dispatchResult = dispatch(getAuthUserData())
    dispatchResult.then(() => {
        dispatch(initializedSucces())
    })
}

export default appReducer