import {GenerateResponseData} from 'providers/PinProvider';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useState} from 'reactn';

interface IProps {
    pinData: GenerateResponseData;
    onClose?: (img: string | null) => void;
}

const DigitalSignature = (props: IProps) => {
    const [pinData, setPinData] = useState(props.pinData);
    useEffect(() => {
        setPinData(props.pinData);
    }, [props.pinData]);
    const [show, setShow] = useState(pinData !== null);
    useEffect(() => {
        setShow(pinData !== null);
    }, [pinData]);

    return (
        <Modal backdrop="static" centered show={show} size="lg">
            <Modal.Body>
                <h1>PIN: {pinData.pin.toString()}</h1>
                <p>{JSON.stringify(pinData)}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => setShow(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DigitalSignature;
