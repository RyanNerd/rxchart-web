import {GenerateResponseData, IPinProvider} from 'providers/PinProvider';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useState} from 'reactn';
import useInterval from 'utility/useInterval';

interface IProps {
    pinProvider: IPinProvider;
    pinData: GenerateResponseData;
    onClose?: (img: string | null) => void;
}

const DigitalSignature = (props: IProps) => {
    const pinProvider = props.pinProvider;
    const onClose = props.onClose;
    const [pinData, setPinData] = useState(props.pinData);
    const [image, setImage] = useState<string | null>(null);
    useEffect(() => {
        setPinData(props.pinData);
    }, [props.pinData]);
    const [show, setShow] = useState(pinData !== null);
    useEffect(() => {
        setShow(pinData !== null);
    }, [pinData]);

    useInterval(() => {
        pinProvider.read(pinData.pin_id).then((pinReadData) => {
            if (pinReadData.Image !== null) {
                setImage(pinReadData.Image);
            }
        });
    }, 5000);

    /**
     * Handle when user clicks Cancel PIN entry by closing the modal and deleting the PIN record
     */
    const handleCancelPinEntry = () => {
        setShow(false);
        pinProvider.delete(pinData.pin_id).then((isDeleted) => {
            if (isDeleted && onClose) {
                onClose(null);
            } else {
                throw new Error('Unable to delete PIN record');
            }
        });
    };

    return (
        <Modal backdrop="static" centered show={show} size="lg">
            <Modal.Body>
                <h1>PIN: {pinData.pin.toString()}</h1>
                {image ? (
                    <img src={image} height="65px" width="300px" alt="signature image" />
                ) : (
                    <h2>Waiting on client signature</h2>
                )}
            </Modal.Body>

            <Modal.Footer>
                {image ? (
                    <Button
                        onClick={() => {
                            setShow(false);
                            if (onClose) onClose(image);
                        }}
                    >
                        Close
                    </Button>
                ) : (
                    <Button onClick={() => handleCancelPinEntry()}>Cancel Pin Entry</Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default DigitalSignature;
