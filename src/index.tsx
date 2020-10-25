import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import getInitialState from "./utility/getInitialState";
import React, {setGlobal} from "reactn";
import ReactDOM from 'react-dom';

/**
 * This gets called if something went really, really wrong at the launch of the app
 */
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

setGlobal(getInitialState())
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
