import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import React, {useEffect} from 'reactn';
import {DrugLogRecord, MedicineRecord, newMedicineRecord} from 'types/RecordTypes';
import {getLastTakenVariant, randomString} from 'utility/common';
import {drawBarcode} from 'utility/drawBarcode';
import LogButtons from '../Buttons/LogButtons';
import ShadowBox from '../Buttons/ShadowBox';
import {IDropdownItem} from '../ListGroups/MedDropdown';
import MedDropdown from './MedDropdown';

interface IProps {
    activeMed: MedicineRecord | null;
    addDrugLog: () => void;
    canvasId?: string;
    canvasUpdated?: (c: HTMLCanvasElement) => void;
    clientId: number;
    disabled?: boolean;
    editMedicine: (m: MedicineRecord) => void;
    itemChanged: (itemNumber: number) => void;
    itemList: IDropdownItem[];
    lastTaken: number | null;
    logDrug: (n: number) => void;
    onCheckout: () => void;
    checkoutList: DrugLogRecord[];
}

/**
 * MedListGroup
 * @param {IProps} props The props for the component
 */
const MedListGroup = (props: IProps): JSX.Element => {
    const {
        activeMed = null,
        addDrugLog,
        canvasId = randomString(),
        canvasUpdated,
        clientId,
        disabled = false,
        editMedicine,
        itemChanged,
        itemList,
        lastTaken = null,
        logDrug,
        onCheckout,
        checkoutList
    } = props;
    const barCode = activeMed?.Barcode && activeMed.Barcode.length > 0 ? activeMed.Barcode : null;
    const notes = activeMed?.Notes && activeMed.Notes.length > 0 ? activeMed.Notes : null;
    const directions = activeMed?.Directions || null;
    const fillDateText = activeMed?.FillDateMonth
        ? activeMed.FillDateMonth + '/' + activeMed.FillDateDay + '/' + activeMed.FillDateYear
        : null;
    const fillDateType = fillDateText ? new Date(fillDateText) : null;
    const fillDateOptions = {month: '2-digit', day: '2-digit', year: 'numeric'} as Intl.DateTimeFormatOptions;
    const fillDate = fillDateType ? fillDateType.toLocaleString('en-US', fillDateOptions) : null;
    const lastTakenVariant = lastTaken && lastTaken >= 8 ? 'primary' : getLastTakenVariant(lastTaken);
    const listboxItemStyle = {
        paddingTop: '0.25rem',
        paddingRight: '1.25rem',
        paddingBottom: '0.20rem',
        paddingLeft: '1.25rem'
    };

    // Update the barcode image if the barcode has changed
    useEffect(() => {
        // Only try to create a barcode canvas IF there is actually a barcode value.
        const canvas = barCode ? drawBarcode(barCode, canvasId) : null;
        if (canvasUpdated && canvas) canvasUpdated(canvas);
    }, [barCode, canvasUpdated, canvasId]);

    return (
        <ListGroup>
            <ListGroup.Item>
                <Button
                    className="mr-1"
                    size="sm"
                    variant="info"
                    onClick={() => {
                        editMedicine({
                            ...newMedicineRecord,
                            OTC: false,
                            ResidentId: clientId,
                            FillDateYear: '',
                            FillDateMonth: '',
                            FillDateDay: ''
                        });
                    }}
                >
                    + Medicine
                </Button>

                <Button
                    disabled={!activeMed}
                    size="sm"
                    variant="info"
                    onClick={() => {
                        if (activeMed) editMedicine(activeMed);
                    }}
                >
                    Edit <b>{activeMed?.Drug}</b>
                </Button>

                {!checkoutList?.find((medCheckedOut) => medCheckedOut.MedicineId === activeMed?.Id) && (
                    <Button className="ml-3" size="sm" variant="outline-success" onClick={() => onCheckout()}>
                        Checkout {activeMed?.Drug}
                    </Button>
                )}
            </ListGroup.Item>

            {activeMed && activeMed.Id && (
                <>
                    <ListGroup.Item active className="justify-content-left">
                        <MedDropdown
                            activeId={activeMed.Id}
                            disabled={disabled}
                            itemList={itemList}
                            onSelect={(itemNumber) => itemChanged(itemNumber)}
                        />
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Button
                            className="mr-2"
                            disabled={disabled}
                            size="sm"
                            variant={lastTakenVariant}
                            onClick={() => addDrugLog()}
                        >
                            + Log {activeMed?.Drug}
                        </Button>

                        <LogButtons
                            disabled={disabled}
                            lastTaken={lastTaken}
                            lastTakenVariant={lastTakenVariant}
                            onLogAmount={(n) => logDrug(n)}
                        />
                    </ListGroup.Item>

                    {activeMed.OtherNames && (
                        <ListGroup.Item style={listboxItemStyle}>
                            <b>Other Names: </b>
                            {activeMed.OtherNames}
                        </ListGroup.Item>
                    )}

                    {directions && (
                        <ListGroup.Item style={listboxItemStyle}>
                            <ShadowBox>
                                <b>Directions: </b>
                                {activeMed.Directions}
                            </ShadowBox>
                        </ListGroup.Item>
                    )}

                    {notes && (
                        <ListGroup.Item style={listboxItemStyle}>
                            <ShadowBox>
                                <b>Notes: </b>
                                {activeMed.Notes}
                            </ShadowBox>
                        </ListGroup.Item>
                    )}

                    {fillDate && (
                        <ListGroup.Item style={listboxItemStyle}>
                            <ShadowBox>
                                <b>Fill Date: </b>
                                {fillDate}
                            </ShadowBox>
                        </ListGroup.Item>
                    )}

                    {barCode && (
                        <ListGroup.Item>
                            <canvas id={canvasId} />
                        </ListGroup.Item>
                    )}
                </>
            )}
        </ListGroup>
    );
};

export default MedListGroup;
