// import  {useState} from 'react';
import React, {setGlobal, useEffect, useGlobal, useState} from 'reactn';
import ReactDom from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TabContent from "../../styles/tab_content.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ScanPage()
{
    const [ providers ] = useGlobal('providers');
    const [ barcodeValue, setBarcodeValue ] = useState('');
    const [ currentTabKey ] = useGlobal('currentTabKey');

    function handleBarcodeKeyPress(e)
    {
        if (e.target.value ) {
            if (e.key === 'Enter') {
                e.preventDefault();
                barcodeLookup();
            }
        }
    }

    /**
     * Fires when the user hits enter on the barcode input or clicks the OK button
     */
    function barcodeLookup()
    {
        // Query the Medicine table looking for a matching barcode.
        const medicineProvider = providers.medicineProvider;
        medicineProvider.query(barcodeValue, 'Barcode')
        .then((response) =>
        {
            // Did we find one?
            if (response.success) {
                // Should only be one
                if (response.data.length === 1) {
                    // Find the associated Resident
                    const residentProvider = providers.residentProvider;
                    residentProvider.read(response.data[0].ResidentId)
                        .then((residentInfo) =>
                        {
                            // Set the currentResident, currentBarcode, and switch to the medical log tab
                            setGlobal({
                                currentResident: residentInfo,
                                currentBarcode: barcodeValue,
                                currentTabKey: 'log'
                            });
                            // Clear the barcode value so when we come back we don't have the previous barcode
                            setBarcodeValue('');
                        });
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

    // Set focus to the barcode input when the scan tab is open
    let bc = React.createRef();
    useEffect(() => {
        if (currentTabKey === 'scan' && bc) {
            const barcode = ReactDom.findDOMNode(bc);
            if (barcode.value === '') {
                barcode.focus();
            }
        }
    }, [currentTabKey, bc]);

    return (
        <Form className={TabContent}>
            <Form.Group as={Row} controlId="bar-code">
                <Form.Label column sm="1">
                    Barcode
                </Form.Label>
                <Col sm="7">
                <Form.Control
                    ref={(i) => {
                        bc = i;
                    }}
                    type="text"
                    value={barcodeValue}
                    onKeyDown={(e) => handleBarcodeKeyPress(e)}
                    onChange={(e) => setBarcodeValue(e.target.value)}
                />
                </Col>
                <Col sm="2">
                    <Button
                        onClick={() => barcodeLookup()}
                    >
                        OK
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    )
}

export default ScanPage;