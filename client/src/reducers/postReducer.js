import {ADD_POST, REMOVE_POST, FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, UPDATE_POST, LIKE_POST, START_LOADING, END_LOADING} from '../actions/actionTypes';

// data: {
//     posts: [posts], 
//     page: num, 
//     totalPage: num,
//     isLoading: bool,
//     post: post
// }
export default function postReducer(state={posts: [], isLoading: true}, action){
    switch (action.type) {
      case START_LOADING: return {...state, isLoading: true};
      case END_LOADING: return {...state, isLoading: false};
      case ADD_POST: return {...state, posts: [action.payload, ...state.posts]};
      case REMOVE_POST: return {...state, posts: state.posts.filter((post) => post._id !== action.id)};
      case FETCH_ALL: return{...state, ...action.payload};
      case FETCH_BY_SEARCH: return {...state, ...action.payload};
      case FETCH_POST: {
        //console.log("FETCH_POST: ", action.payload);
        return {...state, post: action.payload};
      }
      // case ADD_COMMENT: {
      //   //console.log('inside postReducer: ADD_COMMENT, action.payload: ',action.payload);
      //   return {...state, post: {...state.post, comments: [action.payload, ...state.post.comments]}}
      // }
      case LIKE_POST:
      case UPDATE_POST:
        return {
            ...state,
            posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
        }
      default: return state;
    }
}