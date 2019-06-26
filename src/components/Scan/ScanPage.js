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

    function barcodeLookup()
    {
        const medicineProvider = providers.medicineProvider;
        medicineProvider.query(barcodeValue, 'Barcode')
        .then((response) =>
        {
            if (response.success) {
                if (response.data.length === 1) {
                    const residentProvider = providers.residentProvider;
                    residentProvider.read(response.data[0].ResidentId)
                        .then((residentInfo) =>
                        {
                            setGlobal({
                                currentResident: residentInfo,
                                currentBarcode: "12345",
                                currentTabKey: 'history'
                            });
                            setBarcodeValue('');
                        });
                } else {
                    alert('barcode not found');
                }
            } else {
                alert('Problem querying medicine');
                console.error("He's dead Jim", response);
            }
        })
    }

    // Set focus to the barcode input when the scan tab is open
    let bc = React.createRef();
    useEffect(() => {
        if (currentTabKey === 'scan') {
            const barcode = ReactDom.findDOMNode(bc);
            barcode.focus();
        }
    }, [currentTabKey]);

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