import React from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {reduxForm, Field} from 'redux-form'
import {maxLenghtCreator, required} from '../../../utils/validators/validators'
import {Textarea} from '../../common/FormsControls/FormsControls'

const maxLenght10 = maxLenghtCreator(10)

let AddNewPostForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    name={'newPostText'}
                    component={Textarea}
                    validate={[required, maxLenght10]}
                    placeholder={'Post message'}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

AddNewPostForm = reduxForm({form: 'Profile'})(AddNewPostForm)

const MyPosts = (props) => {

    let postElements = props.posts.map(i => <Post message={i.message} key={i.id}/>)

    let newPostElement = React.createRef()

    const onAddPost = (values) => {
        props.addPost(values.newPostText)
    }
    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3>

            <AddNewPostForm onSubmit={onAddPost}/>

            <div className={s.posts}>
                {postElements}
            </div>
        </div>)
}


export default MyPosts