import Button from "react-bootstrap/Button";
import Modal, {ModalProps} from 'react-bootstrap/Modal';
import {ButtonVariant} from "react-bootstrap/types";
import React, {useEffect, useState} from 'reactn';

interface IChildren {
    children: any // ReactChildren | ReactChild | JSX.Element[] | JSX.Element | string
}

interface IProps extends ModalProps {
    buttonvariant?: ButtonVariant
    onSelect: (a: boolean) => void
}

/**
 * Confirmation Modal "inheriting" from the Modal component
 * Uses Reacts "dot notation"
 */
const Confirm = {
    /**
     * Confirm.Modal component
     * @param {IProps} props
     * @return Modal
     */
    Modal: (props: IProps): JSX.Element => {
        const {
            backdrop = 'static',
            buttonvariant = 'primary',
            onSelect,
            size = 'sm'
        } = {...props};
        const [show, setShow] = useState(props.show);

        // Observer for show
        useEffect(() => {
            setShow(props.show)
        }, [show, props.show]);

        /**
         * Handle button click event.
         * @param {React.MouseEvent} e
         * @param answer
         */
        const onAnswer = (e: React.MouseEvent<HTMLElement>, answer: boolean) => {
            e.preventDefault();
            setShow(false);
            if (props.onHide) {
                props.onHide()
            }
            onSelect(answer);
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
                        onClick={(e) => onAnswer(e, true)}
                        variant={buttonvariant}
                    >
                        Yes
                    </Button>
                    <Button
                        onClick={(e) => onAnswer(e, false)}
                        variant="secondary"
                    >
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    },

    /**
     * Confirm.Header component
     * @param {IChildren} props
     */
    Header: (props: IChildren) => {
        return (
            <div className="modal-header">
                {props.children}
            </div>
        )
    },

    /**
     * Confirm.Title component
     * @param {IChildren} props
     */
    Title: (props: IChildren) => {
        return (
            <h5 className="modal-title">
                {props.children}
            </h5>
        )
    },

    /**
     * Confirm.Body component
     * @param {IChildren} props
     */
    Body: (props: IChildren) => {
        return (
            <div className="modal-body">
                {props.children}
            </div>
        )
    }
}

export default Confirm;
