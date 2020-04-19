import React from 'react'
import {reduxForm, Field} from 'redux-form'
import {Input} from '../common/FormsControls/FormsControls'
import {required} from '../../utils/validators/validators'
import {connect} from 'react-redux'
import {login} from '../../redux/auth-reducer'
import {Redirect} from 'react-router-dom'
import style from '../common/FormsControls/FormsControls.module.css'

const LoginForm = props => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Input} type="text" name={'email'} placeholder={'Email'}
                   validate={[required]}/>
        </div>
        <div>
            <Field component={Input} type="text" name={'password'} placeholder={'Password'}
                   validate={[required]}/>
        </div>
        <div>
            <Field component={Input} name={'rememberMe'} type={'checkbox'}/>Запомнить меня
        </div>
        {props.error && <div className={style.formSummaryError}>
            {props.error}
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
        props.login(formData.email, formData.password, formData.rememberMe)
        console.log(formData)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return <div>
        <h1>login</h1>
        <ReduxLoginForm onSubmit={onSubmit}/>
    </div>
}


const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth
    }
}
export default connect(null, {login})(Login)