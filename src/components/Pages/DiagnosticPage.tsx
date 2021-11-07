import Alert from 'react-bootstrap/Alert';
import Button, {ButtonProps} from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, {useEffect, useGlobal, useMemo, useState} from 'reactn';
import {ReactNode} from 'reactn/default';
import {randomString} from 'utility/common';

interface IKey {
    [key: string]: string;
}

interface IProps {
    error: unknown;
    dismissErrorAlert: () => void;
}

interface IWillow {
    authenticated: boolean;
    data?: null | unknown[];
    message: string[] | null;
    missing?: {invalid?: IKey};
    status: number;
    success: boolean;
    timestamp: number;
}

/**
 * DiagnosticPage
 * @param {IProps} props The props for this component
 * @returns {JSX.Element | null}
 */
const DiagnosticPage = (props: IProps): JSX.Element | null => {
    const [activeTabKey] = useGlobal('activeTabKey');
    const [content, setContent] = useState<JSX.Element | null>(null);
    const dismissError = props.dismissErrorAlert;
    const error = props.error;
    let finalContent: JSX.Element | null;

    /**
     * Function to create the unsafe HTML object
     * @param {string} html The HTML text to be safely rendered
     * @returns {object}
     */
    const createMarkup = (html: string): {__html: string} => {
        return {__html: html};
    };

    /**
     * Get the text from a Response object.
     * @param {Response} response The response object from a fetch call
     */
    const getText = async (response: Response) => {
        return await response.text();
    };

    // Observer to show / hide the Diagnostics tab title
    useEffect(() => {
        const el = document.getElementById('landing-page-tabs-tab-error');
        if (el) {
            if (error) el.style.color = '#007BFF';
            else el.style.color = 'white';
        }
    }, [error]);

    /**
     * Use memoization, so we don't have 3000 re-renders when an error occurs.
     */
    // eslint-disable-next-line prefer-const
    finalContent =
        useMemo(() => {
            /**
             * Button that closes the error and lets users sign back in
             * @param {ButtonProps} props The props for this component
             */
            const CloseErrorButton = (props: ButtonProps) => {
                return (
                    <Button
                        variant="primary"
                        onClick={() => {
                            setContent(null);
                            dismissError();
                        }}
                        {...props}
                    >
                        Close error and sign back in
                    </Button>
                );
            };

            /**
             * Alert composition component
             * @param {ReactNode} heading The heading component for the alert
             * @param {ReactNode} body The body component for the alert
             */
            const _alert = (heading: React.ReactNode, body: React.ReactNode) => {
                return (
                    <Alert
                        dismissible
                        onClose={() => {
                            setContent(null);
                            dismissError();
                        }}
                        variant="danger"
                    >
                        <Alert.Heading>{heading}</Alert.Heading>
                        {body}
                    </Alert>
                );
            };

            /**
             * Handler for when error is an instance of Error
             * @param {Error} err Error object
             */
            const handleNativeError = (err: Error) => {
                const message = err.message;
                const name = err.name;
                const stack = err?.stack;
                const body = (
                    <>
                        <p>{message}</p>
                        {stack && (
                            <>
                                <p></p>
                                <p>{stack}</p>
                            </>
                        )}
                    </>
                );
                setContent(_alert('Error (' + name + ')', body));
            };

            /**
             * Handler for when the error contains HTML that needs to be rendered.
             * @param {string} html The HTML to be rendered
             */
            const handleHtmlError = (html: string) => {
                const card = (
                    <Card>
                        <Card.Header>
                            <span className="mr-1">Error Details</span>
                            <CloseErrorButton className="float-right" />
                        </Card.Header>
                        <Card.Body>
                            <div dangerouslySetInnerHTML={createMarkup(html)} />
                        </Card.Body>
                        <Card.Footer>
                            <CloseErrorButton />
                        </Card.Footer>
                    </Card>
                );
                setContent(card);
            };

            /**
             * Handler for when the error is an instance of Response
             * @param {Response} response The response object from a fetch
             */
            const handleResponseError = async (response: Response) => {
                if (!response.bodyUsed) {
                    return await getText(response).then((text) => {
                        const headers = response.headers;
                        const contentType = headers.get('content_type');
                        if (contentType?.toLowerCase().includes('html') || text.toLowerCase().includes('html')) {
                            handleHtmlError(text);
                        } else {
                            setContent(
                                _alert(
                                    'Fetch Response Error',
                                    <>
                                        <p>Status: {response.status}</p>
                                        <p>Status Text: {response.statusText}</p>
                                        <p>Text: {text}</p>
                                    </>
                                )
                            );
                        }
                    });
                }
            };

            /**
             * Handler for when the error is a Willow API error
             * @param {IWillow} error Willow type API error
             */
            const handleWillowError = (error: IWillow) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const invalid = error.missing && error.missing.invalid ? error.missing.invalid : false;
                const invalidMessages = [];
                if (invalid) {
                    for (const key in invalid) {
                        if ({}.hasOwnProperty.call(invalid, key)) {
                            const value = invalid[key];
                            invalidMessages.push({key, value});
                        }
                    }
                }
                const card = (
                    <Card>
                        <Card.Header>
                            <span className="mr-1">API Error</span>
                            <CloseErrorButton className="float-right" />
                        </Card.Header>
                        <Card.Body>
                            <h6>Messages</h6>
                            <ul key={randomString()}>
                                {error?.message?.map((value: string) => {
                                    const uniqueId = randomString();
                                    return (
                                        <React.Fragment key={`msg-${uniqueId}`}>
                                            <li>{value}</li>
                                        </React.Fragment>
                                    );
                                })}
                            </ul>

                            <h6>Fields</h6>
                            <ul key={randomString()}>
                                {invalidMessages.map((message: {key: string; value: unknown}) => {
                                    const uniqueId = randomString();
                                    return (
                                        <React.Fragment key={`dp-invalid-${uniqueId}`}>
                                            <li>Field: {message.key}</li>
                                            <li>Details: {message.value}</li>
                                        </React.Fragment>
                                    );
                                })}
                            </ul>

                            <hr />

                            <ul>
                                <li>authenticated: {error.authenticated ? 'yes' : 'no'}</li>
                                <li>status: {error.status}</li>
                                <li>success: {error.success ? 'true' : 'false'}</li>
                                <li>timestamp: {error.timestamp}</li>
                                <li>data: {error.data ? error.data : 'None'}</li>
                            </ul>
                        </Card.Body>
                        <Card.Footer>
                            <CloseErrorButton />
                        </Card.Footer>
                    </Card>
                );
                setContent(card);
            };

            if (!error) return null;

            try {
                console.log('Error:', error);
                console.log('typeof error', typeof error);

                if (content) {
                    return content;
                }

                /**
                 * Duck 🦆 typing to figure out what type error is
                 */
                if (error instanceof Object) {
                    if (
                        // eslint-disable-next-line no-prototype-builtins
                        error.hasOwnProperty('message') &&
                        // eslint-disable-next-line no-prototype-builtins
                        error.hasOwnProperty('status') &&
                        // eslint-disable-next-line no-prototype-builtins
                        error.hasOwnProperty('timestamp') &&
                        // eslint-disable-next-line no-prototype-builtins
                        error.hasOwnProperty('success')
                    ) {
                        handleWillowError(error as IWillow);
                    }
                }
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
                return _alert(<b>Unknown Error</b>, 'Check console log.');
            } catch (e) {
                return (
                    <>
                        <p>Error in DiagnosticsPage</p>
                    </>
                );
            }
        }, [error, content, dismissError]) || null;

    // If this tab isn't active then don't render
    if (activeTabKey !== 'error') return null;

    return <>{finalContent}</>;
};

export default DiagnosticPage;
