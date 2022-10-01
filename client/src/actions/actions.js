import * as api from "../api";
import {ADD_POST, REMOVE_POST, FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, UPDATE_POST, LIKE_POST, UPDATE_EDITING_ID, AUTH, LOGOUT, START_LOADING, END_LOADING} from './actionTypes';
import {flash} from 'react-universal-flash';

//action creaters

//data {postMessage, totalPage}
export function getPosts(page){
    return async function getPostsThunk(dispatch){
        try{
            dispatch({type: START_LOADING});
            const {data} = await api.fetchPosts(page);
            dispatch({type: FETCH_ALL, payload: data});
            dispatch({type: END_LOADING});
            return data.totalPage;
        }catch(e){
            console.log(e.response.data.message);
        }
    }
}

export const getPost = (id) => async(dispatch) => {
    try{
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPost(id);
        dispatch({type: FETCH_POST, payload: data});
        dispatch({type: END_LOADING});  
    }catch(e){
        console.log(e.response.data.message );
    }
}

export function getPostsBySearch(searchQuery){
    return async function getPostsBySearchThunk(dispatch){
        try{
            dispatch({type: START_LOADING});
            const {data} = await api.fetchSearchPosts(searchQuery);
            dispatch({type: FETCH_BY_SEARCH, payload: data});
            //dispatch({type: FETCH_SEARCH, search: searchKey, tags: tags});
            dispatch({type: END_LOADING});
        }
        catch(e){
            flash(e.response.data.message || "Failed to Search Posts!", 5000, 'error');
        }
        
    }
}

export function addPost(newPost, history){
    //const post = {id: nanoid(), title: title, message: message, creater: creater, selectedFile: selectedFile, tags: tags};
    return async function addPostThunk(dispatch){
        try{
            const {data} = await api.sendPost(newPost);
            dispatch({type: ADD_POST, payload: data});
            history.push(`posts/${data._id}`);
        }
        catch(e){
            flash(e.response.data.message || "Failed to create Post!", 5000, 'error');
            history.push('/auth');
        }
    }
}

export function removePost(id){
    return async function removePostThunk(dispatch){
        try{
            await api.deletePost(id);
            dispatch({type: REMOVE_POST, id: id});
        }catch(e){
            console.log("failed deleting data.. ", e);
        }
    }
}

export function updateId(id){
    return {type: UPDATE_EDITING_ID, id: id};
}


export function likePost(id, history){
    return async function likePostThunk(dispatch){
        try{
            const {data} = await api.likePost(id);
            dispatch({type: LIKE_POST, payload: data});
        }
        catch(e){
            console.log('failed to like a post..', e);
            flash("Sign in to like a post",5000,"error");
            history.push('/auth');
        }
    }
}


export function updatePost(id, updatedPost){
    return async function updatePostThunk(dispatch){
        try{
            const {data} = await api.patchPost(id, updatedPost);
            dispatch({type: UPDATE_POST, payload: data});
        }
        catch(e){
            console.log("Failed to update Post..", e);
        }
    }
}

export const addComment = (id, username, comment) => async(dispatch) => {
    try{
        //console.log(`id ${id}, username ${username}, comment ${comment}`);
        await api.commentPost(id, {username, comment});
        //console.log("data received from server: ", data);
        //dispatch({type: ADD_COMMENT, payload: data});
    }catch(e){
        console.log('failed to add comment..', e);
    }
}

export function signup(userData, history){
    return async function signupThunk(dispatch){
        try{
            const res = await api.sendPostSignup(userData);
            dispatch({type: AUTH, user: res.data});
            history.goBack();//history.push('/');
            flash("Successfully Signed Up",10000,"success");
        }
        catch(e){
            flash(`Failed to Sign up at this time ${e.response.data}`,10000,"error");
            console.log(`Failed Signing up a user: ${e.response.data}`);
        }
    }
}



export function signin(userData, history){
    return async function signinThunk(dispatch){
    try{
        const res = await api.sendPostLogin(userData);
        //console.log("res.data:", res.data);
        dispatch({type: AUTH, user: res.data});
        history.goBack();//history.push('/');
        flash("Successfully Logged In",10000,"success");
    }catch(e){
        flash(`Failed to log in ${e.response.data}`,10000,"error");
        console.log(`Failed to Log in: ${e.response.data}`);
    }
    }
}

//google log in 
export function login(userData){
    return {type: AUTH, user: userData}
}



export function logout(){
    return {type: LOGOUT};
}