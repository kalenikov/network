import React from 'react';
import Profile from './Profile'
import * as axios from 'axios'
import {connect} from 'react-redux'
import {setUserProfile} from '../../redux/profile-reducer'
import {withRouter} from 'react-router-dom'


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId){
            userId = 2
        }
        const url = `https://social-network.samuraijs.com/api/1.0/profile/${userId}`
        axios.get(url).then(response => {
            this.props.setUserProfile(response.data)
        })
    }

    render() {
        // debugger
        return <div>
            <Profile {...this.props} profile={this.props.profile}/>
        </div>
    }

}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

// создаем сверху еще одну контейнерную компнонету, чтобы делать запросы на сервер
export default connect(mapStateToProps, {setUserProfile})(withRouter(ProfileContainer))