import ReactDOM from 'react-dom';
// import * as serviceWorker from './serviceWorker';
import React, {setGlobal} from "reactn";
import App from './App';
import {initialState} from "./InitialState";

setGlobal(initialState)
    .then((initialState) => {
        console.log('MedTrax Started', initialState);
    }).catch((err) => {
        console.error('Something went wrong', err);
    }
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
