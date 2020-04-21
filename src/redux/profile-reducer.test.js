import React from 'react'
import profileReducer, {addPostActionCreator} from './profile-reducer'
it('new post should be add', ()=>{
    let action = addPostActionCreator('new post')
    let new_state = profileReducer()

})