import Button from 'react-bootstrap/Button';
import Modal, {ModalProps} from 'react-bootstrap/Modal';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalHeader from 'react-bootstrap/ModalHeader';
import React, {useEffect, useState} from 'reactn';
import {ReactChild, ReactChildren} from 'reactn/default';

interface IProps extends ModalProps {
    show: boolean;
    body?: string | ReactChildren | ReactChild | JSX.Element[] | JSX.Element;
    title?: string | ReactChildren | ReactChild | JSX.Element[] | JSX.Element;
    onAnswer?: (a: boolean) => void;
    yesButton?: JSX.Element;
    noButton?: JSX.Element;
    [key: string]: unknown;
}

interface IAnswerProps {
    a: boolean;
}

/**
 * ConfirmDialogModal - Uses composition instead of inheritance
 * @param {IProps} props The props for this component
 */
const ConfirmDialogModal = (props: IProps) => {
    const {onAnswer, show, body, title, yesButton, noButton} = {...props};

    const [showModal, setShowModal] = useState(show);

    // Monitor changes to the show property
    useEffect(() => {
        setShowModal(show);
    }, [show]);

    /**
     * Handle when user clicks on the yes / no button
     * @param {React.MouseEvent<HTMLElement>} e Mouse event object
     * @param {boolean} a True if the user clicked on the Confirm/Yes button
     */
    const handleClick = (e: React.MouseEvent<HTMLElement>, a: boolean) => {
        e.preventDefault();
        setShowModal(false);
        if (onAnswer) {
            onAnswer(a);
        }
    };

    /**
     * Generic AnswerButton
     * @param {IAnswerProps} props Answer props for the button
     */
    const AnswerButton = (props: IAnswerProps) => {
        return (
            <Button onClick={(e) => handleClick(e, props.a)} variant={props.a ? 'primary' : 'secondary'}>
                {props.a ? 'Yes' : 'No'}
            </Button>
        );
    };

    return (
        <Modal {...props} show={showModal} backdrop="static">
            {title && <ModalHeader>{title}</ModalHeader>}

            <ModalBody>{body}</ModalBody>

            <ModalFooter>
                {yesButton ? yesButton : <AnswerButton a={true} />}
                {noButton ? noButton : <AnswerButton a={false} />}
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmDialogModal;
