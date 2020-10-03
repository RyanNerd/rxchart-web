import React, {useEffect, useState} from 'reactn';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import {MouseEvent} from "react";
import ModalBody from "react-bootstrap/ModalBody";
import {ModalTitle} from "react-bootstrap";

interface IProps {
    body: typeof ModalBody | JSX.Element | JSX.Element[] | string,
    show: boolean,
    title: typeof ModalTitle | string,
    size?: 'sm' | 'lg' | 'xl',
    onAnswer: (a: boolean) => void,
    onHide: () => void
}

const ConfirmationDialog = (props: IProps): JSX.Element => {
    const {
        size = 'sm',
        body = 'Confirm?',
        title = 'Confirmation Dialog',
        onAnswer,
        onHide
    } = props;

    const [ show, setShow ] = useState(props.show);

    // Observer for show
    useEffect(() => {setShow(props.show)}, [show, props.show]);

    /**
     * Handle button click event.
     * @param {MouseEvent} e
     * @param answer
     */
    const handleAnswer = (e: React.MouseEvent<HTMLElement>, answer: boolean) => {
        e.preventDefault();
        onAnswer(answer);
        setShow(false);
    }

    return (
        <Modal
            size={size}
            show={show}
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
