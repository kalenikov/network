import React from 'react';
import {connect} from 'react-redux'
import {
    follow,
    setCurrentPage,
    toogleIsFetching,
    setTotalUsersCount,
    setUsers,
    unfollow
} from '../../redux/users-reducer'
import * as axios from 'axios'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.toogleIsFetching(true)
        const url = `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
        axios.get(url, {withCredentials: true}).then(response => {
            this.props.toogleIsFetching(false)
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
        })
    }

    onPageChanged = pageNumber => {
        this.props.setCurrentPage(pageNumber)
        this.props.toogleIsFetching(true)
        const url = `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
        axios.get(url).then(response => {
            this.props.toogleIsFetching(false)
            this.props.setUsers(response.data.items)
        })
    }

    render() {
        // debugger
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   onPageChanged={this.onPageChanged}
                   pageSize={this.props.pageSize}/>
        </>
    }
}


let mapStateToProps = state => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}
// передаем колбэки в презентационную компоненту
// let mapDispatchToProps = dispatch => {
//     return {
//         follow: (userId) => dispatch(followAC(userId)),
//         unfollow: (userId) => dispatch(unfollowAC(userId)),
//         setUsers: users => dispatch(setUserAC(users)),
//         setCurrentPage: currentPage => dispatch(setCurrentPageAC(currentPage)),
//         setTotalUsersCount: totalUsersCount => dispatch(setTotalUsersCountAC(totalUsersCount)),
//         toogleIsFetching: isFetching => dispatch(toogleIsFetchingAC(isFetching)),
//     }
// }

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toogleIsFetching
})(UsersContainer)