import {configureStore} from "@reduxjs/toolkit";
import reducers from "../reducers/reducers";

const initialState = {
    posts: [],
    editingId: 0
}

// The thunk middleware was automatically added
export default configureStore({
    reducer: reducers,
    preloadedState: initialState
})