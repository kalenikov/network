import React from 'react';
import * as serviceWorker from './serviceWorker';
import store from "./redux/state";
import ReactDOM from "react-dom";
import App from "./App";

export let renderEntreeTree = () => {

    ReactDOM.render(
        <React.StrictMode>
            <App state={store.getState()} dispatch={store.dispatch.bind(store)}/>
        </React.StrictMode>,
        document.getElementById('root')
    );

}

renderEntreeTree(store.getState())

store.subscribe(renderEntreeTree)

serviceWorker.unregister();
