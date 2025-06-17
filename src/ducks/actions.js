import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000'

export const login = async (user) => {
    return await axios.post(`${BACKEND_URL}/users/login/`, user)
        .then((response) => {
            return response;
        })
        .catch((error)=>{
            console.log(error);
            return {status: 500};
        });
}

export const register = async (user) => {
    return await axios.post(`${BACKEND_URL}/users/`, user)
        .then((response) => {
            return response;
        })
        .catch((error)=>{
            console.log(error);
            return {status: 500};
        });
}

export const get_posts_id = async () => {
    return await axios.get(`${BACKEND_URL}/posts/id`)
        .then((response) => {
            return response;
        })
        .catch((error)=>{
            console.log(error);
            return {status: 500};
        });
}

export const get_user = async (user_id) => {
    return await axios.get(`${BACKEND_URL}/users/${user_id}`)
        .then((response) => {
            return response;
        })
        .catch((error)=>{
            console.log(error);
            return {status: 500};
        });
}

export const get_post = async (post_id) => {
    return await axios.get(`${BACKEND_URL}/posts/${post_id}`)
        .then((response) => {
            return response;
        })
        .catch((error)=>{
            console.log(error);
            return {status: 500};
        });
}

export const post_post = async (new_post) => {
    return await axios.post(`${BACKEND_URL}/posts`, new_post)
        .then((response) => {
            return response;
        })
        .catch((error)=>{
            console.log(error);
            return {status: 500};
        });
}

export const get_posts = async () => {
    return await axios.get(`${BACKEND_URL}/posts`)
        .then((response) => {
            return response;
        })
        .catch((error)=>{
            console.log(error);
            return {status: 500};
        });
}