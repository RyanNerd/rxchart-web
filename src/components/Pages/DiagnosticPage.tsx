import React, {useGlobal} from 'reactn';
import {Alert} from "react-bootstrap";
import {ReactNode, useEffect, useMemo, useState} from "react";

interface IProps {
    error: any
}

/**
 * DiagnosticPage
 *
 * @param {IProps} props
 * @return {JSX.Element | null}
 */
const DiagnosticPage = (props: IProps): JSX.Element | null => {
    const [development] = useGlobal('development');
    const error = props.error;
    const [content, setContent] = useState<JSX.Element | null>(null);
    let finalContent: JSX.Element | null;

    /**
     * Function to create the unsafe HTML object
     * @param {string} html
     * @return {object}
     */
    const createMarkup = (html: string): {__html: string} => {
        return {__html: html}
    };

    const _alert = (heading: ReactNode, body: ReactNode) => {
        return (
            <Alert variant="danger">
                <Alert.Heading>
                    {heading}
                </Alert.Heading>
                {body}
            </Alert>
        )
    }

    const getText = async (response: Response) => {
        return await response.text();
    }

    useEffect(() => {
        const el = document.getElementById('landing-page-tabs-tab-error');
        if (error) {
            if (el) {
                el.style.color = '#007BFF';
            }
        } else {
            if (el) {
                el.style.color = 'white';
            }
        }
    }, [error])

    finalContent = useMemo( () => {
        const handleNativeError = (err: Error) => {
            const message = err.message;
            const name = err.name;
            const stack = err?.stack;
            const body = (
                <>
                    <p>{message}</p>
                    {stack &&
                    <>
                        <p> </p>
                        <p>{stack}</p>
                    </>
                    }
                </>
            )
            setContent(_alert('Error (' + name + ')', body));
        }

        const handleHtmlError = (html: string) => {
            setContent(<div dangerouslySetInnerHTML={createMarkup(html)}/>);
        }

        const handleResponseError = async (err: Response) => {
            console.log('handleResponseError', err);
            return await getText(err).then((text) => {
                if (text.toLowerCase().includes('html')) {
                    handleHtmlError(text);
                } else {
                    setContent(_alert('Fetch Error',
                        <>
                            <p>Status: {error.status}</p>
                            <p>Stats Text: {error.statusText}</p>
                            <p>Text: {text}</p>
                        </>));
                }
            });
        }

        if (!error) {
            return null;
        }

        if (development) {
            console.log('Error:', error);
            console.log('typeof error', typeof error);

            if (content) {
                return content;
            }

            /**
             * 🦆 typing to figure out what type error is
             */
            if (error instanceof Response) {
                handleResponseError(error);
            }
            if (error instanceof Error) {
                handleNativeError(error);
            }
            if (typeof error === 'string') {
                if (error.toLowerCase().includes('html')) {
                    return handleHtmlError(error);
                } else {
                    return handleNativeError(new Error(error));
                }
            }
            return(_alert(<b>Unknown Error</b>, 'Check console log.'));
        } else {
            return (_alert(<b>'Error'</b>, 'Something went wrong. Check your internet connection and try again.'));
        }
    }, [error, development, content]) || null;

    return <>{finalContent}</>
}

export default DiagnosticPage;
