import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {reduxForm, Field} from 'redux-form'

const Dialogs = (props) => {

    let state = props.dialogsPage

    let dialogsElements = state.dialogs.map(item => <DialogItem name={item.name} key={item.id} id={item.id}/>)
    let messagesElements = state.messages.map(item => <Message message={item.message} key={item.id} id={item.id}/>)
    let newMessageBody = state.newMessageBody

    let onSendMessageClick = () => {
        props.sendMessage()
    }
    let onNewMessageChange = e => {
        props.updateNewMessageBody(e.target.value)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux/>
            </div>
        </div>
    )


}


const AddMessageForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={'textarea'} name={'newMessageBody'} placeholder={'enter message'}/>
        </div>
        <div>
            <button>send</button>
        </div>
    </form>
}

const AddMessageFormRedux = reduxForm()(AddMessageForm)

export default Dialogs