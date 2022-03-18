import Button, {ButtonProps} from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, {useGlobal, useMemo} from 'reactn';
import {RxError} from 'utility/RxError';

interface IProps {
    error: RxError | Error;
    dismissErrorAlert: () => void;
}

/**
 * DiagnosticPage
 * @param {IProps} props The props for this component
 */
const DiagnosticPage = (props: IProps): JSX.Element | null => {
    const [activeTabKey] = useGlobal('activeTabKey');
    const dismissError = props.dismissErrorAlert;
    const error = props.error;

    /**
     * Parse and return an object representing the error details
     * @param {RxError | Error} error The Error or RxError instance
     */
    const getParsedErrorDetails = (error: RxError | Error) => {
        const details = error instanceof RxError ? error.getErrorDetails() : error;
        if (details instanceof Error) {
            const stackItems = (details.stack || '').split('\n');
            for (let index = 0; index < stackItems.length; index++) {
                stackItems[index] = stackItems[index] + '<br/>';
            }
            return {
                message: details.message,
                stack: stackItems.join('')
            };
        }
        return {details};
    };

    /**
     * Function to create the unsafe HTML object
     * @param {string} html The HTML text to be safely rendered
     * @returns {object} An object containing safe HTML
     */
    const createMarkup = (html: string): {__html: string} => {
        return {__html: html};
    };

    /**
     * Memoized Diagnostic Page content
     * @type {null | JSX.Element}
     */
    const diagnosticPage = useMemo(() => {
        /**
         * Button that closes the error and lets users sign back in
         * @param {ButtonProps} props The props for this component
         */
        const CloseErrorButton = (props: ButtonProps) => {
            return (
                <Button
                    variant="primary"
                    onClick={() => {
                        dismissError();
                    }}
                    {...props}
                >
                    Close error and sign back in
                </Button>
            );
        };

        if (!error || !error.message) return null;

        const details = createMarkup(JSON.stringify(getParsedErrorDetails(error)));
        return (
            <Card>
                <Card.Header>
                    <span className="mr-1">Error Details</span>
                    <CloseErrorButton className="float-right" />
                </Card.Header>
                <Card.Body>
                    <h1>{error.message}</h1>
                    <h3>Details:</h3>
                    <p dangerouslySetInnerHTML={details}></p>
                </Card.Body>
                <Card.Footer>
                    <CloseErrorButton />
                </Card.Footer>
            </Card>
        );
    }, [dismissError, error]);

    if (activeTabKey !== 'error' || !error) return null;

    return diagnosticPage;
};

export default DiagnosticPage;
