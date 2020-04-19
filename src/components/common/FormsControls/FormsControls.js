import React from 'react';
import styles from './FormsControls.module.css'

const FormControl = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
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