import { useEffect, useState, useParams } from "react";
import { get_posts_id, get_post, get_user } from "../ducks/actions";
import {Link } from 'react-router-dom';
import '../style/DiaryPage.scss';

function DiaryPage(props) {

    const user = props.user;
    const [post, setPost] = useState({});
    const [postsIds, setPostsIds] = useState([]);
    const [postId, setPostId] = useState('');

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
    }, [postId])


    return (
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
    )
}

export default DiaryPage;
