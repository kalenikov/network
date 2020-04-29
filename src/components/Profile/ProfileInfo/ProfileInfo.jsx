import React, {useState} from 'react';
import s from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatusHooks from './ProfileStatusHooks'
import ProfileStatus from './ProfileStatus'
import userPhoto from '../../../assets/images/user.jpg'
import ProfileDataForm from './ProfileDataForm'


const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }


    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData)
            .then(() => setEditMode(false))

    }

    return (
        <div>
            <div className={s.descriptionBlock}>

                {editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData
                        profile={profile}
                        isOwner={isOwner}
                        goToEditMode={() => setEditMode(true)}/>
                }

                <ProfileStatusHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )


}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
        <div className={s.descriptionBlock}>
            <img src={profile.photos.large || userPhoto} alt={''}/>
            {isOwner && <input type={'file'}
                // onChange={onMainPhotoSelected}
            />}
            <div>
                full name: {profile.fullName}
            </div>
            <div>
                looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {profile.lookingForAJob &&
            <div>
                skills : {profile.lookingForAJobDescription}
            </div>}
            <div>
                {Object.keys(profile.contacts).map(key => <Contact
                    key={key}
                    contactTitle={key}
                    contactValue={profile.contacts[key]}/>)}
            </div>
        </div>
    </div>

}

const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}>
        {contactTitle}: {contactValue}
    </div>
}

export default ProfileInfo