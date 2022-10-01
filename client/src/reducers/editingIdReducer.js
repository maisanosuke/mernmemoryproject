import {UPDATE_EDITING_ID} from "../actions/actionTypes";

export default function editingIdReducer(prevId=0, action){
    switch(action.type){
        case UPDATE_EDITING_ID: return action.id;
        default: return prevId;
    }
}