import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import profileReducer from './profile-reducer'


let store = {

    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'post1', likesCount: 10},
                {id: 2, message: 'post2', likesCount: 20},
                {id: 3, message: 'post3', likesCount: 30}],
            newPostText: 'new post text'

        },
        dialogsPage: {
            messages: [
                {message: 'text1', id: 1},
                {message: 'text2', id: 2},
                {message: 'text3', id: 3}],

            dialogs: [
                {name: 'user1', id: 1},
                {name: 'user2', id: 2},
                {name: 'user3', id: 3},
            ],
            newMessageBody: ''
        },
        sidebar: {}
    },
    _callSubscriber() {
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebarReducer = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state)
    }

}



export default store