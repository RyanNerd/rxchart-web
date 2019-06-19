import React, { useGlobal } from 'reactn';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function ScanPage()
{
    const [ currentBarcode, setCurrentBarcode ] = useGlobal('currentBarCode');
    const [ currentResident, setCurrentResident] = useGlobal('currentResident');

    return (
        <Form>
            <Form.Check>
                Test
            </Form.Check>
            <Button onClick={() =>{
             const resident = {
                 LastName: "White",
                 FirstName: "Snow"
             };
             setCurrentResident(resident);
             setCurrentBarcode('test');
            }}>
                Scan
            </Button>
        </Form>
    )
}

export default ScanPage;