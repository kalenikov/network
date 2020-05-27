import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {reduxForm, Field} from 'redux-form'
import {maxLenghtCreator, required} from '../../../utils/validators/validators'
import {Textarea} from '../../common/FormsControls/FormsControls'
import AddPostForm, {AddPostFormValuesType} from "./AddPostForm/AddPostForm"
import {PostType} from "../../../types/types"

const maxLenght10 = maxLenghtCreator(10)

type PropsType = {
    posts: Array<PostType>
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<PropsType> = (props) => {

    let postElements = props.posts.map(i => <Post message={i.message} key={i.id}/>)

    let newPostElement = React.createRef()

    const onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
    }
    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3>

            <AddPostForm onSubmit={onAddPost}/>

            <div className={s.posts}>
                {postElements}
            </div>
        </div>)
}

const MyPostMemoized = React.memo(MyPosts)

export default MyPostMemoized
