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
}


const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            const body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 4, message: body}],
            }
        default:
            return state
    }

}


export default dialogsReducer
export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})
