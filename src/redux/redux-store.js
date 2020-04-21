import {applyMiddleware, combineReducers, createStore} from 'redux'
import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import thunk from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from './app-reducer'
import {createLogger} from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension';

const logger = createLogger({
    collapsed: () => (true),
    predicate: (getState, action) => !action.type.includes('@@redux-form'),
    level: 'log',
});

let reducers = combineReducers({
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        sidebar: sidebarReducer,
        usersPage: usersReducer,
        auth: authReducer,
        form: formReducer,
        app: appReducer
    }
)
let store = createStore(reducers,
    composeWithDevTools(applyMiddleware(
        thunk,
        logger,
    )))

window.store = store

export default store