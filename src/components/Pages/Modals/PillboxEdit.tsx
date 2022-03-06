import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import React, {useEffect, useRef, useState} from 'reactn';
import {ClientRecord, PillboxRecord} from 'types/RecordTypes';
import {clientFullName} from 'utility/common';

interface IProps {
    clientRecord: ClientRecord;
    onClose: (r: PillboxRecord | null) => void;
    pillboxInfo: PillboxRecord;
    show: boolean;
}

/**
 * Edit Modal for Pillbox
 * @param {IProps} props Props for the component
 */
const PillboxEdit = (props: IProps): JSX.Element | null => {
    const {clientRecord, onClose} = props;

    const [pillboxInfo, setPillboxInfo] = useState<PillboxRecord>(props.pillboxInfo);
    useEffect(() => {
        setPillboxInfo({...props.pillboxInfo});
    }, [props.pillboxInfo]);

    const [show, setShow] = useState(props.show);
    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    const [canSave, setCanSave] = useState(false);
    useEffect(() => {
        if (pillboxInfo?.Name?.length > 0) setCanSave(document.querySelectorAll('.is-invalid')?.length === 0);
        else setCanSave(false);
    }, [pillboxInfo, setCanSave]);

    const textInput = useRef<HTMLInputElement>(null);

    /**
     * Fires when a text field or checkbox is changing.
     * @param {React.ChangeEvent<HTMLElement>} changeEvent Change event object
     */
    const handleOnChange = (changeEvent: React.ChangeEvent<HTMLElement>) => {
        const target = changeEvent.target as HTMLInputElement;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        pillboxInfo[name] = value;
        setPillboxInfo({...pillboxInfo});
    };

    /**
     * Fires when the user clicks on save or cancel
     * @param {boolean} shouldSave True if the user clicked the save button, otherwise false
     */
    const handleHide = (shouldSave: boolean) => {
        if (shouldSave) onClose({...pillboxInfo});
        else onClose(null);
        setShow(false);
    };

    // Short circuit render if there is no drugInfo record.
    if (!pillboxInfo) return null;

    const titleType = pillboxInfo.Id ? 'Edit Pillbox ' : ('Add Pillbox ' as string);
    const fullName = clientFullName(clientRecord);

    return (
        <Modal backdrop="static" centered onEntered={() => textInput?.current?.focus()} show={show} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {titleType}{' '}
                    <b style={{color: 'blue'}}>
                        <i>{pillboxInfo.Name}</i>
                    </b>
                    <span> for </span>
                    <b style={{backgroundColor: 'yellow'}}>{fullName}</b>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="pillbox-modal-name">
                        <Form.Label column sm="2" style={{userSelect: 'none'}}>
                            Pillbox Name
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control
                                className={pillboxInfo.Name !== '' ? '' : 'is-invalid'}
                                name="Name"
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                ref={textInput}
                                required
                                type="text"
                                value={pillboxInfo.Name}
                            />
                            <Form.Control.Feedback type="invalid">
                                Pillbox Name field cannot be blank.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="pillbox-modal-notes">
                        <Form.Label column sm="2" style={{userSelect: 'none'}}>
                            Notes
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                as="textarea"
                                name="Notes"
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                rows={3}
                                value={pillboxInfo.Notes ? pillboxInfo.Notes : ''}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => handleHide(false)} variant="secondary">
                    Cancel
                </Button>
                <Button disabled={!canSave} onClick={() => handleHide(true)} variant={'primary'}>
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PillboxEdit;
