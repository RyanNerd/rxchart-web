import React, {useEffect} from 'reactn';
import ListGroup from "react-bootstrap/ListGroup";
import DrugDropdown from "./DrugDropdown";
import TooltipButton from "../Buttons/TooltipButton";
import PropTypes from 'prop-types';
import {drawBarcode} from "../../utility/drawBarcode";
import LastTakenButton from "../Buttons/LastTakenButton";

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
const MedicineListGroup = (props) => {
    const medicineList = props.medicineList;
    const activeDrug = props.activeDrug;
    const lastTaken = props.lastTaken;
    const drugChanged = props.drugChanged;
    const addDrugLog = props.addDrugLog;
    const canvasId = props.canvasId;
    const canvasUpdated = props.canvasUpdated || null;
    const barCode = activeDrug.Barcode || null;
    const notes = activeDrug.Notes || null;
    const directions = activeDrug.Directions || null;
    const drugId = activeDrug.Id;
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

    return (
        <ListGroup>
            <ListGroup.Item active>
                <DrugDropdown
                    medicineList={medicineList}
                    drugId={drugId}
                    onSelect={(e, drug) => drugChanged(drug)}
                />
            </ListGroup.Item>

            <ListGroup.Item>
                <TooltipButton
                    tooltip={lastTaken <= 1 && lastTaken !== null ? activeDrug.Drug + " taken in the last hour" : null}
                    placement="top"
                    className="mr-2"
                    size="lg"
                    variant={lastTaken === 0 ? "warning" : "primary"}
                    onClick={(e) => addDrugLog(e)}
                >
                    + Log Drug
                </TooltipButton>

                <LastTakenButton
                    size="lg"
                    lastTaken={lastTaken}
                />

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

MedicineListGroup.propTypes = {
    medicineList: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeDrug: PropTypes.object.isRequired,
    lastTaken: PropTypes.number,
    drugChanged: PropTypes.func.isRequired,
    addDrugLog: PropTypes.func.isRequired,
    canvasId: PropTypes.string.isRequired,
    canvasUpdated: PropTypes.func
}

export default MedicineListGroup;
