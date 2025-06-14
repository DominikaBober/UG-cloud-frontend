import axios from "axios";

export const login = async (user) => {
    return await axios.post(`http://localhost:5000/users/login/`, user)
        .then((response) => {
            return response;
        })
        .catch((error)=>{
            console.log(error);
            return {status: 500};
        });
}

export const register = async (user) => {
    return await axios.post(`http://localhost:5000/users/`, user)
        .then((response) => {
            return response;
        })
        .catch((error)=>{
            console.log(error);
            return {status: 500};
        });
}

export const get_posts_id = async () => {
    return await axios.get(`http://localhost:5000/posts/id`)
        .then((response) => {
            return response;
        })
        .catch((error)=>{
            console.log(error);
            return {status: 500};
        });
}

export const get_user = async (user_id) => {
    return await axios.get(`http://localhost:5000/users/${user_id}`)
        .then((response) => {
            return response;
        })
        .catch((error)=>{
            console.log(error);
            return {status: 500};
        });
}

export const get_post = async (post_id) => {
    return await axios.get(`http://localhost:5000/posts/${post_id}`)
        .then((response) => {
            return response;
        })
        .catch((error)=>{
            console.log(error);
            return {status: 500};
        });
}

export const post_post = async (new_post) => {
    return await axios.post(`http://localhost:5000/posts`, new_post)
        .then((response) => {
            return response;
        })
        .catch((error)=>{
            console.log(error);
            return {status: 500};
        });
}

export const get_posts = async () => {
    return await axios.get(`http://localhost:5000/posts`)
        .then((response) => {
            return response;
        })
        .catch((error)=>{
            console.log(error);
            return {status: 500};
        });
}