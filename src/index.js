import ReactDOM from 'react-dom';
import React, {setGlobal} from "reactn";
import App from './App';
import {initialState} from "./utility/InitialState";
import {browserInfo} from "./utility/browserInfo";

setGlobal(initialState)
    .then((initialState) => {
        console.log('MedTrax Started', initialState);
    }).catch((err) => {
        console.error('Something went wrong', err);
    }
);

const browser = browserInfo();

ReactDOM.render(<App isChrome={browser.browser === 'Chrome'} chromeVersion={browser.majVersion}/>, document.getElementById('root'));
