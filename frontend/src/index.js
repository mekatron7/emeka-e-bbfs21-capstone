import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import userReducer from './modules/user'

const asyncMiddleware = storeAPI => next => action => {
    if (typeof action === 'function') {
        return action(storeAPI.dispatch, storeAPI.getState)
    }

    next(action)
}
const middlewareEnhancer = applyMiddleware(asyncMiddleware)
const store = createStore(userReducer, middlewareEnhancer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
