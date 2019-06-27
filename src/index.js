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

// Are we using the Chrome browser?
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// What version of Chrome is being used?
var chromeVersion = null;
if (isChrome) {
    const rawChromeVersion = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    chromeVersion = rawChromeVersion ? parseInt(rawChromeVersion[2], 10) : -1;
}

ReactDOM.render(<App isChrome={isChrome} chromeVersion={chromeVersion}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
