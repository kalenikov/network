const SET_USER_DATA = 'SET_USER_DATA'

const initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    // debugger
    switch (action.type) {
        case SET_USER_DATA:
            // debugger
            return {...state, ...action.data, isAuth: true}
        default:
            return {...state}
    }

}

export const setAuthUserData = (id, email, login) => ({type: SET_USER_DATA, data: {id, email, login}})

export default authReducer