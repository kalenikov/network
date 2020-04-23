import React from 'react'
import profileReducer, {addPostActionCreator, deletePost} from './profile-reducer'

const state = {
    posts: [
        {id: 1, message: 'post1', likesCount: 10},
        {id: 2, message: 'post2', likesCount: 20},
        {id: 3, message: 'post3', likesCount: 30}],
}

it('new post should be add', ()=>{
    let action = addPostActionCreator('new post')
    let new_state = profileReducer(state, action)
    expect(new_state.posts.length).toBe(4)

})

it('message of new post should be', ()=>{
    let action = addPostActionCreator('new post')
    let new_state = profileReducer(state, action)
    expect(new_state.posts[0].message).toBe('new post')

})

it('delete post', ()=>{
    let action = deletePost(1)
    let new_state = profileReducer(state, action)
    expect(new_state.posts.length).toBe(2)

})