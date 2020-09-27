import React, {useEffect, useState} from 'reactn';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import {MouseEvent} from "react";
import ModalBody from "react-bootstrap/ModalBody";
import {ModalTitle} from "react-bootstrap";

interface IProps {
    body: typeof ModalBody,
    show: boolean,
    title: typeof ModalTitle,
    onAnswer: (a: boolean) => void,
    onHide: () => void
}

const ConfirmationDialog = (props: IProps): JSX.Element => {
    const {
        show,
        body = 'Confirm?',
        title = 'Confirmation Dialog',
        onAnswer,
        onHide
    } = props;


    const [ shouldShow, setShouldShow ] = useState(show);

    // Observer for show
    useEffect(() => {setShouldShow(show)}, [show]);

    /**
     * Handle button click event.
     * @param {MouseEvent} e
     * @param answer
     */
    const handleAnswer = (e: React.MouseEvent<HTMLElement>, answer: boolean) => {
        e.preventDefault();
        onAnswer(answer);
        setShouldShow(false);
    }

    return (
        <Modal
            size="sm"
            show={shouldShow}
            backdrop="static"
            centered
            onHide={() => onHide()}
        >
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {body}
            </Modal.Body>

            <Modal.Footer>
                <Button
                    onClick={(e) => handleAnswer(e, true)}
                    variant="primary"
                >
                    Yes
                </Button>
                <Button
                    onClick={(e) => handleAnswer(e, false)}
                    variant="secondary"
                >
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationDialog;
