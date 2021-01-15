import React, {useState} from 'reactn';
import {Button, Modal} from "react-bootstrap";
import '../../styles/print.css';

const PrintMedicineCheckout = (props: any) => {
    const [showPrintModal, setShowPrintModal] = useState(false);

    const printElement = (elem: HTMLElement) => {
        const domClone = elem.cloneNode(true);

        let printSection = document.getElementById("printSection");

        if (!printSection) {
            printSection = document.createElement("div");
            printSection.id = "printSection";
            document.body.appendChild(printSection);
        }

        printSection.innerHTML = "";
        printSection.appendChild(domClone);
        console.log('printSection', printSection);
        window.print();
    }

    const PrintModal = () => {
        return (
            <Modal
                id="printThis"
                onClose={() => {setShowPrintModal(false)}}
                show={showPrintModal}
            >
                <Modal.Body>
                    <div id="printSelection">
                        <h1>Place Holder</h1>
                        <h2>Place Holder 2</h2>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={() => {
                            const el = document.getElementById("printThis");
                            if (el) {
                                printElement(el);
                            }
                        }}
                    >
                      Print
                    </Button>
                    <Button
                        onClick={() => setShowPrintModal(false)}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <div className="wrap">
            <Button
                {...props}
                onClick={() => {setShowPrintModal(true)}}
            >
                Print Medicine Checkout
            </Button>

            <PrintModal/>
        </div>
    )
}

export default PrintMedicineCheckout;
