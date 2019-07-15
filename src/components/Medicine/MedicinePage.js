import React, {useGlobal, useState} from 'reactn';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import TabContent from "../../styles/tab_content.css";
import DrugDropdown from "./DrugDropdown";
import RefreshMedicineList from "../../providers/RefreshMedicineList";
import {FULLNAME} from "../../utility/common";
import MedicineEdit from "../Medicine/MedicineEdit";

/**
 * MedicinePage
 * This is where most of the logic and data entry will be done so the page is a little busy
 * Features of this page are:
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
    const [ barcode, setBarcode ] = useState('');
    const [ showMedicineEdit, setShowMedicineEdit ] = useState(false);
    const [ drugInfo, setDrugInfo ] = useState(null);

    const [ activeDrug, setActiveDrug ] = useGlobal('activeDrug');
    const [ medicineList, setMedicineList ] = useGlobal('medicineList');
    const [ activeResident, setActiveResident ] = useGlobal('activeResident');
    const [ providers ] = useGlobal('providers');
    const [ development ] = useGlobal('development');
    const [ showResidentChangeAlert, setShowResidentChangeAlert ] = useState(false);

    const fullName = activeResident ? FULLNAME(activeResident) : '';

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

                        setBarcode('');

                        const drug = response.data[0];
                        setActiveDrug(drug);
                        refreshActiveResident(drug.ResidentId);
                    } else {
                        alert("Duplicate Barcode -- This shouldn't happen");
                    }
                } else {
                    if (response.status === 404) {
                        if (activeResident && activeResident.Id) {
                            // TODO: Dialog box: Barcode not found. Do you want to add a new drug for {resident}?
                            addEditDrug(true);
                        } else {
                            // TODO: Dialog box: Barcode not found. If you want to add a new drug you must first select the resident the drug is for.
                            alert('Unknown barcode. You must select the resident this drug is for before adding it.');
                        }
                    } else {
                        // TODO: Degrade gracefully.
                        alert('Problem querying medicine');
                        console.error("He's dead Jim", response);
                    }
                }
            })
        }
    }

    /**
     *
     * @param residentId
     * Set the active resident to what is given by the residentId and rehydrate the medicineList.
     *
     */
    function refreshActiveResident(residentId)
    {
        providers.residentProvider.read(residentId)
        .then((residentInfo) =>
        {
            setActiveResident(residentInfo)
            .then(() => console.log('refreshactiveResident', activeResident));
            RefreshMedicineList(providers.medicineProvider, residentId)
            .then((data) => setMedicineList(data))
            .catch((err) => {
                if (development) {
                    console.log('MedicineList rehydrate error', err);
                }
                alert('something went wrong');
            });
        })
        .catch((err) => {
            if (development) {
                console.log('residentProvider.read error', err);
            }
            alert('something went wrong');
        });
    }

    function addEditDrug(isAdd)
    {
        // There are multiple entry states:
        // 1. Barcode gave not found error AND there is an activeResident (add)
        // 2. User clicked the Add New Medicine button AND there is an activeResident (add)
        // 3. User clicked Edit Drug Info button [activeResident && activeDrug.Id] (edit)

        if (isAdd) {
            setDrugInfo({Id: 0, Barcode: barcode});
        } else {
            setDrugInfo({...activeDrug});
        }

        setShowMedicineEdit(true);
    }

    return (
        <>
            {showResidentChangeAlert &&
                <Toast
                    show={showResidentChangeAlert}
                    onClose={() => setShowResidentChangeAlert(!showResidentChangeAlert)}
                    varient="warning"
                >
                    <Toast.Header>
                        <strong>Resident Change</strong>
                    </Toast.Header>
                    <Toast.Body>
                        Barcode changed active resident
                    </Toast.Body>
                </Toast>
            }

            <Form className={TabContent}>
                <Form.Group as={Row} controlId="bar-code">
                    <Form.Label column sm="1">
                        Scan Barcode
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control
                            type="text"
                            value={barcode}
                            onKeyPress={(e) => handleBarcodeKeyPress(e)}
                            onChange={(e) => setBarcode(e.target.value)}
                        />
                    </Col>
                    <Col sm="2">
                        {activeResident && activeResident.Id &&
                            <OverlayTrigger
                                key="new-drug"
                                placement="right"
                                overlay={
                                    <Tooltip id="add-new-drug-tooltip">
                                        Manually Add New Drug for Resident
                                    </Tooltip>
                                }
                            >
                                <Button
                                    sm={2}
                                    onClick={() => addEditDrug(true)}
                                >
                                    + Drug
                                </Button>
                            </OverlayTrigger>
                        }
                    </Col>
                </Form.Group>
            </Form>

            {activeResident && activeResident.Id && activeDrug &&
            <Row>
                <Col sm={4}>
                    <ListGroup>
                        <ListGroup.Item active>
                            <b>{fullName} ({activeDrug.Drug})</b>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <DrugDropdown
                                medicineList={medicineList}
                                drugId={activeDrug.Id}
                                onSelect={(e, drug) => {
                                    setActiveDrug(drug);
                                }}
                                onLogDrug={(e) => alert('Add drug to log')}
                                onEditDrug={() => addEditDrug(false)}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item><b>Directions</b></ListGroup.Item>
                        <ListGroup.Item><p>{activeDrug.Directions}</p></ListGroup.Item>
                        <ListGroup.Item><b>Notes</b></ListGroup.Item>
                        <ListGroup.Item><p>{activeDrug.Notes}</p></ListGroup.Item>
                        <ListGroup.Item variant="info">
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

            <MedicineEdit
                show={showMedicineEdit}
                onHide={() => setShowMedicineEdit(!showMedicineEdit)}
                drugInfo={drugInfo}
            />
        </>
    );
}

export default MedicinePage;