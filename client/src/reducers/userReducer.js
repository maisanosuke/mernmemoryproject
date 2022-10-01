import {AUTH, LOGOUT} from '../actions/actionTypes';


//JSON.parse(localStorage.getItem("profile"))||
export default function userReducer(user=JSON.parse(localStorage.getItem("profile") || null), action){
    switch(action.type){
        case AUTH: {
            localStorage.setItem("profile", JSON.stringify(action.user));
            return action.user;
        }
        case LOGOUT: {
            localStorage.clear();
            return null;
        }
        default: return user;
    }

}