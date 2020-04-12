const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

const initialState = {
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
}


const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            const body = state.newMessageBody
            state.newMessageBody = ''
            state.messages.push({id: 4, message: body})
            return state
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body
            return state
        default:
            return state
    }

}


export default dialogsReducer
export const sendMessageCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageBodyCreator = body => ({type: UPDATE_NEW_MESSAGE_BODY, body: body})