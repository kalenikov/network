import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, HashRouter, Route, withRouter} from "react-router-dom";

import UsersContainer from './components/Users/UsersContainer'
import s from './App.css' //не удалять!

import HeaderContainer from './components/Header/HeaderContainer'
import React from 'react'
import Login from './components/Login/Login'
import {connect, Provider} from 'react-redux'
import {compose} from 'redux'
import {initializeApp} from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader'
import store from './redux/redux-store'
// import ProfileContainer from './components/Profile/ProfileContainer'
import {withSuspense} from './components/hoc/withSuspense'

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {

        if (!this.props.initialized) return <Preloader/>

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                    <Route path='/profile' render={withSuspense(ProfileContainer)}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        initialized: state.app.initialized
    }

}

let AppContainer = compose(
    connect(mapStateToProps, {initializeApp}),
    withRouter)
(App)

let SamuraiJSApp = props => {
    // return <HashRouter basename={process.ENV.PUBLIC_URL}>
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}

export default SamuraiJSApp
