import ActiveResidentObserver from "observers/ActiveResidentObserver";
import ApiKeyObserver from "observers/ApiKeyObserver";
import AuthObserver from "observers/AuthObserver";
import ErrorDetailsObserver from "observers/ErrorDetailsObserver";
import {ReactNode} from "react";
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
    ApiKeyObserver();           // Watching: apiKey
    ErrorDetailsObserver();     // Watching: __errorDetails
    AuthObserver();             // Watching: __auth

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
