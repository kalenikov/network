import React from 'react';
import s from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader'

const ProfileInfo = (props) => {
    // debugger

    if (!props.profile){
        return <Preloader/>
    }

    return <div>
        <div>
            <img
                src={'https://img2.freepng.ru/20180511/htq/kisspng-the-law-office-of-steve-slough-business-medicine-m-5af52751a56ac3.3981210115260158256776.jpg'}/>
        </div>

        <div className={s.descriptionBlock}>
            <img src={props.profile.photos.large} />
            ava + description
        </div>

    </div>
}

export default ProfileInfo