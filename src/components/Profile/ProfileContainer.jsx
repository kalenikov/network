import React from 'react';
import Profile from './Profile'
import {connect} from 'react-redux'
import {getUserProfile} from '../../redux/profile-reducer'
import {Redirect, withRouter} from 'react-router-dom'

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = 2
        }
        this.props.getUserProfile(userId)
    }

    render() {
        // debugger

        if (!this.props.isAuth) {
            return <Redirect to={'/login'}/>
        }

        return <div>
            <Profile {...this.props} profile={this.props.profile}/>
        </div>
    }

}

let AuthRedirectComponent = props => {
    if (!props.isAuth) {
        return <Redirect to={'/login'}/>
    }
    return <ProfileContainer {...props} />
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

// создаем сверху еще одну контейнерную компнонету, чтобы делать запросы на сервер
export default connect(mapStateToProps, {getUserProfile})(withRouter(AuthRedirectComponent))