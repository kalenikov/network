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
            ]
        }
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

        if (action.type === 'ADD-POST') {
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 50
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''
            this._callSubscriber(this._state)

        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newPostText
            this._callSubscriber(this._state)

        }
    }

}
export default store