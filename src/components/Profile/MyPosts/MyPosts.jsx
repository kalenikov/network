import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";

const MyPosts = (props) => {

    debugger

    let postElements = props.posts.map(i => <Post message={i.message} id={i.id}/>)

    let newPostElement = React.createRef()

    const addPost = () => {
        props.dispatch({
            type: 'ADD-POST'
        })
    }

    function onPostChange() {
        console.log('1')
        let action = {
            type: 'UPDATE-NEW-POST-TEXT',
            newPostText: newPostElement.current.value
        }
        props.dispatch(action)
    }

    return <div className={s.postsBlock}>
        <h3>my posts</h3>
        <div>
            <div><textarea ref={newPostElement} onChange={onPostChange} value={props.newPostText}/></div>
            <div>
                <button onClick={addPost}>Add post</button>
            </div>
        </div>

        <div className={s.posts}>
            {postElements}
        </div>
    </div>
}

export default MyPosts