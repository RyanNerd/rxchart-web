import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import isDayValid from "../Validation/IsDayValid";
import isMonthValid from "../Validation/IsMonthValid";
import isYearValid from "../Validation/IsYearValid";
import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useRef, useState} from 'reactn';
import Row from "react-bootstrap/Row";
import {ResidentRecord} from "../../../types/RecordTypes";

interface IProps {
    onClose: (r: ResidentRecord | null) => void
    residentInfo: ResidentRecord
    show: boolean
}

/**
 * Edit Modal for Resident
 * @param {IProps} props
 * @returns {JSX.Element | null}
 * @constructor
 */
const ResidentEdit = (props: IProps): JSX.Element | null => {
    const [show, setShow] = useState(props.show);
    const [residentInfo, setResidentInfo] = useState<ResidentRecord>(props.residentInfo);
    const focusRef = useRef<HTMLInputElement>(null);

    /**
     * Fires when a text field or checkbox is changing.
     * @param {React.KeyboardEvent<HTMLElement>} e
     */
    const handleOnChange = (e: React.ChangeEvent<HTMLElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        residentInfo[name] = value;
        setResidentInfo({...residentInfo});
    }

    /**
     * Fires when the user clicks on save or cancel
     * @param {React.MouseEvent<HTMLElement>} e
     * @param {boolean} shouldSave
     */
    const handleHide = (e: React.MouseEvent<HTMLElement>, shouldSave: boolean) => {
        e.preventDefault();
        if (shouldSave) {
            props.onClose({...residentInfo});
        } else {
            props.onClose(null);
        }
        setShow(false);
    }

    // Observer for show
    useEffect(() => {
        setShow(props.show)
    }, [props.show]);

    // Observer for residentInfo property
    useEffect(() => {
        if (props.residentInfo) {
            setResidentInfo({...props.residentInfo});
        }
    }, [props.residentInfo]);

    // Prevent render if there is no data.
    if (!residentInfo) {
        return null;
    }

    const residentTitle = residentInfo.Id ? 'Edit Resident' : 'Add New Resident';

    return (
        <Modal
            backdrop="static"
            centered
            onEntered={() => focusRef?.current?.focus()}
            show={show}
            size="lg"
        >
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
                                type="text"
                                value={residentInfo.FirstName}
                                name="FirstName"
                                onChange={(e) => handleOnChange(e)}
                                ref={focusRef}
                            />
                            <div className="invalid-feedback">
                                First name can not be blank.
                            </div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="resident-last_name">
                        <Form.Label column sm="2">
                            Last Name
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control
                                className={residentInfo.LastName !== '' ? '' : 'is-invalid'}
                                type="text"
                                value={residentInfo.LastName}
                                name="LastName"
                                onChange={(e) => handleOnChange(e)}
                            />
                            <div className="invalid-feedback">
                                Last name can not be blank.
                            </div>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            DOB Month
                        </Form.Label>
                        <Col sm="2">
                            <Form.Control
                                className={isMonthValid(residentInfo.DOB_MONTH.toString())}
                                type="text"
                                value={residentInfo.DOB_MONTH}
                                name="DOB_MONTH"
                                onChange={(e) => handleOnChange(e)}
                            />
                            <div className="invalid-feedback">
                                Enter the month (1-12).
                            </div>
                        </Col>

                        <Form.Label column sm={1}>
                            Day
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Control
                                className={
                                    isDayValid(residentInfo.DOB_DAY.toString(), residentInfo.DOB_MONTH.toString())
                                }
                                type="text"
                                value={residentInfo.DOB_DAY}
                                name="DOB_DAY"
                                onChange={(e) => handleOnChange(e)}
                            />
                            <div className="invalid-feedback">
                                Enter a valid day (1-31).
                            </div>
                        </Col>
                        <Form.Label column sm={1}>
                            Year
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control
                                className={isYearValid(residentInfo.DOB_YEAR.toString(), true)}
                                type="text"
                                value={residentInfo.DOB_YEAR}
                                name="DOB_YEAR"
                                onChange={(e) => handleOnChange(e)}
                            />
                            <div className="invalid-feedback">
                                Enter a valid birth year.
                            </div>
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
                    disabled={
                        isMonthValid(residentInfo.DOB_MONTH.toString()) +
                        isDayValid(residentInfo.DOB_DAY.toString(), residentInfo.DOB_MONTH.toString()) +
                        isYearValid(residentInfo.DOB_YEAR.toString()
                            , true) !== ''
                    }
                    onClick={(e) => handleHide(e, true)}
                    variant="primary"
                >
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ResidentEdit;
