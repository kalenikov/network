import React from 'react';
import s from './Post.module.css'

const Post = (props) => {
    return <div className={s.item}>
        <img src={'https://avatars.mds.yandex.net/get-pdb/1066918/2d75c329-6a10-4b4b-8d87-8303d2eeb4a1/s1200'}/>
        {props.message}
        <div>
            <span>like</span>
        </div>
    </div>
}

export default Post