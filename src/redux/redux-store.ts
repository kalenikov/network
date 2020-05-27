import {Action, applyMiddleware, combineReducers, createStore} from 'redux'
import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import thunk, {ThunkAction} from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from './app-reducer'
import {createLogger} from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension';

const logger = createLogger({
    collapsed: () => true,
    predicate: (getState, action) => !action.type.includes('@@redux-form'),
    level: 'log',
});

let rootReducer = combineReducers({
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        sidebar: sidebarReducer,
        usersPage: usersReducer,
        auth: authReducer,
        form: formReducer,
        app: appReducer
    }
)

export type InferActionsTypes<T> = T extends {[keys: string]: (...args: any[])=> infer U} ? U : never

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

let store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(
        thunk,
        logger,
    )))

// @ts-ignore
window.__store__ = store

export default store
