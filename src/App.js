import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";

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

    catchAllUnhandledErrors = (promiceRejectionEvent)=>{

    }

    componentDidMount() {
        this.props.initializeApp()

        window.addEventListener("unhandledrejection", event => {
            console.log(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
        });
    }


    componentWillUnmount() {
        window.removeEventListener('unhandledrejection')
    }

    render() {

        if (!this.props.initialized) return <Preloader/>

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                        <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                        <Route path='/profile' render={withSuspense(ProfileContainer)}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                    </Switch>
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
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SamuraiJSApp
