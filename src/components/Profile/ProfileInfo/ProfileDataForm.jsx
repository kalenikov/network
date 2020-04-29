import React from 'react'
import s from './ProfileInfo.module.css'
import userPhoto from '../../../assets/images/user.jpg'
import {createField, Input, Textarea} from '../../common/FormsControls/FormsControls'
import {reduxForm} from 'redux-form'
import style from '../../common/FormsControls/FormsControls.module.css'

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <button>save</button>
        </div>

        <div className={s.descriptionBlock}>
            <div>
                full name:
                {createField('full name', 'fullName', [], Input)}
            </div>
            <div>
                looking for a job:
                {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                my skills:
                {createField('my skills', 'lookingForAJobDescription', [], Textarea,)}
            </div>
            <div>
                about me:
                {createField('about me', 'aboutMe', [], Textarea,)}
            </div>
            <div>
                {Object.keys(profile.contacts).map(key => {
                        return <div
                            className={s.contact}
                            key={key}>
                            <b>
                                {key}: {createField(key, 'contacts.'+key,[], Input)}
                            </b>
                        </div>
                    }
                )}
            </div>
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
        </div>
    </form>
}
const ReduxProfileDataForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ReduxProfileDataForm
