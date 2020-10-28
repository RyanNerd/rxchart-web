import React, {useEffect, useGlobal, useRef, useState} from 'reactn';
import Modal from 'react-bootstrap/Modal';
import {FullName} from "../../utility/common";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {MedicineRecord} from "../../types/RecordTypes";
import {Alert} from "react-bootstrap";

interface IProps {
    drugInfo: MedicineRecord
    onClose: (r: MedicineRecord | null) => void
    otc?: boolean
    show: boolean
}

/**
 * Edit Modal for Medicine
 * @param {IProps} props
 * @returns {JSX.Element | null}
 * @constructor
 */
const MedicineEdit = (props: IProps): JSX.Element | null => {
    const [ show, setShow ] = useState(props.show);
    const [ drugInfo, setDrugInfo ] = useState<MedicineRecord>(props.drugInfo);
    const [ canSave, setCanSave ] = useState<boolean>(false);
    const [ activeResident ] = useGlobal('activeResident');
    const otc = props.otc;
    const textInput = useRef<HTMLInputElement>(null);

    // Observer for show
    useEffect(() => {setShow(props.show)}, [props.show]);

    // Observer/mutator for drugInfo
    useEffect(() => {
        const info = {...props.drugInfo};
        if (info && info.Directions === null) {
            info.Directions = '';
        }
        if (info && info.Notes === null) {
            info.Notes = '';
        }
        setDrugInfo(info);
    }, [props.drugInfo]);

    // Disable the Save button if the Drug name is empty.
    useEffect(() => {
        if (drugInfo && drugInfo.Drug) {
            if (drugInfo.Drug.length > 0) {
                setCanSave(true);
            }
        }
    }, [drugInfo]);

    /**
     * Fires when a text field or checkbox is changing.
     * @param {React.ChangeEvent<HTMLElement>} e
     */
    const handleOnChange = (e: React.ChangeEvent<HTMLElement>) => {
        const target = e.target as HTMLInputElement;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        drugInfo[name] = value;
        setDrugInfo({...drugInfo});
    }

    /**
     * Fires when the user clicks on save or cancel
     * @param {React.MouseEvent<HTMLElement>} e
     * @param {boolean} shouldSave
     */
    const handleHide = (e: React.MouseEvent<HTMLElement>, shouldSave: boolean) => {
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
        return null;
    }

    const drugTitleType = drugInfo.Id ? 'Edit ' : 'Add ' as string;
    const drugName = drugInfo.Id ? drugInfo.Drug : 'new drug';
    const fullName = activeResident && FullName(activeResident);
    const modalTitle = otc ?
        (
            <Modal.Title>
                {drugTitleType} OTC <b style={{color: "blue"}}><i>{drugName}</i></b>
            </Modal.Title>
        ) : (
            <Modal.Title>
                {drugTitleType} <b style={{color: "blue"}}><i>{drugName}</i></b>
                    <span> for </span><b style={{backgroundColor: "yellow"}}>{fullName}</b>
            </Modal.Title>
        );

    return (
        <Modal
            backdrop="static"
            centered
            onEntered={() => {
                if (textInput && textInput.current) {
                    textInput.current.focus()
                }
            }}
            show={show}
            size="lg"
        >
            <Modal.Header closeButton>
                {modalTitle}
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {otc && drugTitleType === 'Edit ' &&
                    <Form.Group as={Row} controlId="otc-alert">
                        <Form.Label
                            column sm="2"
                        >
                            <span style={{color: "red"}}><b>OTC Warning</b></span>
                        </Form.Label>

                        <Alert
                            variant="danger"
                        >
                            <span style={{color: "red"}}>
                                <b>CAUTION:</b>
                            </span> Changes to this OTC medicine will affect <b>ALL</b> residents!
                        </Alert>
                    </Form.Group>
                    }

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
                                value={drugInfo.Strength ? drugInfo.Strength : ''}
                                placeholder="e.g. 100 MG TABS"
                                name="Strength"
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
                                rows={2}
                                value={drugInfo.Directions ? drugInfo.Directions : ''}
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
                                rows={3}
                                value={(drugInfo && drugInfo.Notes) || ''}
                                name="Notes"
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Col>
                    </Form.Group>
                    }

                    <Form.Group as={Row} controlId="drug-barcode">
                        <Form.Label column sm="2">
                            Barcode
                        </Form.Label>

                        <Col sm="9">
                            <Form.Control
                                type="text"
                                value={drugInfo.Barcode ? drugInfo.Barcode : ''}
                                name="Barcode"
                                onChange={(e) => handleOnChange(e)}
                            />
                        </Col>
                    </Form.Group>

                    {!otc &&
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Fill Date
                        </Form.Label>
                        <Form.Label column sm="1">
                            Month
                        </Form.Label>
                        <Col sm={1}>
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
                        <Col sm={1}>
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
                        <Col sm={2}>
                            <Form.Control
                                type="text"
                                value={drugInfo.FillDateYear}
                                name="FillDateYear"
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
                    variant={otc && drugTitleType === 'Edit ' ? "danger" : "primary"}
                >
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MedicineEdit;
