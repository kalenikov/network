import {updateObjectInArray} from '../utils/object-helpers'
import {UserType} from "../types/types";
import {Dispatch} from "redux"
import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {UsersAPI} from "../api/users-api"

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 90,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
}


const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    // debugger
    switch (action.type) {
        case 'SM/USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case 'SM/USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case 'SM/USERS/SET_USERS':
            return {...state, users: action.users}
        case 'SM/USERS/SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'SM/USERS/SET_TOTAL_USER_COUNT':
            return {...state, totalUsersCount: action.totalUsersCount}
        case 'SM/USERS/TOOGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'SM/USERS/TOOGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state
    }
}


export const actions = {
    followSuccess: (userId: number) => ({type: 'SM/USERS/FOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SM/USERS/SET_USERS', users} as const),
    unfollowSuccess: (userId: number) => ({type: 'SM/USERS/UNFOLLOW', userId} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SM/USERS/SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'SM/USERS/SET_TOTAL_USER_COUNT',
        totalUsersCount
    } as const),
    toogleIsFetching: (isFetching: boolean) => ({type: 'SM/USERS/TOOGLE_IS_FETCHING', isFetching} as const),
    toogleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'SM/USERS/TOOGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)
}


export const requestUsers = (page: number,
                             pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.toogleIsFetching(true))
        dispatch(actions.setCurrentPage(page))

        let data = await UsersAPI.getUsers(page, pageSize)
        dispatch(actions.toogleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }

}


const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => ActionsTypes) => {

    dispatch(actions.toogleFollowingProgress(true, userId))

    let response = await apiMethod(userId)
    dispatch(actionCreator(userId))
    if (response.data.resultCode === 0) {
        dispatch(actions.toogleFollowingProgress(false, userId))
    }

}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, UsersAPI.follow.bind(UsersAPI), actions.followSuccess)
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, UsersAPI.unfollow.bind(UsersAPI), actions.unfollowSuccess)
}

export default usersReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

