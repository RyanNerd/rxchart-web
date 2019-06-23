import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import React, {setGlobal} from "reactn";
import App from './App';
import Frak from './providers/Frak';

setGlobal({
    development: true,
    counter: 0,
    currentResident: null,
    currentBarcode: null,
    currentMedicine: null,
    apiKey: null,
    baseUrl: "http://localhost:8082/v1/",
    frak: new Frak()
    }).then((initialState) => {
        console.log('MedTrax Started', initialState);
    }).catch((err) => {
        console.error('Something went wrong', err);
    }
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
