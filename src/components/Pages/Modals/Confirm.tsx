import Button, {ButtonProps} from 'react-bootstrap/Button';
import Modal, {ModalProps} from 'react-bootstrap/Modal';
import React, {useEffect, useState} from 'reactn';
import {ReactNode} from 'reactn/default';

interface IChildren {
    children: ReactNode;
}

interface IProps extends ModalProps {
    noButtonContent?: ReactNode;
    noButtonProps?: ButtonProps;
    onSelect: (b: boolean) => void;
    yesButtonContent?: ReactNode;
    yesButtonProps?: ButtonProps;
}

/**
 * Confirmation Modal "inheriting" (read composition) from the Modal component
 * Uses Reacts' "dot notation"
 */
const Confirm = {
    /**
     * Confirm.Modal component
     * @param {IProps} props Props for the component
     * @returns {JSX.Element} Modal
     */
    Modal: (props: IProps): JSX.Element => {
        const defaultYesButtonProps = props.yesButtonProps ? props.yesButtonProps : {variant: 'primary'};
        const defaultNoButtonProps = props.noButtonProps ? props.noButtonProps : {variant: 'secondary'};
        const {
            backdrop = 'static',
            noButtonContent = 'No',
            noButtonProps = defaultNoButtonProps,
            onSelect,
            size = 'sm',
            yesButtonContent = 'Yes',
            yesButtonProps = defaultYesButtonProps
        } = {...props};

        const [show, setShow] = useState(props.show);
        useEffect(() => {
            setShow(props.show);
        }, [show, props.show]);

        /**
         * Handle button click event.
         * @param {boolean} isAccepted True if user clicked the confirm/yes button, otherwise false
         */
        const onAnswer = (isAccepted: boolean) => {
            setShow(false);
            if (props.onHide) props.onHide();
            onSelect(isAccepted);
        };

        return (
            <Modal {...props} show={show} size={size} backdrop={backdrop} centered>
                {props.children}
                <Modal.Footer>
                    <Button {...yesButtonProps} onClick={() => onAnswer(true)}>
                        {yesButtonContent}
                    </Button>
                    <Button {...noButtonProps} onClick={() => onAnswer(false)}>
                        {noButtonContent}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    },

    /**
     * Confirm.Header component
     * @param {IChildren} props React children props
     */
    Header: (props: IChildren) => {
        return <div className="modal-header">{props.children}</div>;
    },

    /**
     * Confirm.Title component
     * @param {IChildren} props React children props
     */
    Title: (props: IChildren) => {
        return <h5 className="modal-title">{props.children}</h5>;
    },

    /**
     * Confirm.Body component
     * @param {IChildren} props React children props
     */
    Body: (props: IChildren) => {
        return <div className="modal-body">{props.children}</div>;
    }
};

export default Confirm;
