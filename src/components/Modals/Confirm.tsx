import React, {useEffect, useState} from 'reactn';
import Modal, {ModalProps} from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import {MouseEvent, ReactChild, ReactChildren} from "react";

interface IChildren {
    children: ReactChildren | ReactChild | JSX.Element[] | JSX.Element | string
}

interface IProps extends ModalProps {
    onAnswer: (a: boolean) => void,
}

const Confirm = {
    Modal: (props: IProps): JSX.Element => {
        const {
            size = 'sm',
            backdrop = 'static',
            onAnswer
        } = {...props};
        const [show, setShow] = useState(props.show);

        // Observer for show
        useEffect(() => {
            setShow(props.show)
        }, [show, props.show]);

        /**
         * Handle button click event.
         * @param {MouseEvent} e
         * @param answer
         */
        const handleAnswer = (e: React.MouseEvent<HTMLElement>, answer: boolean) => {
            e.preventDefault();
            setShow(false);
            if (props.onHide) {props.onHide()}
            onAnswer(answer);
        }

        return (
            <Modal
                {...props}
                show={show}
                size={size}
                backdrop={backdrop}
                centered
            >
                {props.children}
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
    },

    Header: (props: IChildren) => {
        return (
            <div className="modal-header">
                {props.children}
            </div>
        )
    },

    Title: (props: IChildren) => {
        return (
        <h5 className="modal-title">
            {props.children}
        </h5>
        )
    },

    Body: (props: IChildren) => {
        return (
            <div className="modal-body">
                {props.children}
            </div>
        )
    }
}

export default Confirm;
