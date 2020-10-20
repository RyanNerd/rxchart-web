import React, {useGlobal} from 'reactn';
import {Alert} from "react-bootstrap";
import {useEffect} from "react";

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

    // No error then don't render.
    if (!error) {
        return null;
    }

    /**
     * Function to create the unsafe HTML object
     * @param {string} html
     * @return {object}
     */
    const createMarkup = (html: string): {__html: string} => {
        return {__html: html}
    };

    const alert = (message: string) => {
        return (
            <Alert variant="danger">
                <Alert.Heading>
                    Error
                </Alert.Heading>
                {message}
            </Alert>
        )
    }

    let content: {} | null | undefined;
    if (error && development) {
        console.log('Error', error);
        if (error instanceof Object && error.text) {
            const contentType = error.hasOwnProperty('content_type') ? error.content_type.toLowerCase() : '';
            if (contentType.includes('html')) {
                content = (<div dangerouslySetInnerHTML={createMarkup(error.text)}/>);
            } else {
                if (error instanceof String && error.toLowerCase().includes('html')) {
                    content = (<div dangerouslySetInnerHTML={createMarkup(error as string)}/>);
                } else {
                    content = alert(error?.text || 'unknown error - see console log. Error type: ' + typeof error);
                }
            }
        } else {
            if (error instanceof String && error.toLowerCase().includes('html')) {
                content = (<div dangerouslySetInnerHTML={createMarkup(error as string)}/>);
            } else {
                content = alert(error?.text || 'unknown error - see console log. Error type: ' + typeof error);
            }
        }
    } else {
        content = alert('Something went wrong. Check your internet connection and try again.');
    }
    return <>{content}</>;
}

export default DiagnosticPage;
