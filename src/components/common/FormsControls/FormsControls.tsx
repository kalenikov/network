import React from 'react';
import styles from './FormsControls.module.css'
import {required, FieldValidatorTypes} from '../../../utils/validators/validators'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from 'redux-form'

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}


type FormControlType = (params: FormControlPropsType) => React.ReactNode

const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
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


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restprops} = props
    return <FormControl {...props}>
        <textarea {...input}{...restprops} />
    </FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restprops} = props
    return <FormControl {...props}>
        <input {...input}{...restprops} />
    </FormControl>
}


export function createField<KeysTypes extends string>(placeholder: string | undefined,
                                       name: KeysTypes,
                                       validators: Array<FieldValidatorTypes>,
                                       component: React.FC<WrappedFieldProps>,
                                       props = {},
                                       text = '') {
    return <div>
        <Field component={component}
               type="text"
               name={name}
               placeholder={placeholder}
               validate={validators}
               {...props}/>{text}
    </div>
}

export type GetStringKeys<T> = Extract<keyof T, string>
