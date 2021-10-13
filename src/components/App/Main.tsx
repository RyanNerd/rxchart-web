import ActiveResidentObserver from "observers/ActiveResidentObserver";
import ErrorDetailsObserver from "observers/ErrorDetailsObserver";
import {ReactNode} from "reactn/default";
import React from "reactn";

interface IProps {
    children: ReactNode | undefined;
}

/**
 * Outer wrapper that initializes the observers and renders the main "page" in an effort to reduce re-rendering
 * @param {IProps} props
 * @link https://overreacted.io/before-you-memo/
 */
const Main = (props: IProps) => {
    /**
     * Initialize all the observers
     */
    ActiveResidentObserver();   // Watching: __activeResident
    ErrorDetailsObserver();     // Watching: __errorDetails

    const {
        children
    } = props;

    return (
        <>
            {children}
        </>
    )
}

export default Main;
