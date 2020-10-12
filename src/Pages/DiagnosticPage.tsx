import React, {useGlobal} from 'reactn';
import {Alert} from "react-bootstrap";

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
    const error = props.error;
    const [ development ] = useGlobal('development');
    const createMarkup = (html: string) => { return {__html: html}};

    let content;
    if (error && development) {
        // tsliint-ignore
        console.log('Error', error);
        if (error instanceof Object && error.text) {
            const contentType = error.hasOwnProperty('content_type') ? error.content_type.toLowerCase() : '';
            if (contentType.includes('html')) {
                content = (<div dangerouslySetInnerHTML={createMarkup(error.text)} />);
            } else {
                content = (<p>{error.text}</p>)
            }
        } else {
            content = (
                <Alert variant='danger'>
                    <Alert.Heading>
                        Unknown Error
                    </Alert.Heading>
                    Check the console log for details.
                </Alert>
            );
        }
    } else {
        content = (
            <Alert variant="danger">
                <Alert.Heading>
                    Error
                </Alert.Heading>
                Something went wrong. Check your internet connection and try again.
            </Alert>
        );
    }
    return <>{content}</>;
}

export default DiagnosticPage;
