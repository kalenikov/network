import React from 'react';
import * as serviceWorker from './serviceWorker';
import store from "./redux/redux-store";
import ReactDOM from "react-dom";
import App from "./App";
import StoreContext, {Provider} from './StoreContext'
import {BrowserRouter} from 'react-router-dom'

export let renderEntreeTree = (state) => {

    ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );

}

renderEntreeTree(store.getState())

store.subscribe(() => renderEntreeTree(store.getState()))

serviceWorker.unregister();
