import React, {useEffect, useGlobal, useRef, useState} from 'reactn';

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import Row from "react-bootstrap/Row";

import {PillboxRecord} from "../../../types/RecordTypes";
import {clientFullName} from "../../../utility/common";

interface IProps {
    pillboxInfo: PillboxRecord
    onClose: (r: PillboxRecord | null) => void
    show: boolean
}

/**
 * Edit Modal for Pillbox
 * @param {IProps} props
 * @returns {JSX.Element | null}
 */
const PillboxEdit = (props: IProps): JSX.Element | null => {
    const [activeResident] = useGlobal('activeResident');
    const [canSave, setCanSave] = useState(false);
    const [pillboxInfo, setPillboxInfo] = useState<PillboxRecord>(props.pillboxInfo);
    const [show, setShow] = useState(props.show);
    const textInput = useRef<HTMLInputElement>(null);

    // Observer for show
    useEffect(() => {
        setShow(props.show)
    }, [props.show]);

    // Observer/mutator for pillboxInfo
    useEffect(() => {
        const info = {...props.pillboxInfo};
        setPillboxInfo(info);
    }, [props.pillboxInfo]);

    // Disable the Save button if the Pillbox name is empty.
    useEffect(() => {
        // Is the Name field populated?
        if (pillboxInfo?.Name.length > 0) {
            // If any elements have an is-invalid class marker or the fill date is incomplete/ invalid
            // then don't allow a save.
            const isInvalidClasses = document.querySelectorAll('.is-invalid');
            setCanSave(isInvalidClasses.length === 0);
        } else {
            setCanSave(false);
        }
    }, [pillboxInfo, setCanSave]);

    /**
     * Fires when a text field or checkbox is changing.
     * @param {React.ChangeEvent<HTMLElement>} e
     */
    const handleOnChange = (e: React.ChangeEvent<HTMLElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        pillboxInfo[name] = value;
        setPillboxInfo({...pillboxInfo});
    }

    /**
     * Fires when the user clicks on save or cancel
     * @param {React.MouseEvent<HTMLElement>} e
     * @param {boolean} shouldSave
     */
    const handleHide = (e: React.MouseEvent<HTMLElement>, shouldSave: boolean) => {
        e.preventDefault();
        if (shouldSave) {
            props.onClose({...pillboxInfo});
        } else {
            props.onClose(null);
        }
        setShow(false);
    }

    // Short circuit render if there is no drugInfo record.
    if (!pillboxInfo) {
        return null;
    }

    const titleType = pillboxInfo.Id ? 'Edit Pillbox ' : 'Add Pillbox ' as string;
    const fullName = activeResident && clientFullName(activeResident);

    return (
        <Modal
            backdrop="static"
            centered
            onEntered={() => textInput?.current?.focus()}
            show={show}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {titleType} <b style={{color: "blue"}}><i>{pillboxInfo.Name}</i></b>
                    <span> for </span><b style={{backgroundColor: "yellow"}}>{fullName}</b>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="pillbox-modal-name">
                        <Form.Label column sm="2" style={{userSelect: "none"}}>
                            Pillbox Name
                        </Form.Label>

                        <Col sm="4">
                            <Form.Control
                                className={pillboxInfo.Name !== '' ? '' : 'is-invalid'}
                                ref={textInput}
                                type="text"
                                value={pillboxInfo.Name}
                                name="Name"
                                onChange={(e) => handleOnChange(e)}
                                required
                            />
                            <div className="invalid-feedback">
                                Pillbox Name field cannot be blank.
                            </div>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="pillbox-modal-notes">
                        <Form.Label column sm="2" style={{userSelect: "none"}}>
                            Notes
                        </Form.Label>

                        <Col sm="9">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={pillboxInfo.Notes ? pillboxInfo.Notes : ''}
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
                    variant={"primary"}
                >
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PillboxEdit;
