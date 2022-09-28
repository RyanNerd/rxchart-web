import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import React, {useEffect, useRef, useState} from 'reactn';
import {DrugLogRecord} from 'types/RecordTypes';

interface IProps {
    drugLogInfo: DrugLogRecord;
    drugName: string;
    onClose: (drugLogInfo: DrugLogRecord | null) => void;
    otc?: boolean;
    show: boolean;
}

/**
 * Edit Modal for DrugLog
 * @param {IProps} props Props for the component
 */
const DrugLogEdit = (props: IProps): JSX.Element | null => {
    const {otc, onClose, drugName} = props;

    const [drugLogInfo, setDrugLogInfo] = useState(props.drugLogInfo);
    useEffect(() => {
        const drugLogRecord = {...props.drugLogInfo};
        if (!drugLogRecord.Notes) drugLogRecord.Notes = '';
        setDrugLogInfo(drugLogRecord);
    }, [props.drugLogInfo]);

    const [show, setShow] = useState(props.show);
    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    const [canSave, setCanSave] = useState(false);
    useEffect(() => {
        const canSave =
            (drugLogInfo &&
                ((drugLogInfo.Notes && drugLogInfo.Notes.length > 0 && drugLogInfo.Notes !== '0') ||
                    (drugLogInfo.In && drugLogInfo.In > 0) ||
                    (drugLogInfo.Out && drugLogInfo.Out > 0))) ||
            false;
        setCanSave(canSave);
    }, [drugLogInfo]);

    const textInput = useRef<HTMLTextAreaElement>(null);
    const title = drugName ? 'Log ' + drugName.trim() : 'Log Drug';

    /**
     * Fires when a text field or checkbox is changing.
     * @param {React.KeyboardEvent<HTMLElement>} changeEvent Keyboard event object
     * @param {boolean} isNumber True if the expected input is numeric
     */
    const handleOnChange = (changeEvent: React.ChangeEvent<HTMLElement>, isNumber?: boolean) => {
        const target = changeEvent.target as HTMLInputElement;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (drugLogInfo !== null) {
            if (isNumber) {
                const n = Number.parseInt(value as string);
                if (n <= 0) drugLogInfo[name] = null;
                else drugLogInfo[name] = n;
            } else {
                drugLogInfo[name] = value;
            }
            setDrugLogInfo({...drugLogInfo});
        }
    };

    /**
     * Fires when the user clicks on Save or Cancel
     * @param {boolean} shouldSave True if the user clicked save, otherwise false
     */
    const handleHide = (shouldSave: boolean) => {
        if (shouldSave) onClose({...drugLogInfo});
        else onClose(null);
        setShow(false);
    };

    // Short circuit render if there is no drugLogInfo.
    if (!drugLogInfo) return null;

    return (
        <Modal backdrop="static" centered onEntered={() => textInput?.current?.focus()} show={show}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
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
                                name="Notes"
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                ref={textInput}
                                value={drugLogInfo.Notes as string}
                            />
                        </Col>
                    </Form.Group>

                    {!otc && (
                        <>
                            <Form.Group as={Row} controlId="checkout-out">
                                <Form.Label column md="4">
                                    Out
                                </Form.Label>
                                <Col md="8">
                                    <Form.Control
                                        name="Out"
                                        onChange={(changeEvent) => handleOnChange(changeEvent, true)}
                                        type="number"
                                        value={drugLogInfo.Out || undefined}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="checkout-in">
                                <Form.Label column md="4">
                                    In
                                </Form.Label>
                                <Col md="8">
                                    <Form.Control
                                        name="In"
                                        onChange={(changeEvent) => handleOnChange(changeEvent, true)}
                                        type="number"
                                        value={drugLogInfo.In || undefined}
                                    />
                                </Col>
                            </Form.Group>
                        </>
                    )}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => handleHide(false)} variant="secondary">
                    Cancel
                </Button>
                <Button disabled={!canSave} onClick={() => handleHide(true)} variant="primary">
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DrugLogEdit;
