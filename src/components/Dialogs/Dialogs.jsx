import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from 'redux-form'
import {Textarea} from '../common/FormsControls/FormsControls'
import {maxLenghtCreator, required} from '../../utils/validators/validators'

const Dialogs = (props) => {

    let state = props.dialogsPage
    let dialogsElements = state.dialogs.map(item => <DialogItem name={item.name} key={item.id} id={item.id}/>)
    let messagesElements = state.messages.map(item => <Message message={item.message} key={item.id} id={item.id}/>)

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}
const maxLenght10 = maxLenghtCreator(10)
const AddMessageForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea}
                   name={'newMessageBody'}
                   placeholder={'enter message'}
                   validate={[required, maxLenght10]}
            />
        </div>
        <div>
            <button>send</button>
        </div>
    </form>
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs