import ReactDOM from 'react-dom';
import React, {setGlobal} from "reactn";
import App from './App';
import {initialState} from "./utility/InitialState";

setGlobal(initialState)
    .then((initialState) => {
        if (initialState.development) {
            console.log('MedTrax Started', initialState);
        } else {
            console.log('MedTrax Started');
        }
    }).catch((err) => {
        console.log('Something went wrong', err);
    }
);

// const browser = browserInfo();

ReactDOM.render(<App/>, document.getElementById('root'));
