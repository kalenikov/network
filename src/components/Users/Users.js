import React from 'react';
import style from './Users.module.css'
import * as axios from 'axios'
import userPhoto from '../../assets/images/user.jpg'

let Users = props => {

    let getUsers = () => {
        if (props.users.length === 0) {

            const url = 'https://social-network.samuraijs.com/api/1.0/users'

            axios.get(url).then(response => {
                props.setUsers(response.data.items)
            })
        }
    }
    return <div>
        <button onClick={getUsers}>Get users</button>
        {props.users.map(user => <div id={user.id}>
            <span>
                <div>
                    <img src={user.photos.small == null ? userPhoto : user.photos.small} className={style.userPhoto}/>
                </div>
                <div>
                    {user.followed
                        ? <button onClick={() => props.unfollow(user.id)}>Unfollow</button>
                        : <button onClick={() => props.follow(user.id)}>Follow</button>}
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