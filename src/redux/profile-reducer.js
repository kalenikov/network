const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const initialState = {
    posts: [
        {id: 1, message: 'post1', likesCount: 10},
        {id: 2, message: 'post2', likesCount: 20},
        {id: 3, message: 'post3', likesCount: 30}],
    newPostText: 'new post text'
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 50
            }
            state.posts.push(newPost)
            state.newPostText = ''
            return state
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newPostText
            return state
        default:
            return state
    }

}

export const addPostActionCreator = () => ({type: ADD_POST})
export const updateNewPostTextActionCreator = text => ({type: UPDATE_NEW_POST_TEXT, newPostText: text})

export default profileReducer