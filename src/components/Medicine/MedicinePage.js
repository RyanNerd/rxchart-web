import React, {useEffect, useState} from 'reactn';
import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

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
            <Card style={{ width: '40%' }}>
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
                        <p><span> </span></p>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Barcode: {activeDrug.Barcode}</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>
        </>
    );
}

export default MedicinePage;