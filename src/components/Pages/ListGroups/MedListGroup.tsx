import {Button} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import React, {useEffect} from 'reactn';
import {MedicineRecord, newMedicineRecord} from "types/RecordTypes";
import {getLastTakenVariant, randomString} from "utility/common";
import {drawBarcode} from "utility/drawBarcode";
import LogButtons from "../../Buttons/LogButtons";
import ShadowBox from "../../Buttons/ShadowBox";
import TooltipButton from "../../Buttons/TooltipButton";
import MedDropdown from "./MedDropdown";

interface IProps {
    activeMed: MedicineRecord | null
    addDrugLog: (e: React.MouseEvent<HTMLElement>) => void
    editMedicine: (m: MedicineRecord) => void
    logDrug: (n: number) => void
    itemChanged: (i: number) => void
    canvasUpdated?: (c: HTMLCanvasElement) => void
    canvasId?: string
    disabled?: boolean
    medicineList: MedicineRecord[]
    lastTaken: number | null
}

export interface IMedDropdownItem {
    id: number, // zero indicated a divider
    description: string
}

/**
 * MedListGroup
 * @param {IProps} props
 * @return {JSX.Element}
 */
const MedListGroup = (props: IProps): JSX.Element => {
    const {
        activeMed = null,
        addDrugLog,
        editMedicine,
        logDrug,
        itemChanged,
        canvasUpdated,
        canvasId = randomString(),
        disabled = false,
        medicineList,
        lastTaken = null
    } = props;

    const barCode = activeMed?.Barcode && activeMed.Barcode.length > 0 ? activeMed.Barcode : null;
    const notes = activeMed?.Notes && activeMed.Notes.length > 0 ? activeMed.Notes : null;
    const directions = activeMed?.Directions || null;
    const fillDateText = activeMed?.FillDateMonth ?
        activeMed.FillDateMonth + '/' + activeMed.FillDateDay + '/' + activeMed.FillDateYear : null;
    const fillDateType = (fillDateText) ? new Date(fillDateText) : null;
    const fillDateOptions = {month: '2-digit', day: '2-digit', year: 'numeric'} as Intl.DateTimeFormatOptions;
    const fillDate = (fillDateType) ? fillDateType.toLocaleString('en-US', fillDateOptions) : null;
    const itemList = [] as IMedDropdownItem[];

    // todo: Add Pillboxes to itemList ???
    medicineList.forEach(m => itemList.push({id: m.Id as number, description: m.Drug}));

    // Update the barcode image if the barcode has changed
    useEffect(() => {
        // Only try to create a barcode canvas IF there is actually a barcode value.
        const canvas = barCode ? drawBarcode(barCode, canvasId) : null;
        if (canvasUpdated && canvas) {
            canvasUpdated(canvas);
        }
    }, [barCode, canvasUpdated, canvasId]);

    const lastTakenVariant = lastTaken && lastTaken >= 8 ? 'primary' : getLastTakenVariant(lastTaken);

    const shortenedDrugName = () => {
        const lenCutOff = activeMed?.OTC ? 10 : 35;
        const drug = activeMed?.Drug || '';
        if (drug.length > lenCutOff) {
            return drug.substr(0, lenCutOff) + '...';
        } else {
            return drug.substr(0, lenCutOff);
        }
    }

    return (
        <ListGroup>
            <ListGroup.Item>
                <TooltipButton
                    className="mr-1"
                    tooltip="Manually Add New Medicine"
                    size="sm"
                    variant="info"
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                        e.preventDefault();
                        const clientId = activeMed?.ResidentId;
                        if (clientId) {
                            editMedicine({
                                ...newMedicineRecord,
                                OTC: false,
                                ResidentId: clientId,
                                FillDateYear: "",
                                FillDateMonth: "",
                                FillDateDay: ""
                            });
                        }
                    }}
                >
                    + Medicine
                </TooltipButton>

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

            {activeMed && activeMed.Id &&
            <>
            <ListGroup.Item active className="justify-content-left">
                <MedDropdown
                    disabled={disabled}
                    itemList={itemList}
                    activeId={activeMed.Id}
                    onSelect={i => itemChanged(i)}
                />
            </ListGroup.Item>

                <ListGroup.Item>
                    <Button
                        size="sm"
                        disabled={disabled}
                        className="mr-2"
                        variant={lastTakenVariant}
                        onClick={(e: React.MouseEvent<HTMLElement>) => addDrugLog(e)}
                    >
                        + Log Drug
                    </Button>

                    <LogButtons
                        disabled={disabled}
                        lastTaken={lastTaken}
                        lastTakenVariant={lastTakenVariant}
                        onLogAmount={(n) => logDrug(n)}
                        drugName={shortenedDrugName()}
                    />
                </ListGroup.Item>

                {directions &&
                <ListGroup.Item>
                    <ShadowBox>
                        <b>Directions: </b>{activeMed.Directions}
                    </ShadowBox>
                </ListGroup.Item>
                }

                {notes &&
                <ListGroup.Item>
                    <ShadowBox>
                        <b>Notes: </b>{activeMed.Notes}
                    </ShadowBox>
                </ListGroup.Item>
                }

                {fillDate &&
                <ListGroup.Item>
                    <ShadowBox>
                        <b>Fill Date: </b>{fillDate}
                    </ShadowBox>
                </ListGroup.Item>
                }

                {barCode &&
                <ListGroup.Item>
                    <canvas id={canvasId}/>
                </ListGroup.Item>
                }
            </>
            }
        </ListGroup>
    );
}

export default MedListGroup;
