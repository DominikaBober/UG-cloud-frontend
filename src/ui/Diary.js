import {Formik, Form, Field} from "formik";
import { useEffect, useState, useParams } from "react";
import { get_posts_id, get_post, get_user, post_post } from "../ducks/actions";
import {Link } from 'react-router-dom';
import '../style/DiaryPage.scss';
import '../style/DiaryForm.scss';

function Diary(props) {

    const user = props.user;
    var today = new Date().toLocaleDateString('en-GB');
    const [post, setPost] = useState({});
    const [postsIds, setPostsIds] = useState([]);
    const [postId, setPostId] = useState('');
    const [newPost, setNewPost] = useState(false);


    const handleSubmit = async (values, actions) => {
        console.log(user)
        const new_post = {
            text: values.content,
            date: new Date(),
            author: user.id
        }
        const result = await post_post(new_post)
        if (result.status === 200){
            actions.resetForm({
                content: ''
            })
            setNewPost(!newPost)
        }
    }

    useEffect(() => {
        async function fetchData() {
            if (postsIds.length===0){
                const result = await get_posts_id();
                if (result.status === 200){
                    setPostsIds(result.data.allPosts);
                    setPostId(result.data.allPosts[result.data.allPosts.length-1]);
                }
            } else {
                const result = await get_posts_id();
                if (result.status === 200){
                    setPostsIds(result.data.allPosts);
                }
                const result_post = await get_post(postId);
                if (result_post.status === 200){
                    const temp = result_post.data;
                    const author = await get_user(temp.author);
                    if (author.status === 200){
                        setPost({
                            text: temp.text,
                            date: temp.date,
                            author: author.data
                        });
                    }
                }
            }
        }
        fetchData()
    }, [postId, newPost])

    useEffect(()=>{
        async function fetchData() {
            console.log("lol")
            const result = await get_posts_id();
            if (result.status === 200){
                setPostsIds(result.data.allPosts);
            }
        }
        fetchData()
    },[newPost])

    useEffect(()=>{

    },[post])



    return (
        <>
        <div className="DiaryPage">
            <button className={postsIds.indexOf(postId)-1>=0 ? "letf" : "none"} onClick={() => {
                postsIds.indexOf(postId)-1>=0 && setPostId(postsIds[postsIds.indexOf(postId)-1])}}
            > &#8592; </button>
            <div className="Form">
                <div className="fancy">Posts</div>
                <div className="pole" id="opt">
                    <div className="fancy">Date:</div>
                    <div>{new Date(post.date).toLocaleDateString('en-GB')}</div>
                </div>
                <div className="pole" id="textarea">
                    {post.text}
                </div>
                <div className="pole" id="opt">
                    <div className="fancy">By:</div>
                    <div>{post.author}</div>
                </div>
            </div>
            <button className={postsIds.indexOf(postId)+1<postsIds.length ? "right" : "none"} onClick={() => {
                postsIds.indexOf(postId)+1<postsIds.length && setPostId(postsIds[postsIds.indexOf(postId)+1])}}
            > &#8594;</button>
        </div>
        <div className="pod">
            <div className="hello">Hello {user.login}!</div>
            <div className="DiaryForm">
                <Formik
                    initialValues={{
                        content: ''
                    }}
                    onSubmit={(values,actions) => handleSubmit(values,actions)}>
                    {({ errors, touched, isValidating }) => (
                        <Form className="Form" id="col">
                            <div className="pole" id="opt">
                                <div className="fancy">Date:</div>
                                <div>{today}</div>
                            </div>
                            <Field name="content" className="pole" id="textarea" as="textarea"/>
                            <div className="pole" id="opt">
                                <div className="fancy">By:</div>
                                <div>{user.login}</div>
                            </div>
                            <button type="submit" className="pole">
                            submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
        </>
    );
}

export default Diary;
