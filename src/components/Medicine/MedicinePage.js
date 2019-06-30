import React, {useEffect, useState} from 'reactn';
import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import TabContent from "../../styles/tab_content.css";

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
function MedicinePage() {
    const [ medicineKey, setMedicineKey ] = useState(1);
    const medicineList = [
        {Id: 0, Drug: "Wellbutrin XL", Barcode: "12345"},
        {Id: 1, Drug: "Salsalate", Barcode: "11111"},
        {Id: 2, Drug: "Letrozole", Barcode: "22222"},
        {Id: 3, Drug: "Calcium Gluconate", Barcode: "blah"}
    ];

    let activeDrug = medicineList[medicineKey];

    useEffect(() => {
        activeDrug = medicineList[medicineKey];
    }, [medicineKey]);

    const MedicineDropdownItems = (medicine) => {

        const isActive = medicine.Id === medicineKey;

        return (
            <Dropdown.Item key={medicine.Id} active={isActive} onSelect={() => setMedicineKey(medicine.Id)}>{medicine.Drug}</Dropdown.Item>
        );
    };

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
                    />
                </Col>
                <Col>
                    <Button sm={2}>
                        Add New Medicine
                    </Button>
                </Col>
            </Form.Group>
        </Form>

        <Row>
            <Col sm={3}>
                <OverlayTrigger
                    key="add"
                    placement="top"
                    overlay={
                        <Tooltip id="add-medicine-tooltip">
                            Add drug to medical history
                        </Tooltip>
                    }
                >
                    <Button
                        size="sm"
                        variant="info"
                        onClick={() => alert('Add to Log')}
                    >
                        Add Medicine to Log
                    </Button>
                </OverlayTrigger>

                <Card bg="light">
                <Card.Body>
                    <Card.Title>
                        <DropdownButton
                            size="sm"
                            title={activeDrug.Drug}
                            variant="primary"
                            id="medicine-dropdown-button"
                        >
                            {medicineList.map(MedicineDropdownItems)}
                        </DropdownButton>
                    </Card.Title>

                    <Card.Text>
                        <Form>
                            <Form.Label column sm="6">
                                <b>Directions</b>
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                plaintext
                                readOnly
                                defaultValue="Take once at bedtime."
                            />
                        </Form>
                    </Card.Text>
                    <Card.Text>
                        <Form>
                            <Form.Label column sm="4">
                                <b>Notes</b>
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                plaintext
                                readOnly
                                defaultValue="Medicine is reduced by "
                            />
                        </Form>
                    </Card.Text>

                    <Card.Link href="#">Edit</Card.Link>
                    <Card.Link href="#"><span role="img" aria-label="delete">🗑️ Delete</span></Card.Link>
                </Card.Body>
            </Card>
            </Col>
            <Col sm={6}>
                <span style={{textAlign: "center"}}> <h1>MEDICAL LOG PLACE HOLDER</h1> </span>
                <span style={{textAlign: "center"}}> <h2>subtext</h2> </span>
            </Col>
        </Row>
        </>
    );
}

export default MedicinePage;