import React from 'react';
import styles from './FormsControls.module.css'
import {required} from '../../../utils/validators/validators'
import {Field} from 'redux-form'

const FormControl = ({input, meta:{touched, error}, children}) => {
    const hasError = touched && error
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, ...restprops} = props
    return <FormControl {...props}>
        <textarea {...input}{...restprops} />
    </FormControl>
}

export const Input = (props) => {
    const {input, meta, ...restprops} = props
    return <FormControl {...props}>
        <input {...input}{...restprops} />
    </FormControl>
}

export const createField = (placeholder, name, validators, component, props = {}, text='') => {
    return <div>
        <Field component={component}
               type="text"
               name={name}
               placeholder={placeholder}
               validate={validators}
               {...props}/>{text}
    </div>
}
