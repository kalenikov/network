import React from 'react';
import * as serviceWorker from './serviceWorker';
import ReactDOM from "react-dom";
import SamuraiJSApp from './App'

export let renderEntreeTree = () => {

    ReactDOM.render(
        <SamuraiJSApp />,
        document.getElementById('root')
    );

}

renderEntreeTree()

serviceWorker.unregister();
