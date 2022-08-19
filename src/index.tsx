import 'bootstrap/dist/css/bootstrap.min.css';
import App from 'components/App/App';
import ReactDOM from 'react-dom';
import React, {setGlobal} from 'reactn';
import {createRoot} from 'react-dom/client';
import {State} from 'reactn/default';
import getInitialState from './utility/getInitialState';

/**
 * This gets called if something went really, really wrong at the launch of the app
 */
const InitError = () => {
    return (
        <>
            <h3 style={{textAlign: 'center'}}>Something went wrong.</h3>
            <h2 style={{textAlign: 'center'}}>Check the console log for details.</h2>
        </>
    );
};

/**
 * Fires once the App has successfully rendered logging the result to the console
 * @param {State} initialState The global initial state
 */
const logAppStarted = (initialState: State) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.log('RxChart Started', initialState); // eslint-disable-line no-console
    } else {
        console.log('RxChart Started'); // eslint-disable-line no-console
    }
};

/**
 * Start the app using async/await
 */
const startApp = async () => {
    try {
        const initialState = await setGlobal(getInitialState());
        const root = createRoot(document.getElementById('root') as HTMLDivElement);
        logAppStarted(initialState);
        root.render(<App />);
    } catch (error) {
        console.log('Something went wrong', error); // eslint-disable-line no-console
        ReactDOM.render(<InitError />, document.getElementById('root'));
    }
};

startApp();
