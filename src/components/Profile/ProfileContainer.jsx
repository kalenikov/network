import React from 'react';
import Profile from './Profile'
import {connect} from 'react-redux'
import {getUserProfile} from '../../redux/profile-reducer'
import {Redirect, withRouter} from 'react-router-dom'
import {withAuthRedirect} from '../hoc/WithAuthRedirect'
import {compose} from 'redux'

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = 2
        }
        this.props.getUserProfile(userId)
    }

    render() {

        return <div>
            <Profile {...this.props} profile={this.props.profile}/>
        </div>
    }

}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})

// создаем сверху еще одну контейнерную компнонету, чтобы делать запросы на сервер
// export default connect(mapStateToProps, {getUserProfile})(withRouter(AuthRedirectComponent))

export  default  compose(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    // withAuthRedirect,
)(ProfileContainer)