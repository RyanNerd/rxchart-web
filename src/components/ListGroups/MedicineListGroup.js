import React, {useEffect, useState} from 'reactn';
import ListGroup from "react-bootstrap/ListGroup";
import DrugDropdown from "./DrugDropdown";
import Button from "react-bootstrap/Button";
import bwipjs from 'bwip-js';
import PropTypes from 'prop-types';

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
    let [warningColor, setWarningColor ] = useState('light');

    const medicineList = props.medicineList;
    const activeDrug = props.activeDrug;
    const lastTaken = props.lastTaken;
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
        try {
            // Only try to create a barcode canvas IF there is actually a barcode value.
            if (barCode) {
                // eslint-disable-next-line
                const canvas = bwipjs.toCanvas('barcodeCanvas', {
                    bcid: 'code128',     // Barcode type
                    text: barCode,       // Text to encode
                    scale: 1,            // 2x scaling factor
                    height: 5,           // Bar height, in millimeters
                    includetext: false,  // Don't show human-readable text
                    textxalign: 'center' // Always good to set this
                });
            }
        } catch (e) {
            console.log('barcode image render error', e);
        }
    }, [barCode]);

    // Return null if there is not any medicines for the activeResident or if there's not an activeDrug
    if (!medicineList || !activeDrug) {
      return null;
    }

    return (
        <ListGroup>
            <ListGroup.Item active>
                <DrugDropdown
                    medicineList={medicineList}
                    drugId={drugId}
                    onSelect={(e, drug) => {
                        props.drugChanged(drug);
                    }}
                />
            </ListGroup.Item>

            <ListGroup.Item>
                <Button
                    size="sm"
                    variant="primary"
                    onClick={(e) => props.addDrugLog(e)}
                >
                    + Log Drug
                </Button>

                <Button
                    disabled
                    size="sm"
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
                        Directions {fillDate && <span>(Fill Date: {fillDate})</span>}
                    </b>
                    <span> {activeDrug.Directions}</span>
                </ListGroup.Item>
            }

            {notes && notes.length > 0 &&
                <ListGroup.Item>
                    <p><b>Notes: </b>{activeDrug.Notes}</p>
                </ListGroup.Item>
            }

            {barCode &&
                <ListGroup.Item variant="info">
                        <b>Barcode:</b> <span>{barCode} </span>
                        <canvas id="barcodeCanvas"/>
                </ListGroup.Item>
            }
        </ListGroup>
    );
}

MedicineListGroup.propTypes = {
    medicineList: PropTypes.arrayOf(PropTypes.object),
    activeDrug: PropTypes.object,
    lastTaken: PropTypes.number,
    drugChanged: PropTypes.func,
    addDrugLog: PropTypes.func
}

export default MedicineListGroup;
