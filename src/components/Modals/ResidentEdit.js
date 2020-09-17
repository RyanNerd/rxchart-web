import React, {useEffect, useRef, useState} from 'reactn';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {isDayValid, isMonthValid, isYearValid} from "../../utility/common";
import PropTypes from 'prop-types';

/**
 * Edit Modal for Resident
 *
 * @param props :
 *          show {boolean} show/hide this modal
 *          residentInfo {Id: id, FirstName: first_name, etc.}
 *
 * @returns {boolean|*}
 * @constructor
 */
const ResidentEdit = (props) => {
    // Set up local initial state
    const [ show, setShow ] = useState(props.show);
    const [ residentInfo, setResidentInfo ] = useState(props.residentInfo);
    const focusRef = useRef(null);

    /**
     * Fires when a text field or checkbox is changing.
     *
     * @param  e
     */
    const handleOnChange = (e) => {
        const target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        residentInfo[name] = value;
        setResidentInfo({...residentInfo});
    }

    /**
     * Fires when the user clicks on save or cancel
     *
     * @param {MouseEvent} e
     * @param {boolean} shouldSave
     */
    const handleHide = (e, shouldSave) => {
        if (shouldSave) {
            props.onClose({...residentInfo});
        } else {
            props.onClose(null);
        }

        setShow(false);
    }

    // Observer for show property
    useEffect(() => {
        setShow(props.show)
    }, [props.show]);


    // Observer for residentInfo property
    useEffect(() => {
        setResidentInfo({...props.residentInfo});
    }, [props.residentInfo]);

    // Prevent render if there is no data.
    if (!residentInfo) {
        return false;
    }

    const residentTitle = residentInfo.Id ? 'Edit Resident' : 'Add New Resident';

    return (
        <Modal
          centered
          size="lg"
          show={show}
          onHide={(e, r)=>{handleHide(e, false)}}
          onEntered={() => focusRef.current.focus()}
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
                                className= {residentInfo.FirstName !== '' ? '' : 'is-invalid'}
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
                                className= {residentInfo.LastName !== '' ? '' : 'is-invalid'}
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
                                className= {isMonthValid(residentInfo.DOB_MONTH)}
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
                                className={isDayValid(residentInfo.DOB_DAY, residentInfo.DOB_MONTH)}
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
                                className={isYearValid(residentInfo.DOB_YEAR, true)}
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
                    disabled={isMonthValid(residentInfo.DOB_MONTH) + isDayValid(residentInfo.DOB_DAY, residentInfo.DOB_MONTH) + isYearValid(residentInfo.DOB_YEAR, true) !== ''}
                    onClick={(e) => handleHide(e, true)}
                    variant="primary"
                >
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

ResidentEdit.propTypes = {
    show: PropTypes.bool,
    residentInfo: PropTypes.object,
    onClose: PropTypes.func,
}

export default ResidentEdit;
