import React, {useEffect, useState} from 'reactn';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';

const ConfirmationDialog = (props) => {
    const [ show, setShow ] = useState(props.show);
    const body = props.body ? props.body : 'Confirm?';
    const title = props.title ? props.title : 'Confirmation Dialog';

    // Observer for show
    useEffect(() => {setShow(props.show)}, [props.show]);

    const handleAnswer = (e, answer) => {
        e.preventDefault();

        props.onAnswer(answer);
        setShow(false);
    }

    return (
        <Modal
            size="sm"
            show={show}
            backdrop="static"
            centered
            onHide={() => props.onHide()}
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

ConfirmationDialog.propTypes = {
    body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}

export default ConfirmationDialog;
