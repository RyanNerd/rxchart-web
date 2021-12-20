import {IClientManager} from 'managers/ClientManager';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import React, {useEffect, useRef, useState} from 'reactn';
import {ClientRecord} from 'types/RecordTypes';
import {isDateFuture, isDayValid, isMonthValid, isYearValid} from 'utility/common';

interface IProps {
    clientInfo: ClientRecord;
    cm: IClientManager;
    onClose: (r: ClientRecord | null) => void;
    show: boolean;
}

/**
 * Edit Modal for Client
 * @param {IProps} props Props for the component
 */
const ClientEdit = (props: IProps): JSX.Element | null => {
    const cm = props.cm;
    const [isDupe, setIsDupe] = useState(false);

    const [clientInfo, setClientInfo] = useState<ClientRecord>(props.clientInfo);
    useEffect(() => {
        if (props.clientInfo) setClientInfo({...props.clientInfo});
    }, [props.clientInfo]);

    const [show, setShow] = useState(props.show);
    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    const [canSave, setCanSave] = useState(true);
    useEffect(() => {
        setCanSave(document.querySelectorAll('.is-invalid')?.length === 0);
    }, [clientInfo, setClientInfo]);

    const onClose = props.onClose;
    const focusReference = useRef<HTMLInputElement>(null);

    /**
     * Fires when a text field or checkbox is changing.
     * @param {React.KeyboardEvent<HTMLElement>} changeEvent Keyboard event object
     */
    const handleOnChange = (changeEvent: React.ChangeEvent<HTMLElement>) => {
        const target = changeEvent.target as HTMLInputElement;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        clientInfo[name] = value;
        setClientInfo({...clientInfo});
    };

    /**
     * Fires when the user clicks on save or cancel
     * @param {boolean} shouldSave Set to true if the user clicked the save button, otherwise false
     */
    const handleHide = (shouldSave: boolean) => {
        if (shouldSave) onClose({...clientInfo});
        else onClose(null);
        setShow(false);
    };

    /**
     * Verify the DOB
     * @returns {boolean} true if valid, otherwise false
     */
    const isDobValid = (): boolean => {
        const dobYear = clientInfo.DOB_YEAR.toString();
        const dobMonth = clientInfo.DOB_MONTH.toString();
        const dobDay = clientInfo.DOB_DAY.toString();
        const dob = new Date(
            clientInfo.DOB_YEAR as number,
            clientInfo.DOB_MONTH as number,
            clientInfo.DOB_DAY as number
        );

        return dobYear !== '' && dobMonth !== '' && dobDay !== ''
            ? isYearValid(dobYear, true) && isMonthValid(dobMonth) && isDayValid(dobDay, dobMonth) && !isDateFuture(dob)
            : false;
    };

    /**
     * Called each time focus is changed on fields that could be a duplicate
     */
    const checkForDuplicates = () => {
        cm.checkForDupe(clientInfo).then((dupe) => setIsDupe(dupe.length > 0));
    };

    // Prevent render if there is no data.
    if (!clientInfo) return null;

    const residentTitle = clientInfo.Id ? 'Edit Client' : 'Add New Client';

    return (
        <Modal backdrop="static" centered onEntered={() => focusReference?.current?.focus()} show={show} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{residentTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="resident-first_name">
                        <Form.Label column sm="2">
                            First Name
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control
                                className={clientInfo.FirstName !== '' ? '' : 'is-invalid'}
                                name="FirstName"
                                onBlur={() => checkForDuplicates()}
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                ref={focusReference}
                                required
                                type="text"
                                value={clientInfo.FirstName}
                            />
                            <div className="invalid-feedback">First name can not be blank.</div>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="resident-last_name">
                        <Form.Label column sm="2">
                            Last Name
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control
                                className={clientInfo.LastName !== '' ? '' : 'is-invalid'}
                                name="LastName"
                                onBlur={() => checkForDuplicates()}
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                required
                                type="text"
                                value={clientInfo.LastName}
                            />
                            <div className="invalid-feedback">Last name can not be blank.</div>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="client-nickname">
                        <Form.Label column sm="2">
                            Nickname
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control
                                name="Nickname"
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                required
                                type="text"
                                value={clientInfo.Nickname}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            <span className={isDobValid() ? '' : 'is-invalid'}>DOB</span> <span>Month</span>
                            <div className="invalid-feedback">Invalid Date of Birth</div>
                        </Form.Label>
                        <Col sm="2">
                            <Form.Control
                                className={isMonthValid(clientInfo.DOB_MONTH.toString()) ? '' : 'is-invalid'}
                                name="DOB_MONTH"
                                onBlur={() => checkForDuplicates()}
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                required
                                type="text"
                                value={clientInfo.DOB_MONTH}
                            />
                            <div className="invalid-feedback">Enter the month (1-12).</div>
                        </Col>

                        <Form.Label column sm={1}>
                            Day
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Control
                                className={
                                    isDayValid(clientInfo.DOB_DAY.toString(), clientInfo.DOB_MONTH.toString())
                                        ? ''
                                        : 'is-invalid'
                                }
                                name="DOB_DAY"
                                onBlur={() => checkForDuplicates()}
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                required
                                type="text"
                                value={clientInfo.DOB_DAY}
                            />
                            <div className="invalid-feedback">Enter a valid day.</div>
                        </Col>
                        <Form.Label column sm={1}>
                            Year
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control
                                className={isYearValid(clientInfo.DOB_YEAR.toString(), true) ? '' : 'is-invalid'}
                                name="DOB_YEAR"
                                onBlur={() => checkForDuplicates()}
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                required
                                type="text"
                                value={clientInfo.DOB_YEAR}
                            />
                            <div className="invalid-feedback">Enter a valid birth year.</div>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Notes
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                as="textarea"
                                className={clientInfo?.Notes?.trim().length > 500 ? 'is-invalid' : ''}
                                name="Notes"
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                rows={4}
                                value={clientInfo.Notes}
                            />
                            <div className="invalid-feedback">
                                Notes can only be 500 characters long. length={clientInfo?.Notes?.trim().length}
                            </div>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => handleHide(false)} variant="secondary">
                    Cancel
                </Button>
                <Button
                    className={isDupe ? 'is-invalid' : ''}
                    disabled={!canSave}
                    onClick={() => handleHide(true)}
                    style={{cursor: canSave ? 'pointer' : 'not-allowed'}}
                    variant="primary"
                >
                    Save changes
                </Button>
                <div className="invalid-feedback" style={{textAlign: 'right'}}>
                    This client already exists
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default ClientEdit;
