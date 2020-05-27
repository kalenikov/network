import {InferActionsTypes} from "./redux-store"

type DialogType = {
    id: number,
    name: string
}

type MessageType = {
    id: number,
    message: string
}

const initialState = {
    messages: [
        {message: 'text1', id: 1},
        {message: 'text2', id: 2},
        {message: 'text3', id: 3}] as Array<MessageType>,

    dialogs: [
        {name: 'user1', id: 1},
        {name: 'user2', id: 2},
        {name: 'user3', id: 3},
    ] as Array<DialogType>,
}


const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'SEND_MESSAGE':
            const body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, {id: 4, message: body}],
            }
        default:
            return state
    }
}


export const actions = {
    sendMessage: (newMessageBody: string) => ({
        type: 'SEND_MESSAGE',
        newMessageBody
    } as const)
}

export default dialogsReducer;

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
