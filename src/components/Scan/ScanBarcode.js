import Form from "react-bootstrap/Form";
import TabContent from "../../styles/tab_content.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import React from "reactn";

export default function ScanBarcode()
{

    return (
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
        </Form>)
}