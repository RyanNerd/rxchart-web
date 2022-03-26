import {GenerateResponseData, IPinProvider, PinReadResponseData} from 'providers/PinProvider';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useState} from 'reactn';
import useInterval from 'hooks/useInterval';

interface IProps {
    onClose: (pinData: PinReadResponseData | null) => void;
    pinData: GenerateResponseData;
    pinProvider: IPinProvider;
}

const DigitalSignature = (props: IProps) => {
    const pinProvider = props.pinProvider;
    const onClose = props.onClose;

    const [pinData, setPinData] = useState(props.pinData);
    const [interval, setInterval] = useState<null | number>(5000);
    useEffect(() => {
        setPinData(props.pinData);
    }, [props.pinData]);

    const [show, setShow] = useState(pinData !== null);
    useEffect(() => {
        setShow(pinData !== null);
    }, [pinData]);

    /**
     * Keep polling the API until we get a signature from the client.
     */
    useInterval(() => {
        /**
         * Call the API to get a Pin record given the pinId PK
         * @param {number} pinId The pin Id
         */
        const pollPinSignatureImageUpdate = async (pinId: number) => {
            const pinReadData = await pinProvider.read(pinId);
            if (pinReadData.Image !== null) {
                setShow(false);
                onClose(pinReadData);
                setInterval(null);
            }
        };
        pollPinSignatureImageUpdate(pinData.pin_id);
    }, interval);

    /**
     * Handle when user clicks Cancel PIN entry by closing the modal and deleting the PIN record
     */
    const handleCancelPinEntry = () => {
        /**
         * Delete the Pin record given the PK pinId
         * @param {number} pinId The Pin table PK
         */
        const deletePinRecord = async (pinId: number) => {
            const isDeleted = await pinProvider.delete(pinId);
            if (isDeleted) {
                onClose(null);
                setInterval(null);
            } else {
                throw new Error('Unable to delete PIN record');
            }
        };

        setShow(false);
        deletePinRecord(pinData.pin_id);
    };

    return (
        <Modal backdrop="static" centered show={show} size="lg">
            <Modal.Body>
                <h1>PIN: {pinData.pin.toString()}</h1>
                <h2>
                    Direct the client to <span style={{color: 'blue'}}>{window.location.href + 'pin'}</span>
                </h2>
                <br />
                <h2>Waiting on client signature</h2>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => handleCancelPinEntry()}>Cancel Pin Entry</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DigitalSignature;
