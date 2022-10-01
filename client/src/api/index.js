import axios from 'axios';

//const axiosAPI = axios.create({baseURL: "http://localhost:3001"});
const axiosAPI = axios.create({baseURL: "https://mernmemoryproject.vercel.app"});

//config (add token to header) for each Request before sending out to server
axiosAPI.interceptors.request.use((config) => {
    if(localStorage.getItem('profile')){
        config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return config
});

export const fetchPosts = (page) => axiosAPI.get(`posts?page=${page}`);

export const fetchSearchPosts = (searchQuery) => axiosAPI.get(`posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
//console.log(`/posts/search?searchQuery=${searchQuery.search || 'none' }&tags=${searchQuery.tags}`);

export const fetchPost = (id) => {
    console.log('fetchPost: ', id);
    return axiosAPI.get(`posts/${id}`);
}

//data : {title: title, message: message, creater: creater, selectedFile: file, tags: tags, id: id}
export const sendPost = (newPost) => axiosAPI.post('posts', newPost);
export const deletePost = (id) => axiosAPI.delete('posts', {data: {id: id}});
//export const patchPost = (id, data) => axios.patch(`${url}/${id}`, {data: {updatedPost: data}});
//export const patchPost = (id) => axios.patch(url);
export const patchPost = (id, data) =>axiosAPI.patch(`/posts/${id}`, data);
export const likePost = (id) => axiosAPI.patch(`posts/${id}/like`);
export const commentPost = (id, data) => axiosAPI.post(`posts/${id}/comment`, {data: {username: data.username, comment: data.comment}});

//export  const sendPostUser = (data) => axiosAPI.post('/user', data);//google sign in
export const sendPostSignup = (data) => axiosAPI.post('user/signup', data);
export const sendPostLogin = (data) => axiosAPI.post('user/login', data);
