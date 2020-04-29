import React from 'react'
import {reduxForm, Field} from 'redux-form'
import {createField, Input} from '../common/FormsControls/FormsControls'
import {required} from '../../utils/validators/validators'
import {connect} from 'react-redux'
import {login} from '../../redux/auth-reducer'
import {Redirect} from 'react-router-dom'
import style from '../common/FormsControls/FormsControls.module.css'

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return <form onSubmit={handleSubmit}>

        {createField('Email', 'email', [required], Input)}
        {createField('Password', 'password', [required], Input, {type: 'password'})}
        {createField(null, 'rememberMe', [], Input, {type: 'checkbox'})}

        {captchaUrl && <img src={captchaUrl}/>}
        {captchaUrl && createField('Symbols from image', 'captcha', [], Input)}}

        {error && <div className={style.formSummaryError}>
            {error}
        </div>}
        <div>
            <button>login</button>
        </div>
    </form>
}

const ReduxLoginForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = props => {

    const onSubmit = formData => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
        console.log(formData)
    }

    if (props.isAuth) {
        // if (true) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>login</h1>
        <ReduxLoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}


const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}
export default connect(mapStateToProps, {login})(Login)