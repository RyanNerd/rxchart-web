import React, {useEffect, useGlobal, useRef, useState} from 'reactn';
import Modal from 'react-bootstrap/Modal';
import {FULLNAME} from "../../utility/common";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';

/**
 * Edit Modal for Medicine
 *
 * @param {object} props :
 *          show {boolean} show/hide this modal
 *          drugInfo {Id: id, Drug: drug_name, etc.}
 *
 * @returns {boolean|*}
 * @constructor
 */
const MedicineEdit = (props) => {
    const [ show, setShow ] = useState(props.show);
    const [ drugInfo, setDrugInfo ] = useState(null);
    const [ canSave, setCanSave ] = useState(false);
    const [ activeResident ] = useGlobal('activeResident');

    const otc = props.otc;
    const textInput = useRef(null);

    // Observer for show and drugInfo properties
    useEffect(() => {
        if (props.drugInfo) {
            setShow(props.show);
            setDrugInfo(props.drugInfo);
        }
    }, [props.show, props.drugInfo]);

    // Disable the Save button if the Drug name is empty.
    useEffect(() => {
        if (drugInfo && drugInfo.Drug.length > 0) {
            setCanSave(true);
        } else {
            setCanSave(false);
        }
    }, [drugInfo]);
    /**
     * Fires when a text field or checkbox is changing.
     *
     * @param  e
     */
    const handleOnChange = (e) => {
        const target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        drugInfo[name] = value;
        setDrugInfo({...drugInfo});
    }

    /**
     * Fires when the user clicks on save or cancel
     *
     * @param {MouseEvent} e
     * @param {boolean} shouldSave
     */
    const handleHide = (e, shouldSave) => {
        e.preventDefault();
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
    const drugName = drugInfo.Id ? drugInfo.Drug : 'new drug';
    const fullName = activeResident && FULLNAME(activeResident);
    const modalTitle = otc ?
        (<Modal.Title>{drugTitleType} OTC <b style={{color: "blue"}}><i>{drugName}</i></b></Modal.Title>)
        :
        (<Modal.Title>{drugTitleType} <b style={{color: "blue"}}><i>{drugName}</i></b><span> for </span><b style={{backgroundColor: "yellow"}}>{fullName}</b></Modal.Title>);

    return (
        <Modal
            size="lg"
            show={show}
            centered
            onHide={() => props.onHide()}
            onEntered={() => textInput.current.focus()}
        >
            <Modal.Header closeButton>
                {modalTitle}
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Drug Name
                        </Form.Label>

                        <Col sm="4">
                            <Form.Control
                                ref={textInput}
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

                    {!otc &&
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Fill Date Month
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Control
                                type="text"
                                value={drugInfo.FillDateMonth}
                                name="FillDateMonth"
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Col>
                        <Form.Label column sm="1">
                            Day
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Control
                                type="text"
                                value={drugInfo.FillDateDay}
                                name="FillDateDay"
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Col>
                        <Form.Label column sm="1">
                            Year
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control
                                type="text"
                                value={drugInfo.FillDateYear}
                                name="FillDateYear"
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Col>
                    </Form.Group>
                    }

                    <Form.Group as={Row} controlId="drug-Directions">
                        <Form.Label column sm="2">
                            Directions
                        </Form.Label>

                        <Col sm="9">
                            <Form.Control
                                as="textarea"
                                rows="2"
                                value={drugInfo.Directions}
                                placeholder="e.g. Take 1 tablet at bedtime"
                                name="Directions"
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Col>
                    </Form.Group>

                    {!otc &&
                    <Form.Group as={Row} controlId="otc-drug-Notes">
                        <Form.Label column sm="2">
                            Notes
                        </Form.Label>

                        <Col sm="9">
                            <Form.Control
                                as="textarea"
                                rows="3"
                                value={drugInfo.Notes}
                                name="Notes"
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Col>
                    </Form.Group>
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

MedicineEdit.propTypes = {
    show: PropTypes.bool,
    otc: PropTypes.bool,
    drugInfo: PropTypes.object,
    onClose: PropTypes.func,
    onHide: PropTypes.func
}

export default MedicineEdit;
