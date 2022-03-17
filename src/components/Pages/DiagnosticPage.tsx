import Button, {ButtonProps} from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, {useGlobal} from 'reactn';
import {RxError} from 'utility/RxError';

interface IProps {
    error: RxError;
    dismissErrorAlert: () => void;
}

/**
 * DiagnosticPage
 * @todo Change DiagnosticPage.tsx to only handle display of RxError types
 * @param {IProps} props The props for this component
 */
const DiagnosticPage = (props: IProps): JSX.Element | null => {
    const [activeTabKey] = useGlobal('activeTabKey');
    const dismissError = props.dismissErrorAlert;
    const error = props.error;

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

    if (activeTabKey !== 'error') return null;

    return (
        <Card>
            <Card.Header>
                <span className="mr-1">Error Details</span>
                <CloseErrorButton className="float-right" />
            </Card.Header>
            <Card.Body>
                <h1>{error.message}</h1>
                <h3>Details:</h3>
                <p>{JSON.stringify(error.getErrorDetails())}</p>
            </Card.Body>
            <Card.Footer>
                <CloseErrorButton />
            </Card.Footer>
        </Card>
    );
};

export default DiagnosticPage;
