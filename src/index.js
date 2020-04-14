import ReactDOM from 'react-dom';
import React, {setGlobal} from "reactn";
import App from './App';
import {initialState} from "./utility/InitialState";

setGlobal(initialState)
    .then((initialState) => {
        if (initialState.development) {
            console.log('RxChart Started', initialState);
        } else {
            console.log('RxChart' +
                ' Started');
        }
    }).catch((err) => {
        console.log('Something went wrong', err);
    }
);

ReactDOM.render(<App/>, document.getElementById('root'));
