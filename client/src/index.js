import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux"
import store from "./store/store";
import 'dotenv/config';
import App from "./App";
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById("root"));