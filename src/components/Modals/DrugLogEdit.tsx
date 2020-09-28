import React, {useEffect, useRef, useState} from 'reactn';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {DrugLogRecord} from "../../types/RecordTypes";
import {RefObject} from "react";

interface IProps {
    show: boolean,
    drugLogInfo: DrugLogRecord,
    onClose: (drugLogInfo: DrugLogRecord) => void,
    onHide: () => void
}

/**
 * Edit Modal for DrugLog
 *
 * @param {object} props :
 *          show {boolean} show/hide this modal
 *          drugLogInfo {Id: id, Note: ""}
 * @returns {boolean|*}
 * @constructor
 */
const DrugLogEdit = (props: IProps) => {
    const onClose = props.onClose;
    const [ show, setShow ] = useState(props.show);
    const [ drugLogInfo, setDrugLogInfo ] = useState(props.drugLogInfo);
    const onHide = props.onHide;
    const [ canSave, setCanSave ] = useState(false);
    const textInput = useRef<any>(null);

    // Observer for show
    useEffect(() => {setShow(props.show)}, [show, props.show]);

    // Observer for drugInfo
    useEffect(() => {setDrugLogInfo(props.drugLogInfo)}, [drugLogInfo, props.drugLogInfo]);

    // Disable the Save button if Notes are empty.
    useEffect(() => {
        const canSave = (drugLogInfo && drugLogInfo.Notes.length > 0) || false;
        setCanSave(canSave);
    }, [drugLogInfo]);

    /**
     * Fires when a text field or checkbox is changing.
     *
     * @param {KeyboardEvent} e
     */
    const handleOnChange = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLInputElement;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (drugLogInfo !== null) {
            drugLogInfo[name] = value;
            setDrugLogInfo({...drugLogInfo});
        }
    }

    /**
     * Fires when the user clicks on save or cancel
     *
     * @param {MouseEvent} e
     * @param {boolean} shouldSave
     */
    const handleHide = (e: React.MouseEvent<HTMLElement>, shouldSave: boolean) => {
        e.preventDefault();
        if (shouldSave) {
            const saveDrugLogInfo = {...drugLogInfo} as DrugLogRecord;
            onClose(saveDrugLogInfo);
        } else {
            onClose(null);
        }
        setShow(false);
    }

    // Short circuit render if there is no drugLogInfo.
    if (!drugLogInfo) {
        return false;
    }

     return (
        <Modal
            show={show}
            centered
            onHide={() => onHide()}
            onEntered={() => {
                if (textInput && textInput.current) {
                    textInput.current.focus();
                }
            }}
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
                                ref={textInput as RefObject<any>}
                                value={drugLogInfo.Notes}
                                name="Notes"
                                onChange={(e: any) => handleOnChange(e)}
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

export default DrugLogEdit;
