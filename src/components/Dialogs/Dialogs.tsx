import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {InitialStateType} from "../../redux/dialogs-reducer"
import AddMessageForm from './AddMessageForm/AddMessageForm';


type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (message: string) => void
}

export type NewMessageFormValuesType = {
    newMessageBody: string
}


const Dialogs: React.FC<PropsType> = (props) => {

    let state = props.dialogsPage
    let dialogsElements = state.dialogs.map(item => <DialogItem name={item.name} key={item.id} id={item.id}/>)
    let messagesElements = state.messages.map(item => <Message message={item.message} key={item.id} id={item.id}/>)

    let addNewMessage = (values: NewNessageFormType) => {
        props.sendMessage(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

export default Dialogs

export type NewNessageFormType = {
    newMessageBody: string
}
