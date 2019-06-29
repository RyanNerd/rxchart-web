import React, {useEffect, useState} from 'reactn';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
export default function ResidentEdit(props)
{
    // Set up local initial state
    const [ show, setShow ] = useState(props.show);
    const [ residentInfo, setResidentInfo ] = useState(props.residentInfo);
    const [ canSave, setCanSave ] = useState(false);

    /**
     * Fires when a text field or checkbox is changing.
     *
     * @param  e
     */
    function handleOnChange(e)
    {
        const target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        residentInfo[name] = value;
        setResidentInfo({...residentInfo});
    }

    function handleHide(e, shouldSave)
    {
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

    // Determine if Save button can be enabled
    useEffect(() => {
        setCanSave(false);

        if (residentInfo && residentInfo.FirstName && residentInfo.FirstName.length !== 0) {
            if (residentInfo.LastName && residentInfo.LastName.length !== 0) {
                setCanSave(true);
            }
        }
    }, [residentInfo, residentInfo.FirstName, residentInfo.LastName]);

    const residentTitle = (residentInfo && residentInfo.Id) ? 'Edit Resident' : 'Add New Resident';

    // Prevent render if there is no data.
    if (!residentInfo) {
        return false;
    }

    return (
        <Modal
            show={show}
            centered
            onHide={()=>{}}
        >
            <Modal.Header closeButton>
                <Modal.Title>{residentTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="resident-first_name">
                        <Form.Label column sm="3">
                            First Name
                        </Form.Label>

                        <Col sm="7">
                            <Form.Control
                                type="text"
                                value={residentInfo.FirstName}
                                name="FirstName"
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="resident-last_name">
                        <Form.Label column sm="3">
                            Last Name
                        </Form.Label>

                        <Col sm="7">
                            <Form.Control
                                type="text"
                                value={residentInfo.LastName}
                                name="LastName"
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
                    onClick={(e) => handleHide(e, true)}
                    variant="primary"
                    disabled={!canSave}
                >
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}