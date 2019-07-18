import React, {useEffect, useGlobal, useState} from 'reactn';
import Modal from 'react-bootstrap/Modal';
import {FULLNAME} from "../../utility/common";
// import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

/**
 * Edit Modal for Medicine
 *
 * @param props :
    *          show {boolean} show/hide this modal
 *          residentInfo {Id: id, FirstName: first_name, etc.}
 *
 * @returns {boolean|*}
 * @constructor
 */
export default function MedicineEdit(props)
{
    const [ show, setShow ] = useState(props.show);
    const [ drugInfo, setDrugInfo ] = useState(null);
    const [ activeResident ] = useGlobal('activeResident');

    let textInput = React.createRef();

    // Observer for show and drugInfo properties
    useEffect(() => {
        if (props.drugInfo) {
            setShow(props.show);
            setDrugInfo(props.drugInfo);
        }
    }, [props.show, props.drugInfo]);

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

        drugInfo[name] = value;
        setDrugInfo({...drugInfo});
    }

    /**
     * Fires when the user clicks on save or cancel
     *
     * @param {event} e
     * @param {boolean} shouldSave
     */
    function handleHide(e, shouldSave)
    {
        if (shouldSave) {
            props.onClose({...drugInfo});
        } else {
            props.onClose(null);
        }

        setShow(false);
    }

    // Short circuit render if there is no drugInfo record.
    if (!drugInfo) {
        return false;
    }

    const drugTitleType = drugInfo.Id ? 'Edit ' : 'Add ';
    const drugName = drugInfo.Id ? drugInfo.Drug : '';
    const fullName = activeResident && FULLNAME(activeResident);

    return (
        <Modal
            size="lg"
            show={show}
            centered
            onHide={() => props.onHide()}
            onEntered={() => textInput.current.focus()}
        >
            <Modal.Header closeButton>
                <Modal.Title>{drugTitleType} <b style={{color: "blue"}}><i>{drugName}</i></b><span> for </span><b style={{backgroundColor: "yellow"}}>{fullName}</b></Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="drug-name-strength">
                        <Form.Label column sm="2">
                            Drug Name
                        </Form.Label>

                        <Col sm="4">
                            <Form.Control
                                ref={textInput}
                                style={{textTransform: "uppercase"}}
                                type="text"
                                value={drugInfo.Drug}
                                name="Drug"
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Col>

                        <Form.Label column sm="1">
                            Strength
                        </Form.Label>

                        <Col sm="4">
                            <Form.Control
                                type="text"
                                value={drugInfo.Strength}
                                placeholder="e.g. 100 MG TABS"
                                name="Strength"
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="drug-barcode">
                        <Form.Label column sm="2">
                            Barcode
                        </Form.Label>

                        <Col sm="9">
                            <Form.Control
                                type="text"
                                value={drugInfo.Barcode}
                                name="Barcode"
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="drug-Directions">
                        <Form.Label column sm="2">
                            Directions
                        </Form.Label>

                        <Col sm="9">
                            <Form.Control
                                as="textarea"
                                rows="2"
                                value={drugInfo.Directions}
                                placeholder={'Take 1 tablet at bedtime'}
                                name="Directions"
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="drug-Notes">
                        <Form.Label column sm="2">
                            Notes
                        </Form.Label>

                        <Col sm="9">
                            <Form.Control
                                as="textarea"
                                rows="3"
                                value={drugInfo.Notes}
                                placeholder={'Take 1 tablet at bedtime'}
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
                    onClick={(e) => handleHide(e, true)}
                    variant="primary"
                >
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}