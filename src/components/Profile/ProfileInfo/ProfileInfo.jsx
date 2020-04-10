import React from 'react';
import s from './ProfileInfo.module.css'

const ProfileInfo = () => {
    return <div>
        <div>
            <img
                src={'https://img2.freepng.ru/20180511/htq/kisspng-the-law-office-of-steve-slough-business-medicine-m-5af52751a56ac3.3981210115260158256776.jpg'}/>
        </div>

        <div className={s.descriptionBlock}>ava + description</div>

    </div>
}

export default ProfileInfo