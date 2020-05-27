import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {AppStateType} from "../../redux/redux-store"

let mapStateToPropsRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

type MapPropsType = {
    isAuth: boolean
}


type DispatchToProps = {

}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapPropsType & DispatchToProps> = (props) => {
        let {isAuth, ...restProps} = props

        if (isAuth) return <Redirect to={'/login'}/>

        return <WrappedComponent {...restProps as unknown as WCP}/>
    }


    let ConnectedRedirectComponent = connect<MapPropsType, DispatchToProps, WCP, AppStateType>(
        mapStateToPropsRedirect)(RedirectComponent)

    return ConnectedRedirectComponent
}

