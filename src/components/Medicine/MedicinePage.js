import React, {useGlobal} from 'reactn';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import TabContent from "../../styles/tab_content.css";
import DrugDropdown from "./DrugDropdown";
import MedicineList from "../../providers/MedicineList";

/**
 * MedicinePage
 * This is where most of the logic and data entry will be done so the page is a little busy
 *  - Scan Barcode
 *  - Manually Add Medicine
 *  - Add Drug to Medicine Log
 *  - Edit / Delete Existing Medicine
 *  - Drug History Grid
 *
 * @returns {*}
 * @constructor
 */
function MedicinePage()
{
    const [ barcode, setBarcode ] = useGlobal('activeBarcode');
    const [ activeDrug, setActiveDrug ] = useGlobal('activeDrug');
    const [ medicineList, setMedicineList ] = useGlobal('medicineList');
    const [ activeResident, setActiveResident ] = useGlobal('activeResident');
    const [ providers ] = useGlobal('providers');

    /**
     * Fires on keyPress for the barcode text box
     *
     * @param e KeyboardEvent
     */
    function handleBarcodeKeyPress(e)
    {
        if (e.key === 'Enter') {
            e.preventDefault();

            // Query the Medicine table looking for a matching barcode.
            const medicineProvider = providers.medicineProvider;
            medicineProvider.query(barcode, 'Barcode')
            .then((response) => {
                // Did we find a matching barcode?
                if (response.success) {
                    // Sanity Check -- Should only be one
                    if (response.data.length === 1) {
                        setActiveDrug(null);
                        setBarcode(null);

                        const data = response.data[0];

                        // Did a different resident get selected?
                        if (!activeResident || data.Id !== activeResident.Id) {
                            refreshActiveResident(data.Id);
                        }

                        setActiveDrug(data);
                        console.log('activeDrug', data);
                    } else {
                        alert("Duplicate Barcode -- This shouldn't happen");
                    }
                } else {
                    if (response.status === 404) {
                        // TODO: Add code to bring up a Medicine Modal.
                        alert('New medicine');
                    } else {
                        // Something went wrong. TODO: Degrade gracefully.
                        alert('Problem querying medicine');
                        console.error("He's dead Jim", response);
                    }
                }
            })
        }
    }

    function refreshActiveResident(residentId)
    {
        providers.residentProvider.read(residentId)
        .then((residentInfo) => {
            setActiveResident(residentInfo)
            .then(() => console.log('refreshactiveResident', activeResident));
            MedicineList(providers.medicineProvider, residentId)
            .then((data) => setMedicineList(data));
        });
    }

    return (
        <>
            <Form className={TabContent}>
                <Form.Group as={Row} controlId="bar-code">
                    <Form.Label column sm="1">
                        Scan Barcode
                    </Form.Label>
                    <Col sm="3">
                        <Form.Control
                            type="text"
                            value={barcode}
                            onKeyPress={(e) => handleBarcodeKeyPress(e)}
                            onChange={(e) => setBarcode(e.target.value)}
                        />
                    </Col>
                    <Col sm={4}>
                        <OverlayTrigger
                            key="new-drug"
                            placement="right"
                            overlay={
                                <Tooltip id="add-new-drug-tooltip">
                                    Manually Add New Drug for Resident
                                </Tooltip>
                            }
                        >
                            <Button sm={2}>
                                Add New Medicine
                            </Button>
                        </OverlayTrigger>
                    </Col>
                </Form.Group>
            </Form>

            {activeResident && activeResident.Id && activeDrug &&
            <Row>
                <Col sm={4}>
                    <p>{activeDrug.Drug}</p>
                    <ListGroup>
                        <ListGroup.Item>
                            <DrugDropdown
                                medicineList={medicineList}
                                drugId={activeDrug.Id}
                                onSelect={(e, drug) => {
                                    setActiveDrug(drug);
                                    setBarcode(drug.Barcode);
                                }}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item><b>Directions</b></ListGroup.Item>
                        <ListGroup.Item><p>{activeDrug.Directions}</p></ListGroup.Item>
                        <ListGroup.Item><b>Notes</b></ListGroup.Item>
                        <ListGroup.Item><p>{activeDrug.Notes}</p></ListGroup.Item>
                        <ListGroup.Item variant="info" active>
                            <b>Barcode:</b> {activeDrug.Barcode}
                        </ListGroup.Item>
                    </ListGroup>

                </Col>
                <Col sm={6}>
                    <span style={{textAlign: "center"}}> <h1>MEDICAL LOG PLACE HOLDER</h1> </span>
                    <span style={{textAlign: "center"}}> <h2>subtext</h2> </span>
                </Col>
            </Row>
            }
        </>
    );
}

export default MedicinePage;