import React from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator} from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs'

import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


let mapStateToProps = state => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body))
        },
        sendMessage: () => {
            dispatch(sendMessageCreator())
        },
    }
}

let AuthRedirectComponent = props => {
    if (!props.isAuth) {
        return <Redirect to={'/login'}/>
    }
    return <Dialogs {...props} />
}

let DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

export default DialogsContainer
