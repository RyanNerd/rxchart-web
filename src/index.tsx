import ReactDOM from 'react-dom';
import React, {setGlobal} from "reactn";
import App from './App';
import {initialState} from "./utility/initialState";

const InitError = () => {
    return (
        <>
            <h3 style={{textAlign: "center"}}>
                Something went wrong.
            </h3>
            <h2 style={{textAlign: "center"}}>
                Check the console log for details.
            </h2>
        </>
    )
}

setGlobal(initialState)
    .then((initialState) => {
        if (initialState.development) {
            console.log('RxChart Started', initialState);
        } else {
            console.log('RxChart Started');
        }
    })
    .then(() => {
        ReactDOM.render(<App/>, document.getElementById('root'));
    })
    .catch((err) => {
        console.log('Something went wrong', err);
        ReactDOM.render(<InitError/>, document.getElementById('root'));
    }
);


