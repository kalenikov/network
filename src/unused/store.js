import dialogsReducer from '../redux/dialogs-reducer'
import sidebarReducer from '../redux/sidebar-reducer'
import profileReducer from '../redux/profile-reducer'


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


// props.setUsers([
//     {
//         id: 1,
//         photoUrl: 'https://media.moddb.com/images/members/5/4162/4161743/ao_11111.jpg',
//         followed: false,
//         fullName: 'Dmitry',
//         status: 'ON-LINE',
//         location: {sity: 'MINSK', country: 'RU'}
//     },
//     {
//         id: 2,
//         photoUrl: 'https://media.moddb.com/images/members/5/4162/4161743/ao_11111.jpg',
//         followed: true,
//         fullName: 'Sasha',
//         status: 'ON-LINE',
//         location: {sity: 'MINSK', country: 'RU'}
//     },
//     {
//         id: 3,
//         photoUrl: 'https://media.moddb.com/images/members/5/4162/4161743/ao_11111.jpg',
//         followed: false,
//         fullName: 'Andrew',
//         status: 'ON-LINE',
//         location: {sity: 'MINSK', country: 'RU'}
//     }])

export default store