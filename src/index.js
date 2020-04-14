import React from 'react';
import * as serviceWorker from './serviceWorker';
import store from "./redux/redux-store";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

export let renderEntreeTree = () => {

    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );

}

renderEntreeTree()

serviceWorker.unregister();
