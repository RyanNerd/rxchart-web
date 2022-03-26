import CheckoutGrid from 'components/Pages/Grids/CheckoutGrid';
import DigitalSignature from 'components/Pages/Modals/DigitalSignature';
import {GenerateResponseData} from 'providers/PinProvider';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import React, {useGlobal, useState} from 'reactn';
import {TClient} from 'reactn/default';
import {DrugLogRecord, FileRecord, MedicineRecord} from 'types/RecordTypes';
import {clientFullName, getFormattedDate} from 'utility/common';
import decodeBase64ArrayBuffer from 'utility/decodeBase64ArrayBuffer';

interface IProps {
    checkoutList: DrugLogRecord[];
    medicineList: MedicineRecord[];
    onClose?: () => void;
}

const CheckoutListGroup = (props: IProps) => {
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [activeClient, setActiveClient] = useGlobal('activeClient');
    const {checkoutList, medicineList, onClose} = props;
    const clientRecord = activeClient?.clientInfo;
    const clientName = clientRecord ? clientFullName(clientRecord) : '';
    const now = new Date();
    const today = getFormattedDate(now);
    const [providers] = useGlobal('providers');
    const pinProvider = providers.pinProvider;
    const fileProvider = providers.fileProvider;
    const [pinData, setPinData] = useState<null | GenerateResponseData>(null);
    const [signIn] = useGlobal('signIn');
    const organization = signIn?.organization?.trim();

    /**
     * Handle when the user clicks the Digital Signature button
     */
    const handleDigitalSignature = () => {
        /**
         * Call the API to generate a new PIN for the given client.
         * @param {number} clientId The client PK
         */
        const generatePin = async (clientId: number) => {
            try {
                setPinData(await pinProvider.generate(clientId));
            } catch (requestError) {
                await setErrorDetails(requestError);
            }
        };
        generatePin(clientRecord?.Id as number);
    };

    /**
     * Handle uploading the signature page as a image/png
     * @param {string | null} signaturePage Base64 encoded image data produced from the canvas.toDataUrl() function
     * @link https://ourcodeworld.com/articles/read/322/how-to-convert-a-base64-image-into-a-image-file-and-upload-it-with-an-asynchronous-form-using-jquery
     * @link https://stackoverflow.com/a/57139182/4323201
     * @returns {Promise<void>}
     */
    const handleDigitalSignatureClose = async (signaturePage: string | null) => {
        if (signaturePage) {
            // We need to do some memory gymnastics to get this to upload as a file with the correct mimetype
            try {
                const pngString = signaturePage.split(',')[1]; // Get just the image string as a base64 string
                const pngArrayBuffer = decodeBase64ArrayBuffer(pngString); // Convert pngString into an ArrayBuffer
                const blob = new Blob([pngArrayBuffer], {type: 'image/png'}); // Create the blob to upload
                const formData = new FormData();
                formData.append('single_file', blob);
                const fileUploadRecord = await fileProvider.uploadFile(formData, clientRecord?.Id as number);
                const fileRecord = {
                    Id: fileUploadRecord.Id,
                    FileName: `${clientName}-med-checkout.png `,
                    Description: 'Medication checkout signature'
                } as FileRecord;
                await fileProvider.update(fileRecord);
                await setActiveClient({
                    ...(activeClient as TClient),
                    fileList: await fileProvider.load(clientRecord?.Id as number)
                });
                // TODO: Destroy the Pin record
            } catch (signaturePageError: unknown) {
                await setErrorDetails(signaturePageError);
            }
        }
    };

    if (!clientRecord?.Id) return null;

    return (
        <>
            <ListGroup>
                <ListGroup.Item>
                    <ButtonGroup>
                        <Button
                            className="mb-2 d-print-none"
                            onClick={() => {
                                window.print();

                                if (onClose) {
                                    // Kludge to block JS events until the print dialog goes away (only works in Chrome)
                                    // see: https://stackoverflow.com/a/24325151/4323201
                                    setTimeout(() => {
                                        onClose();
                                    }, 100);
                                }
                            }}
                            size="sm"
                        >
                            Print
                        </Button>

                        <Button className="mb-2 d-print-none ml-2" size="sm" onClick={() => handleDigitalSignature()}>
                            Digital Signature
                        </Button>

                        {onClose && (
                            <Button className="mb-2 d-print-none ml-2" size="sm" onClick={() => onClose()}>
                                Close
                            </Button>
                        )}
                    </ButtonGroup>

                    <p>
                        {clientName} as a resident of {organization}, I declare that I am leaving for the day and verify
                        that I have a prescription medication dose that needs to be administered during this time.
                        <br />
                        I take full responsibility for my medication while I am away from the Switchpoint facility and
                        attest that staff gave me my prescription medication for this purpose and this purpose alone.
                        <br />
                        I am fully aware that if I return to the property and do not immediately turn my prescription
                        medications back in to the front office, I can be detained and arrested by the police.
                        <br />
                        <br />
                        <span className="mt-3">Signature:____________________________________</span>
                        <span className="ml-3">Date: {today}</span>
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <CheckoutGrid drugLog={checkoutList} medicineList={medicineList} drugId={null} />
                </ListGroup.Item>
            </ListGroup>

            {pinData && (
                <DigitalSignature
                    onClose={(signaturePage) => handleDigitalSignatureClose(signaturePage)}
                    pinData={pinData}
                    pinProvider={pinProvider}
                />
            )}
        </>
    );
};

export default CheckoutListGroup;
