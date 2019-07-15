import React, {useEffect, useState} from 'reactn';
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Form from "react-bootstrap/Form";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";

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

    // Observer for show property
    useEffect(() => {
        setShow(props.show)
    }, [props.show]);

    if (!props.drugInfo) {
        return false;
    }

    const drugName = props.drugInfo.Id ? props.drugInfo.Drug : '';
    const barcode = props.drugInfo.Barcode;


    return (
        <Modal
            size="lg"
            show={show}
            centered
            onHide={() => props.onHide()}
        >
            <Modal.Header closeButton>
                <Modal.Title>MEDICINE <b>{drugName}</b> PLACEHOLDER</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Medicine barcode: {barcode}</p>
            </Modal.Body>
        </Modal>
    );
}