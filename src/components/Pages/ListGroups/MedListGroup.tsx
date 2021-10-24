import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import React, {useEffect} from 'reactn';
import {MedicineRecord, newMedicineRecord} from 'types/RecordTypes';
import {getLastTakenVariant, randomString} from 'utility/common';
import {drawBarcode} from 'utility/drawBarcode';
import LogButtons from '../Buttons/LogButtons';
import ShadowBox from '../Buttons/ShadowBox';
import MedDropdown from './MedDropdown';
import {IDropdownItem} from '../ListGroups/MedDropdown';

interface IProps {
    activeMed: MedicineRecord | null;
    addDrugLog: () => void;
    clientId: number;
    editMedicine: (m: MedicineRecord) => void;
    logDrug: (n: number) => void;
    itemChanged: (i: number) => void;
    itemList: IDropdownItem[];
    canvasUpdated?: (c: HTMLCanvasElement) => void;
    canvasId?: string;
    disabled?: boolean;
    lastTaken: number | null;
}

/**
 * MedListGroup
 * @param {IProps} props The props for the component
 * @returns {JSX.Element}
 */
const MedListGroup = (props: IProps): JSX.Element => {
    const {
        activeMed = null,
        addDrugLog,
        clientId,
        editMedicine,
        logDrug,
        itemChanged,
        itemList,
        canvasUpdated,
        canvasId = randomString(),
        disabled = false,
        lastTaken = null
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

    // Update the barcode image if the barcode has changed
    useEffect(() => {
        // Only try to create a barcode canvas IF there is actually a barcode value.
        const canvas = barCode ? drawBarcode(barCode, canvasId) : null;
        if (canvasUpdated && canvas) {
            canvasUpdated(canvas);
        }
    }, [barCode, canvasUpdated, canvasId]);

    const lastTakenVariant = lastTaken && lastTaken >= 8 ? 'primary' : getLastTakenVariant(lastTaken);

    const listboxItemStyle = {
        paddingTop: '0.25rem',
        paddingRight: '1.25rem',
        paddingBottom: '0.20rem',
        paddingLeft: '1.25rem'
    };

    return (
        <ListGroup>
            <ListGroup.Item>
                <Button
                    className="mr-1"
                    size="sm"
                    variant="info"
                    onClick={(e) => {
                        e.preventDefault();
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
                    onClick={(e) => {
                        e.preventDefault();
                        if (activeMed) {
                            editMedicine(activeMed);
                        }
                    }}
                >
                    Edit <b>{activeMed?.Drug}</b>
                </Button>
            </ListGroup.Item>

            {activeMed && activeMed.Id && (
                <>
                    <ListGroup.Item active className="justify-content-left">
                        <MedDropdown
                            disabled={disabled}
                            itemList={itemList}
                            activeId={activeMed.Id}
                            onSelect={(i) => itemChanged(i)}
                        />
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Button
                            size="sm"
                            disabled={disabled}
                            className="mr-2"
                            variant={lastTakenVariant}
                            onClick={(e) => {
                                e.preventDefault();
                                addDrugLog();
                            }}
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
