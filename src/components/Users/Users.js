import React from 'react';
import style from './Users.module.css'
import userPhoto from '../../assets/images/user.jpg'
import {NavLink} from 'react-router-dom'
import * as axios from 'axios'
import {UsersAPI} from '../../api/api'
import Paginator from '../common/Paginator/Paginator'
import User from './User'

let Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {

    return <div>
        <Paginator currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount}
                   pageSize={pageSize}

        />
        {users.map(user => <User user={user}
                                 key={user.id}
                                 followingInProgress={props.followingInProgress}
                                 unfollow={props.unfollow}
                                 follow={props.follow}/>)}
    </div>
}

export default Users