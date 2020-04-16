import React from 'react';
import style from './Users.module.css'
import userPhoto from '../../assets/images/user.jpg'
import {NavLink} from 'react-router-dom'
import * as axios from 'axios'
import {UsersAPI} from '../../api/api'

let Users = props => {

    console.log('followingInProgress', props.followingInProgress)
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map(i => {
                return <span className={props.currentPage === i && style.selectedPage}
                             onClick={() => props.onPageChanged(i)}>{i}</span>
            })}
            <div>current page {props.currentPage}</div>
            <div>totalUsersCount {props.totalUsersCount}</div>
        </div>
        {props.users.map(user => <div id={user.id} key={user.id}>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small == null ? userPhoto : user.photos.small}
                             className={style.userPhoto}/>
                    </NavLink>
                    </div>
                <div>
                    {user.followed
                        ? <button
                            disabled={props.followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                props.unfollow(user.id)
                            }}>Unfollow</button>

                        : <button
                            disabled={props.followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                props.follow(user.id)
                            }}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status} </div>
                </span>
                <span>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                </span>
            </span>
        </div>)}
    </div>
}

export default Users