import React, {setGlobal, useGlobal} from 'reactn';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TabContent from "../../styles/tab_content.css";

function ScanPage()
{
    const [ providers ] = useGlobal('providers');
    const [ currentTabKey, setCurrentTabKey ] = useGlobal('currentTabKey');

    return (
        <Form className={TabContent}>
            <Form.Label column sm="2">
                Barcode
            </Form.Label>
            <Form.Control
                type="text"
            />

            <Button onClick={() =>
            {
                const medicineProvider = providers.medicineProvider;
                medicineProvider.query('12345', 'Barcode')
                .then((response) =>
                {
                    if (response.success) {
                        if (response.data.length === 1) {
                            const residentProvider = providers.residentProvider;
                            residentProvider.read(response.data[0].ResidentId)
                                .then((residentInfo) =>
                                    setGlobal({
                                        currentResident: residentInfo,
                                        currentBarcode: "12345",
                                        currentTabKey: 'history'
                                    })
                                );
                        } else {
                            alert('barcode not found');
                        }
                    } else {
                        alert('Problem querying medicine');
                        console.error("He's dead Jim", response);
                    }
                })
            }}>
                    Scan
            </Button>
        </Form>
    )
}

export default ScanPage;