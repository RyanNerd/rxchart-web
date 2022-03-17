import {ReactNode} from 'react';
import React, {addCallback} from 'reactn';
import {RxError} from 'utility/RxError';

interface IProps {
    children: ReactNode | undefined;
}

/**
 * Wrapper that initializes the ErrorDetail observer and renders the main "page" in an effort to reduce re-rendering
 * @param {IProps} props The props for this component
 * @link https://overreacted.io/before-you-memo/
 */
const Main = (props: IProps) => {
    // We create a callback to the global state changes for special error handling
    addCallback((global) => {
        // Is __errorDetails populated and is it NOT an instance of RxError?
        if (global.__errorDetails && !(global.__errorDetails instanceof RxError)) {
            // This is new error we are going to wrap in a custom RxError object
            const newError = new RxError('An error occurred while trying to access the API service');
            newError.setErrorDetails(global.__errorDetails);
            return {
                __errorDetails: newError,
                signIn: {organization: null, apiKey: null, success: null},
                activeClient: null,
                activeTabKey: 'error'
            };
        } else {
            return null;
        }
    });

    const {children} = props;

    return <>{children}</>;
};

export default Main;
