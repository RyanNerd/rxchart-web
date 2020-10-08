import React, {useEffect} from 'reactn';
import ListGroup from "react-bootstrap/ListGroup";
import DrugDropdown from "./DrugDropdown";
import TooltipButton from "../Buttons/TooltipButton";
import {drawBarcode} from "../../utility/drawBarcode";
import Button from "react-bootstrap/Button";
import {MedicineRecord} from "../../types/RecordTypes";
import {getLastTakenVariant} from "../../utility/common";

interface IProps {
    medicineList: Array<MedicineRecord>
    activeDrug: MedicineRecord,
    lastTaken: number | null,
    drugChanged: Function,
    addDrugLog: Function,
    canvasId: string,
    canvasUpdated?: Function,
    logDrug: Function
}

/**
 * MedicineListGroup
 *
 * @param {IProps} props
 * @return {JSX.Element}
 */
const MedicineListGroup = (props: IProps): JSX.Element => {
    const {
        medicineList,
        activeDrug,
        lastTaken,
        drugChanged,
        addDrugLog,
        canvasId,
        canvasUpdated,
        logDrug
    } = props;

    const barCode = activeDrug.Barcode || null;
    const notes = activeDrug.Notes || null;
    const directions = activeDrug.Directions || null;
    const drugId = activeDrug.Id || null;
    const fillDateText = activeDrug.FillDateMonth ?
                activeDrug.FillDateMonth + '/' + activeDrug.FillDateDay +'/' + activeDrug.FillDateYear : null;
    const fillDateType = (fillDateText) ? new Date(fillDateText) : null;
    const fillDateOptions = {month: '2-digit', day: '2-digit', year: 'numeric'};
    const fillDate = (fillDateType) ? fillDateType.toLocaleString('en-US', fillDateOptions) : null;

    // Update the barcode image if the barcode has changed
    useEffect(() => {
        // Only try to create a barcode canvas IF there is actually a barcode value.
        const canvas = barCode ? drawBarcode(barCode, canvasId) : null;
        if (canvasUpdated) {
            canvasUpdated(canvas);
        }
    }, [barCode, canvasId, canvasUpdated]);

    /**
     * Determine the tooltip text given the number of hours the drug was last taken
     *
     * @param {number | null} lastTaken
     * @returns {string | null}
     */
    const tooltipText = (lastTaken: number | null): string | null => {
        if (lastTaken === null || !lastTaken) return null;
        if (lastTaken <= 1) {
            return activeDrug.Drug + " taken in the last hour";
        }
        if (lastTaken <=4) {
            return activeDrug.Drug + " recently taken";
        }
        return null;
    }

    const lastTakenVariant = lastTaken && lastTaken >= 8 ? 'primary' : getLastTakenVariant(lastTaken);

    return (
        <ListGroup>
            <ListGroup.Item active>
                <DrugDropdown
                    medicineList={medicineList}
                    drugId={drugId}
                    onSelect={(e: MouseEvent, drug:MedicineRecord) => drugChanged(drug)}
                />
            </ListGroup.Item>

            <ListGroup.Item>
                <TooltipButton
                    tooltip={tooltipText(lastTaken)}
                    placement="top"
                    className="mr-2"
                    variant={lastTakenVariant}
                    onClick={(e: MouseEvent) => addDrugLog(e)}
                >
                    + Log Drug
                </TooltipButton>

                <Button
                    style={lastTaken === 0 ? {cursor: "default"} : {}}
                    disabled={lastTaken === 0}
                    variant={"outline-" + lastTakenVariant}
                    className="mr-2"
                    onClick={(e) => {
                        e.preventDefault();
                        logDrug(1);
                    }}
                >
                    Log 1 {activeDrug.Drug.substr(0, activeDrug.OTC ? 30 : 50)}
                </Button>

                <Button
                    style={lastTaken === 0 ? {cursor: "default"} : {}}
                    disabled={lastTaken === 0}
                    variant={"outline-" + lastTakenVariant}
                    onClick={(e) => {
                        e.preventDefault();
                        logDrug(2);
                    }}
                >
                    Log 2
                </Button>
            </ListGroup.Item>

            {directions && directions.length > 0 &&
                <ListGroup.Item>
                    <b>
                        Directions:
                    </b>
                    <span> {activeDrug.Directions}</span>
                </ListGroup.Item>
            }

            {notes && notes.length > 0 &&
                <ListGroup.Item>
                    <p><b>Notes: </b>{activeDrug.Notes}</p>
                </ListGroup.Item>
            }

            {fillDate &&
                <ListGroup.Item>
                    <b>
                        Fill Date:
                    </b>
                    <span> {fillDate}</span>
                </ListGroup.Item>
            }

            {barCode &&
                <ListGroup.Item variant="info">
                        <canvas id={canvasId}/>
                </ListGroup.Item>
            }
        </ListGroup>
    );
}

export default MedicineListGroup;
