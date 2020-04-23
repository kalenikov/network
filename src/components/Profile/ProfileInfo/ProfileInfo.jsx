import React from 'react';
import s from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatusHooks from './ProfileStatusHooks'
import ProfileStatus from './ProfileStatus'

const ProfileInfo = ({profile, status, updateStatus}) => {
    // debugger

    if (!profile) {
        return <Preloader/>
    }

    return <div>
        <div className={s.descriptionBlock}>
            <img src={profile.photos.large} alt={''}/>
            <ProfileStatusHooks status={status} updateStatus={updateStatus}/>
        </div>

    </div>
}

export default ProfileInfo