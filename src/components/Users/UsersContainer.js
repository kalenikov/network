import React from 'react';
import {connect} from 'react-redux'
import Users from './Users'
import {followAC, setUserAC, unfollowAC} from '../../redux/users-reducer'

let mapStateToProps = state => {
    return {
        users: state.usersPage.users,
    }
}
// передаем колбэки в презентационную компоненту
let mapDispatchToProps = dispatch => {
    return {
        follow: (userId) => dispatch(followAC(userId)),
        unfollow: (userId) => dispatch(unfollowAC(userId)),
        setUsers: users => dispatch(setUserAC(users))
    }
}

let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
export default UsersContainer