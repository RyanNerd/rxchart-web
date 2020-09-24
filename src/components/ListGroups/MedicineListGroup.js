import React, {useEffect, useState} from 'reactn';
import ListGroup from "react-bootstrap/ListGroup";
import DrugDropdown from "./DrugDropdown";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';
import {drawBarcode} from "../../utility/drawBarcode";

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
    const [warningColor, setWarningColor ] = useState('light');
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


    // Update the warning color based on the lastTaken hours value
    useEffect(() => {
        let calculatedWarningColor;
        switch (lastTaken) {
            case 0: calculatedWarningColor = 'danger';
                    break;
            case 1: calculatedWarningColor = 'danger';
                    break;
            case 2: calculatedWarningColor = 'danger';
                    break;
            case 3: calculatedWarningColor = 'outline-warning';
                    break;
            case 4: calculatedWarningColor = 'outline-warning';
                    break;
            case 5: calculatedWarningColor = 'outline-warning';
                    break;
            case 6: calculatedWarningColor = 'outline-info';
                    break;
            case 7: calculatedWarningColor = 'outline-info';
                    break;
            case 8: calculatedWarningColor = 'outline-info';
                    break;
            default: calculatedWarningColor = 'light';
        }
        setWarningColor(calculatedWarningColor);
    }, [lastTaken]);

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
                <Button
                    size="lg"
                    variant="primary"
                    onClick={(e) => addDrugLog(e)}
                >
                    + Log Drug
                </Button>

                <Button
                    disabled
                    size="lg"
                    className="ml-2"
                    variant={warningColor}
                >
                    {/* Display in BOLD if taken 3 or less hours ago */}
                    {lastTaken !== null && lastTaken <= 3 ? <b>Last Taken (hours): {lastTaken}</b> : <span>Last Taken (hours): {lastTaken}</span>}
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
