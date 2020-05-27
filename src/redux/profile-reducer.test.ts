import React from 'react'
import profileReducer, {actions} from './profile-reducer'
import {ProfileType} from "../types/types"

const state = {
    posts: [
        {id: 1, message: 'post1', likesCount: 10},
        {id: 2, message: 'post2', likesCount: 20},
        {id: 3, message: 'post3', likesCount: 30}],
    profile: null,
    status: ''
}

it('new post should be add', () => {
    let action = actions.addPostActionCreator('new post')
    let new_state = profileReducer(state, action)
    expect(new_state.posts.length).toBe(4)

})

it('message of new post should be', () => {
    let action = actions.addPostActionCreator('new post')
    let new_state = profileReducer(state, action)
    expect(new_state.posts[0].message).toBe('new post')

})

it('delete post', () => {
    let action = actions.deletePost(1)
    let new_state = profileReducer(state, action)
    expect(new_state.posts.length).toBe(2)

})
