import React, {useGlobal, useEffect, useMemo, useState} from 'reactn';
import {Alert, Button, ButtonProps, Card} from "react-bootstrap";
import {randomString} from "../../utility/common";

interface IKey {
    [key: string]: string
}

interface IProps {
    activeTabKey: string | null
    error: any
    dismissErrorAlert: () => void
}

interface IWillow {
    authenticated: boolean
    message: string | null
    missing?: {invalid?: IKey}
    status: number
    timestamp: number
    success: boolean
    data?: null | any[]
}

/**
 * DiagnosticPage
 * @param {IProps} props
 * @return {JSX.Element | null}
 */
const DiagnosticPage = (props: IProps): JSX.Element | null => {
    const [content, setContent] = useState<JSX.Element | null>(null);
    const [development] = useGlobal('development');
    const dismissError = props.dismissErrorAlert;
    const error = props.error;
    const activeTabKey = props.activeTabKey;
    let finalContent: JSX.Element | null;

    /**
     * Function to create the unsafe HTML object
     * @param {string} html
     * @return {object}
     */
    const createMarkup = (html: string): { __html: string } => {
        return {__html: html}
    };

    /**
     * Get the text from a Response object.
     * @param {Response} response
     */
    const getText = async (response: Response) => {
        return await response.text();
    }

    // Observer to show / hide the Diagnostics tab title
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

    /**
     * Use memoization so we don't have 3000 re-renders when an error occurs.
     */
    finalContent = useMemo(() => {
        /**
         * Button that closes the error and lets users sign back in
         * @param {ButtonProps} props
         * @constructor
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
                </Button>)
        }

        /**
         * Alert composition component
         * @param {React.ReactNode} heading
         * @param {React.ReactNode} body
         */
        const _alert = (heading: React.ReactNode, body: React.ReactNode) => {
            return (
                <Alert
                    variant="danger"
                    dismissible
                    onClose={() => {
                        setContent(null);
                        dismissError();
                    }}
                >
                    <Alert.Heading>
                        {heading}
                    </Alert.Heading>
                    {body}
                </Alert>
            )
        }

        /**
         * Handler for when error is an instance of Error
         * @param {Error} err
         */
        const handleNativeError = (err: Error) => {
            const message = err.message;
            const name = err.name;
            const stack = err?.stack;
            const body = (
                <>
                    <p>{message}</p>
                    {stack &&
                    <>
                        <p></p>
                        <p>{stack}</p>
                    </>
                    }
                </>
            )
            setContent(_alert('Error (' + name + ')', body));
        }

        /**
         * Handler for when the error contains HTML that needs to be rendered.
         * @param {string} html
         */
        const handleHtmlError = (html: string) => {
            const card = (
                <Card>
                    <Card.Header>
                        <span className="mr-1">Error Details</span>
                        <CloseErrorButton className="float-right"/>
                    </Card.Header>
                    <Card.Body>
                        <div dangerouslySetInnerHTML={createMarkup(html)}/>
                    </Card.Body>
                    <Card.Footer>
                        <CloseErrorButton/>
                    </Card.Footer>
                </Card>
            )
            setContent(card);
        }

        /**
         * Handler for when the error is an instance of Response
         * @param {Response} response
         */
        const handleResponseError = async (response: Response) => {
            if (!response.bodyUsed) {
                return await getText(response)
                .then((text) => {
                    const headers = response.headers;
                    const contentType = headers.get('content_type');
                    if (contentType?.toLowerCase().includes('html') || text.toLowerCase().includes('html')) {
                        handleHtmlError(text);
                    } else {
                        setContent(_alert('Fetch Response Error',
                            <>
                                <p>Status: {response.status}</p>
                                <p>Stats Text: {response.statusText}</p>
                                <p>Text: {text}</p>
                            </>)
                        );
                    }
                })
            }
        }

        /**
         * Handler for when the error is a Willow API error
         * @param {IWillow} error
         */
        const handleWillowError = (error: IWillow) => {
            const invalid = error.missing && error.missing.invalid ? error.missing.invalid : false;
            const invalidMessages = [];
            if (invalid) {
                for (const key in invalid) {
                    if (invalid.hasOwnProperty(key)) {
                        const value = invalid[key];
                        invalidMessages.push({'key': key, 'value': value});
                    }
                }
            }
            const card = (
                <Card>
                    <Card.Header>
                        <span className="mr-1">
                            API Error
                        </span>
                        <CloseErrorButton className="float-right"/>
                    </Card.Header>
                    <Card.Body>
                        <p>
                            <b>{error.message}</b>
                        </p>

                        <ul key={randomString()}>
                            {invalidMessages.map((message: {key: string, value: any}) => {
                                const uniqueId = randomString();
                                return (
                                    <React.Fragment key={'dp-invalid-' + uniqueId}>
                                        <li>
                                            Field: {message.key}
                                        </li>
                                        <li>
                                            Details: {message.value}
                                        </li>
                                    </React.Fragment>
                                )
                            })}
                        </ul>

                        <hr/>

                        <ul>
                            <li>
                                authenticated: {error.authenticated ? 'yes' : 'no'}
                            </li>
                            <li>
                                status: {error.status}
                            </li>
                            <li>
                                success: {error.success ? 'true' : 'false'}
                            </li>
                            <li>
                                timestamp: {error.timestamp}
                            </li>
                            <li>
                                data: {error.data ? error.data : 'None'}
                            </li>
                        </ul>
                    </Card.Body>
                    <Card.Footer>
                        <CloseErrorButton/>
                    </Card.Footer>
                </Card>
            )
            setContent(card);
        }

        if (!error) {
            return null;
        }  else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        try {
            if (development) {
                console.log('Error:', error);
                console.log('typeof error', typeof error);

                if (content) {
                    return content;
                }

                /**
                 * Duck 🦆 typing to figure out what type error is
                 */
                if (error instanceof Object) {
                    if (error.hasOwnProperty('message') &&
                        error.hasOwnProperty('status') &&
                        error.hasOwnProperty('timestamp') &&
                        error.hasOwnProperty('success')) {
                        handleWillowError(error);
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
                return (_alert(<b>Unknown Error</b>, 'Check console log.'));
            } else {
                return (_alert(<b>'Error'</b>, 'Something went wrong. Check your internet connection and try again.'));
            }
        } catch (e) {
            return (<><p>Error in DiagnosticsPage</p></>);
        }
    }, [error, development, content, dismissError]) || null;

    // If this tab isn't active then don't render
    if (activeTabKey !== 'error') {
        return null;
    }

    return <>{finalContent}</>
}

export default DiagnosticPage;
