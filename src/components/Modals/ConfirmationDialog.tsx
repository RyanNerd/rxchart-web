import React, {useEffect, useState} from 'reactn';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import {MouseEvent} from "react";
import {ModalProps} from "react-bootstrap/cjs";
import {TransitionCallbacks} from "react-bootstrap/helpers";

interface IProps extends ModalProps, TransitionCallbacks {
    onAnswer: (a: boolean) => void,
}

const ConfirmationDialog = (props: IProps): JSX.Element => {
    const {
        size = 'sm',
        body = 'Confirm?',
        title = 'Confirmation Dialog',
        backdrop = 'static',
        onAnswer
    } = {...props};

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
            {...props}
            size={size}
            backdrop={backdrop}
            centered
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
    )
}

export default ConfirmationDialog;
