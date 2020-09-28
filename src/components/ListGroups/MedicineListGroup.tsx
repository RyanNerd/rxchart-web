import React, {useEffect} from 'reactn';
import ListGroup from "react-bootstrap/ListGroup";
import DrugDropdown from "./DrugDropdown";
import TooltipButton from "../Buttons/TooltipButton";
import {drawBarcode} from "../../utility/drawBarcode";
import Button from "react-bootstrap/Button";
import logButtonColor from "../../utility/logButtonColor";
import {MedicineRecord} from "../../types/RecordTypes";

interface IProps {
    medicineList: Array<MedicineRecord>
    activeDrug: MedicineRecord,
    lastTaken: number | null,
    drugChanged: Function,
    addDrugLog: Function,
    canvasId: string,
    canvasUpdated: Function,
    logDrug: Function
}

/**
 * MedicineListGroup
 * @param {object} props
 *  props:
 *      {array<object>} medicineList Available list of meds for the activeResident
 *      {object} activeDrug Currently active drug object.
 *      {function} drugChanged(drug) Callback when the drug changes from the dropdown button
 *      {function} addDrugLog(e) Callback when the + Log Drug button is clicked
 *
 * @return {* || null}
 */
const MedicineListGroup = (props: IProps) => {
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
    const fillDate = activeDrug.FillDateMonth ?
                activeDrug.FillDateMonth + '/' + activeDrug.FillDateDay +'/' + activeDrug.FillDateYear : null;

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
     * @param {number | null | boolean} lastTaken
     * @returns {string|null}
     */
    const tooltipText = (lastTaken: number | null) => {
        if (lastTaken === null) return null;
        if (lastTaken <= 1) {
            return activeDrug.Drug + " taken in the last hour";
        }
        if (lastTaken <=4) {
            return activeDrug.Drug + " recently taken";
        }
        return null;
    }

    if (DrugDropdown === null) {
        return null;
    }

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
                    variant={logButtonColor(lastTaken)}
                    onClick={(e: MouseEvent) => addDrugLog(e)}
                >
                    + Log Drug
                </TooltipButton>

                <Button
                    disabled={lastTaken === 0}
                    variant={"outline-" + logButtonColor(lastTaken)}
                    onClick={(e) => {
                        e.preventDefault();
                        logDrug(1);
                    }}
                >
                    Log 1 {activeDrug.Drug}
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
                    <span>Fill Date: {fillDate}</span>
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
