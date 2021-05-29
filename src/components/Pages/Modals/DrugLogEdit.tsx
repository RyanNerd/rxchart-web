import React, {useEffect, useRef, useState} from 'reactn';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {DrugLogRecord} from "../../../types/RecordTypes";

interface IProps {
    drugLogInfo: DrugLogRecord
    drugName: string
    onClose: (drugLogInfo: DrugLogRecord | null) => void
    onHide: () => void
    otc?: boolean
    show: boolean
}

/**
 * Edit Modal for DrugLog
 * @param {IProps} props
 * @returns {JSX.Element | null}
 */
const DrugLogEdit = (props: IProps): JSX.Element | null => {
    const [canSave, setCanSave] = useState(false);
    const [drugLogInfo, setDrugLogInfo] = useState(props.drugLogInfo);
    const [show, setShow] = useState(props.show);
    const otc = props.otc;
    const onClose = props.onClose;
    const onHide = props.onHide;
    const title = props.drugName ? 'Log ' + props.drugName.trim() : 'Log Drug';
    const textInput = useRef<HTMLTextAreaElement>(null);

    // Observer for show
    useEffect(() => {
        setShow(props.show)
    }, [props.show]);

    // Observer for drugInfo
    useEffect(() => {
        setDrugLogInfo(props.drugLogInfo)
    }, [props.drugLogInfo]);

    // Disable the Save button if Notes are empty.
    useEffect(() => {
        const canSave = (drugLogInfo &&
            (
                (drugLogInfo.Notes?.length > 0) ||
                (drugLogInfo.In && drugLogInfo.In > 0) ||
                (drugLogInfo.Out && drugLogInfo.Out> 0)
            )
        ) || false;
        setCanSave(canSave);
    }, [drugLogInfo]);

    /**
     * Fires when a text field or checkbox is changing.
     * @param e {React.KeyboardEvent<HTMLElement>}
     * @param isNumber {boolean}
     */
    const handleOnChange = (e: React.ChangeEvent<HTMLElement>, isNumber?: boolean) => {
        const target = e.target as HTMLInputElement;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (drugLogInfo !== null) {
            if (isNumber) {
                const num = parseInt(value as string);
                if (num <= 0) {
                    drugLogInfo[name] = null;
                } else {
                    drugLogInfo[name] = num;
                }
            } else {
                drugLogInfo[name] = value;
            }
            setDrugLogInfo({...drugLogInfo});
        }
    }

    /**
     * Fires when the user clicks on Save or Cancel
     * @param {React.MouseEvent<HTMLElement>} e
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
        return null;
    }

    return (
        <Modal
            backdrop="static"
            centered
            onHide={() => onHide()}
            onEntered={() => {
                if (textInput && textInput.current) {
                    textInput.current.focus();
                }
            }}
            show={show}
        >
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
                                ref={textInput}
                                value={drugLogInfo.Notes}
                                name="Notes"
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Col>
                    </Form.Group>

                    {!otc &&
                    <>
                        <Form.Group as={Row} controlId="checkout-out">
                            <Form.Label column md="4">
                                Out
                            </Form.Label>
                            <Col md="8">
                                <Form.Control
                                    type="number"
                                    value={drugLogInfo.Out || undefined}
                                    name="Out"
                                    onChange={(e) => handleOnChange(e, true)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="checkout-in">
                            <Form.Label column md="4">
                                In
                            </Form.Label>
                            <Col md="8">
                                <Form.Control
                                    type="number"
                                    value={drugLogInfo.In || undefined}
                                    name="In"
                                    onChange={(e) => handleOnChange(e, true)}
                                />
                            </Col>
                        </Form.Group>
                    </>
                    }
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
