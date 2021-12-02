import ErrorDetailsObserver from 'observers/ErrorDetailsObserver';
import {ReactNode} from 'react';
import React from 'reactn';

interface IProps {
    children: ReactNode | undefined;
}

/**
 * Wrapper that initializes the ErrorDetail observer and renders the main "page" in an effort to reduce rerendering
 * @param {IProps} props The props for this component
 * @link https://overreacted.io/before-you-memo/
 */
const Main = (props: IProps) => {
    // Initialize the ErrorDetail observer
    ErrorDetailsObserver(); // Watching: __errorDetails

    const {children} = props;

    return <>{children}</>;
};

export default Main;
