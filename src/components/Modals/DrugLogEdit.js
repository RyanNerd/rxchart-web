import React, {useEffect, useRef, useState} from 'reactn';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';

/**
 * Edit Modal for DrugLog
 *
 * @param {object} props :
 *          show {boolean} show/hide this modal
 *          drugLogInfo {Id: id, Note: ""}
 *
 * @returns {boolean|*}
 * @constructor
 */
const DrugLogEdit = (props) => {
    const [ show, setShow ] = useState(props.show);
    const [ drugLogInfo, setDrugLogInfo ] = useState(props.drugLogInfo);
    const [ canSave, setCanSave ] = useState(false);
    const textInput = useRef(null);

    // Observer for show and drugInfo properties
    useEffect(() => {
        if (props.drugLogInfo !== null) {
            setShow(props.show);
            setDrugLogInfo(props.drugLogInfo);
        }
    }, [props.show, props.drugLogInfo]);

    // Disable the Save button if Notes are empty.
    useEffect(() => {
        if (drugLogInfo && drugLogInfo.Notes.length > 0) {
            setCanSave(true);
        } else {
            setCanSave(false);
        }
    }, [drugLogInfo]);

    /**
     * Fires when a text field or checkbox is changing.
     *
     * @param  e
     */
    const handleOnChange = (e) => {
        const target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        drugLogInfo[name] = value;
        setDrugLogInfo({...drugLogInfo});
    }

    /**
     * Fires when the user clicks on save or cancel
     *
     * @param {MouseEvent} e
     * @param {boolean} shouldSave
     */
    const handleHide = (e, shouldSave) => {
        e.preventDefault();
        if (shouldSave) {
            props.onClose({...drugLogInfo});
        } else {
            props.onClose(null);
        }

        setShow(false);
    }

    // Short circuit render if there is no drugLogInfo.
    if (!drugLogInfo) {
        return false;
    }

     return (
        <Modal
            size="md"
            show={show}
            centered
            onHide={() => props.onHide()}
            onEntered={() => textInput.current.focus()}
        >
            <Modal.Header closeButton>
                <Modal.Title>Drug Log</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="drug-log-notes">
                        <Form.Label column md="4">
                            Amount / Notes
                        </Form.Label>

                        <Col md="8">
                            <Form.Control
                                as="textarea"
                                ref={textInput}
                                value={drugLogInfo.Notes}
                                name="Notes"
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    onClick={(e) => handleHide(e, false)}
                    variant="secondary"
                >
                    Cancel
                </Button>
                <Button
                    disabled={!canSave}
                    onClick={(e) => handleHide(e, true)}
                    variant="primary"
                >
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

DrugLogEdit.propTypes = {
    show: PropTypes.bool,
    drugLogInfo: PropTypes.object,
    onHide: PropTypes.func,
    onClose: PropTypes.func
}

export default DrugLogEdit;
