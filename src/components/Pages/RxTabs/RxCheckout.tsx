import DigitalSignature from 'components/Pages/Modals/DigitalSignature';
import SignatureToast from 'components/Pages/Toasts/SignatureToast';
import {GenerateResponseData, PinReadResponseData} from 'providers/PinProvider';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table';
import React, {useGlobal, useState} from 'reactn';
import {TClient} from 'reactn/default';
import {DrugLogRecord, FileRecord, MedicineRecord} from 'types/RecordTypes';
import {
    calculateLastTaken,
    clientFullName,
    getBsColor,
    getCheckoutList,
    getFormattedDate,
    getLastTakenVariant
} from 'utility/common';
import decodeBase64ArrayBuffer from 'utility/decodeBase64ArrayBuffer';

/**
 * RxCheckout Tab -- Displays the Medication Checkout grid and signature printout
 */
const RxCheckout = () => {
    const [activeClient, setActiveClient] = useGlobal('activeClient');
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [providers] = useGlobal('providers');
    const pinProvider = providers.pinProvider;
    const fileProvider = providers.fileProvider;
    const [pinData, setPinData] = useState<null | GenerateResponseData>(null);
    const medicineList = activeClient !== null ? activeClient.medicineList : ([] as MedicineRecord[]);
    const clientRecord = activeClient?.clientInfo;
    const clientName = clientRecord ? clientFullName(clientRecord) : '';
    const [toast, setToast] = useState<FileRecord | null>(null);

    if (activeClient === null) return null;
    const checkoutList = getCheckoutList(activeClient.drugLogList);

    const handleDigitalSignature = () => {
        /**
         * Call the API to generate a new PIN for the given client.
         * @param {number} clientId The client PK
         */
        const generatePin = async (clientId: number) => {
            try {
                setPinData(await pinProvider.generate(clientId));
            } catch (requestError) {
                // eslint-disable-next-line no-console
                console.log('request Error', requestError);
                // await setErrorDetails(requestError);
            }
        };
        generatePin(activeClient.clientInfo?.Id as number);
    };

    /**
     * Handle uploading the signature page as an image/png
     * @param {PinReadResponseData | null} pinData The pinData from the DigitalSignature modal or null if cancel
     * @link https://ourcodeworld.com/articles/read/322/how-to-convert-a-base64-image-into-a-image-file-and-upload-it-with-an-asynchronous-form-using-jquery
     * @link https://stackoverflow.com/a/57139182/4323201
     * @returns {Promise<void>}
     */
    const handleDigitalSignatureClose = async (pinData: PinReadResponseData | null) => {
        if (pinData) {
            try {
                // We need to do some memory gymnastics to get this to upload as a file with the correct mimetype
                const pngString = pinData.Image.split(',')[1]; // Get just the image string as a base64 string
                const pngArrayBuffer = decodeBase64ArrayBuffer(pngString); // Convert pngString into an ArrayBuffer
                const blob = new Blob([pngArrayBuffer], {type: 'image/png'}); // Create the blob to upload

                // Perform the upload
                const formData = new FormData();
                formData.append('single_file', blob);
                const fileUploadRecord = await fileProvider.uploadFile(formData, clientRecord?.Id as number);

                // Once the file is uploaded we update some details on the record
                const fileRecord = {
                    Id: fileUploadRecord.Id,
                    FileName: `${clientName}-med-checkout.png`,
                    Description: 'Medication checkout signature'
                } as FileRecord;
                setToast(await fileProvider.update(fileRecord));

                // Rehydrate the activeClient fileList
                await setActiveClient({
                    ...(activeClient as TClient),
                    fileList: await fileProvider.load(clientRecord?.Id as number)
                });

                // Now that everything is in the File table we permanently destroy the Pin record
                await pinProvider.delete(pinData.Id, true);
            } catch (signaturePageError: unknown) {
                await setErrorDetails(signaturePageError);
            }
        }
    };

    const DrugRow = (medRecord: MedicineRecord): JSX.Element | null => {
        // No drug given then no render
        if (medRecord === null || !medRecord.Id) return null;

        // Figure out medicine field values
        const checkoutLogItem = checkoutList.find((checkoutItem) => checkoutItem.MedicineId === medRecord.Id);
        const updatedDate = checkoutLogItem?.Updated ? new Date(checkoutLogItem.Updated) : '';
        const fontWeight = checkoutLogItem ? 'bold' : undefined;
        const lastTaken = checkoutLogItem ? calculateLastTaken(medRecord.Id, [checkoutLogItem]) : null;
        const variant = getLastTakenVariant(lastTaken);
        const variantColor = getBsColor(variant);

        const handleEdit = (medRecord: MedicineRecord, checkoutLogItem: DrugLogRecord | undefined) => {
            alert(
                'todo: handle edit. Med: ' + JSON.stringify(medRecord) + ' Checkout: ' + JSON.stringify(checkoutLogItem)
            );
        };

        return (
            <tr
                key={medRecord.Id}
                id={`checkout-grid-row-${medRecord.Id}`}
                style={{color: variantColor, textDecoration: medRecord.Active ? undefined : 'line-through'}}
            >
                <td className="d-print-none" style={{textAlign: 'center', verticalAlign: 'middle'}}>
                    <Button
                        size="sm"
                        id={`checkout-grid-row-edit-btn-${medRecord.Id}`}
                        onClick={() => handleEdit(medRecord, checkoutLogItem)}
                    >
                        {checkoutLogItem ? 'Edit' : 'Checkout'}
                    </Button>
                </td>

                <td style={{verticalAlign: 'middle', fontWeight}}>
                    <span>{medRecord.Drug}</span> <span>{medRecord.Strength}</span>
                </td>

                <td
                    style={{
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        fontWeight
                    }}
                >
                    {updatedDate ? getFormattedDate(updatedDate) : ''}
                </td>

                <td
                    style={{
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        fontWeight
                    }}
                >
                    {checkoutLogItem?.PillboxItemId && <span>{'💊 '}</span>} <b>{checkoutLogItem?.Notes}</b>
                </td>

                <td
                    style={{
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        fontWeight
                    }}
                >
                    <b>{checkoutLogItem?.Out}</b>
                </td>
            </tr>
        );
    };

    return (
        <>
            <ButtonGroup>
                <Button
                    disabled={checkoutList.length === 0}
                    className="d-print-none"
                    onClick={() => window.print()}
                    size="sm"
                >
                    Print
                </Button>

                <Button
                    disabled={checkoutList.length === 0}
                    className="d-print-none ml-2"
                    size="sm"
                    onClick={() => handleDigitalSignature()}
                >
                    Digital Signature
                </Button>

                <Button
                    variant="outline-success"
                    className="d-print-none ml-3"
                    size="sm"
                    onClick={() => alert('todo: handle checkout all')}
                >
                    Checkout ALL
                </Button>
            </ButtonGroup>

            <Table style={{wordWrap: 'break-word'}} className="w-auto mt-2" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th></th>
                        <th>Drug</th>
                        <th style={{textAlign: 'center', verticalAlign: 'middle'}}>
                            <span>Date/Time Stamp</span>
                        </th>
                        <th style={{textAlign: 'center', verticalAlign: 'middle'}}>
                            <span>Amount/Notes</span>
                        </th>
                        <th style={{textAlign: 'center', verticalAlign: 'middle'}}>
                            <span>Out</span>
                        </th>
                    </tr>
                </thead>
                <tbody>{medicineList.map((medicineRecord) => DrugRow(medicineRecord))}</tbody>
            </Table>

            {pinData && (
                <DigitalSignature
                    onClose={(pinData) => handleDigitalSignatureClose(pinData)}
                    pinData={pinData}
                    pinProvider={pinProvider}
                />
            )}

            {toast !== null && <SignatureToast onClose={() => setToast(null)} show={true} toast={toast} />}
        </>
    );
};

export default RxCheckout;
