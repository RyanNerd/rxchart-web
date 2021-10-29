import ErrorDetailsObserver from 'observers/ErrorDetailsObserver';
import React from 'reactn';
import {ReactNode} from 'reactn/default';

interface IProps {
    children: ReactNode | undefined;
}

/**
 * Outer wrapper that initializes the observers and renders the main "page" in an effort to reduce re-rendering
 * @param {IProps} props The props for this component
 * @link https://overreacted.io/before-you-memo/
 */
const Main = (props: IProps) => {
    /**
     * Initialize the ErrorDetail observer
     */
    ErrorDetailsObserver(); // Watching: __errorDetails

    const {children} = props;

    return <>{children}</>;
};

export default Main;
