import React, {setGlobal} from 'reactn';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TabContent from "../../styles/tab_content.css";

function ScanPage()
{
    return (
        <Form className={TabContent}>
            <Form.Check type="checkbox" label="Check me out"/>
                                                                                                        <Button onClick={() =>{
             const resident = {
                 LastName: "White",
                 FirstName: "Snow"
             };
             setGlobal({currentResident: resident, currentBarcode: "test"});
            }}>
                Scan
            </Button>
        </Form>
    )
}

export default ScanPage;