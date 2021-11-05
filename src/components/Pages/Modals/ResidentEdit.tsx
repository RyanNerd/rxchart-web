import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import React, {useEffect, useRef, useState} from 'reactn';
import {ClientRecord} from 'types/RecordTypes';
import {isDateFuture, isDayValid, isMonthValid, isYearValid} from 'utility/common';

interface IProps {
    onClose: (r: ClientRecord | null) => void;
    residentInfo: ClientRecord;
    show: boolean;
}

/**
 * Edit Modal for Resident
 * @param {IProps} props Props for the component
 * @returns {JSX.Element | null}
 */
const ResidentEdit = (props: IProps): JSX.Element | null => {
    const [residentInfo, setResidentInfo] = useState<ClientRecord>(props.residentInfo);
    useEffect(() => {
        if (props.residentInfo) setResidentInfo({...props.residentInfo});
    }, [props.residentInfo]);

    const [show, setShow] = useState(props.show);
    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    const [canSave, setCanSave] = useState(true);
    useEffect(() => {
        setCanSave(document.querySelectorAll('.is-invalid')?.length === 0);
    }, [residentInfo, setResidentInfo]);

    const onClose = props.onClose;
    const focusRef = useRef<HTMLInputElement>(null);

    /**
     * Fires when a text field or checkbox is changing.
     * @param {React.KeyboardEvent<HTMLElement>} e Keyboard event object
     */
    const handleOnChange = (e: React.ChangeEvent<HTMLElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        residentInfo[name] = value;
        setResidentInfo({...residentInfo});
    };

    /**
     * Fires when the user clicks on save or cancel
     * @param {boolean} shouldSave Set to true if the user clicked the save button, otherwise false
     */
    const handleHide = (shouldSave: boolean) => {
        if (shouldSave) onClose({...residentInfo});
        else onClose(null);
        setShow(false);
    };

    /**
     * Verify the DOB
     * @returns {boolean} true if valid, otherwise false
     */
    const isDobValid = (): boolean => {
        const dobYear = residentInfo.DOB_YEAR.toString();
        const dobMonth = residentInfo.DOB_MONTH.toString();
        const dobDay = residentInfo.DOB_DAY.toString();
        const dob = new Date(
            residentInfo.DOB_YEAR as number,
            residentInfo.DOB_MONTH as number,
            residentInfo.DOB_DAY as number
        );

        if (dobYear !== '' && dobMonth !== '' && dobDay !== '') {
            return (
                isYearValid(dobYear, true) &&
                isMonthValid(dobMonth) &&
                isDayValid(dobDay, dobMonth) &&
                !isDateFuture(dob)
            );
        } else {
            return false;
        }
    };

    // Prevent render if there is no data.
    if (!residentInfo) return null;

    const residentTitle = residentInfo.Id ? 'Edit Client' : 'Add New Client';

    return (
        <Modal backdrop="static" centered onEntered={() => focusRef?.current?.focus()} show={show} size="lg">
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
                                className={residentInfo.FirstName !== '' ? '' : 'is-invalid'}
                                name="FirstName"
                                onChange={(e) => handleOnChange(e)}
                                ref={focusRef}
                                required
                                type="text"
                                value={residentInfo.FirstName}
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
                                className={residentInfo.LastName !== '' ? '' : 'is-invalid'}
                                name="LastName"
                                onChange={(e) => handleOnChange(e)}
                                required
                                type="text"
                                value={residentInfo.LastName}
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
                                onChange={(e) => handleOnChange(e)}
                                required
                                type="text"
                                value={residentInfo.Nickname}
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
                                className={isMonthValid(residentInfo.DOB_MONTH.toString()) ? '' : 'is-invalid'}
                                name="DOB_MONTH"
                                onChange={(e) => handleOnChange(e)}
                                required
                                type="text"
                                value={residentInfo.DOB_MONTH}
                            />
                            <div className="invalid-feedback">Enter the month (1-12).</div>
                        </Col>

                        <Form.Label column sm={1}>
                            Day
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Control
                                className={
                                    isDayValid(residentInfo.DOB_DAY.toString(), residentInfo.DOB_MONTH.toString())
                                        ? ''
                                        : 'is-invalid'
                                }
                                name="DOB_DAY"
                                onChange={(e) => handleOnChange(e)}
                                required
                                type="text"
                                value={residentInfo.DOB_DAY}
                            />
                            <div className="invalid-feedback">Enter a valid day.</div>
                        </Col>
                        <Form.Label column sm={1}>
                            Year
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control
                                className={isYearValid(residentInfo.DOB_YEAR.toString(), true) ? '' : 'is-invalid'}
                                name="DOB_YEAR"
                                onChange={(e) => handleOnChange(e)}
                                required
                                type="text"
                                value={residentInfo.DOB_YEAR}
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
                                className={residentInfo?.Notes?.trim().length > 500 ? 'is-invalid' : ''}
                                name="Notes"
                                onChange={(e) => handleOnChange(e)}
                                rows={4}
                                value={residentInfo.Notes}
                            />
                            <div className="invalid-feedback">
                                Notes can only be 500 characters long. length={residentInfo?.Notes?.trim().length}
                            </div>
                        </Col>
                    </Form.Group>
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

export default ResidentEdit;
