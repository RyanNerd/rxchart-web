import React, {useEffect, useState} from 'reactn';
import ListGroup from "react-bootstrap/ListGroup";
import DrugDropdown from "./DrugDropdown";
import Button from "react-bootstrap/Button";

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
export default function MedicineListGroup(props)
{
    const medicineList = props.medicineList;
    const activeDrug = props.activeDrug;
    const barcodeImageURI = 'https://bwipjs-api.metafloor.com/?bcid=code128&scale=1&text=';
    const [ barcodeImg, setBarcodeImg ] = useState(barcodeImageURI + activeDrug.Barcode);

    /**
     * Update the barcode image if the barcode has changed
     */
    useEffect(() => {
        setBarcodeImg(barcodeImageURI + props.activeDrug.Barcode);
    }, [props.activeDrug.Barcode]);

    // Return null if there is not any medicines for the activeResident or if there's not an activeDrug
    if (!medicineList || !activeDrug) {
      return null;
    }

    return (
        <ListGroup>
            <ListGroup.Item active>
                <DrugDropdown
                    medicineList={medicineList}
                    drugId={activeDrug.Id}
                    onSelect={(e, drug) => {
                        props.drugChanged(drug);
                    }}
                />
            </ListGroup.Item>

            {props.addDrugLog &&
                <ListGroup.Item>
                    <Button
                        className="mr-2"
                        size="md"
                        variant="primary"
                        onClick={(e) => props.addDrugLog(e)}
                    >
                        + Log Drug
                    </Button>
                </ListGroup.Item>
            }

            <ListGroup.Item>
                <b>Directions (Fill Date: {activeDrug.FillDateMonth}/{activeDrug.FillDateDay}/{activeDrug.FillDateYear})</b>
            </ListGroup.Item>

            <ListGroup.Item>
                <p>{activeDrug.Directions}</p>
            </ListGroup.Item>

            <ListGroup.Item>
                <b>Notes</b>
            </ListGroup.Item>

            <ListGroup.Item>
                <p>{activeDrug.Notes}</p>
            </ListGroup.Item>

            <ListGroup.Item variant="info">
                <b>Barcode:</b> {activeDrug.Barcode}
            </ListGroup.Item>

            <ListGroup.Item>
                <img
                    alt=""
                    key={barcodeImg}
                    style={{paddingTop: "2px"}}
                    src={barcodeImg}/>
            </ListGroup.Item>
        </ListGroup>
    );
}