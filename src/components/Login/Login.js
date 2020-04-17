import React from 'react'
import {reduxForm, Field} from 'redux-form'

const LoginForm = props => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component="input" type="text" name={'login'} placeholder={'Login'}/>
        </div>
        <div>
            <Field component="input" type="text" name={'password'} placeholder={'Password'}/>
        </div>
        <div>
            <Field component="input" name={'rememberMe'} type={'checkbox'}/>Запомнить меня
        </div>
        <div>
            <button>login</button>
        </div>
    </form>
}

const ReduxLoginForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = props => {

    const onSubmit = formData =>{
        console.log(formData)
    }

    return <div>
        <h1>login</h1>
        <ReduxLoginForm onSubmit={onSubmit}/>
    </div>
}

export default Login