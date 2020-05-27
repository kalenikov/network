import React, {FC} from 'react';
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import {UserType} from "../../types/types"

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    users: Array<UserType>,
    followingInProgress: Array<number>,
    unfollow: (userId: number)=> void
    follow: (userId: number)=> void
}

let Users: FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {

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