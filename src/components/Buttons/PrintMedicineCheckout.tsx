import React, {useState} from 'reactn';
import {Button, Modal} from "react-bootstrap";
import '../../styles/print.css';
import DrugLogGrid from "../Pages/Grids/DrugLogGrid";
import {DrugLogRecord, MedicineRecord} from "../../types/RecordTypes";
import {ButtonProps} from "react-bootstrap/Button";

interface IProps extends ButtonProps {
    medicineList: MedicineRecord[]
    drugLogList: DrugLogRecord[]
}

const PrintMedicineCheckout = (props: IProps) => {
    const medicineList = props.medicineList;
    const drugLogList = props.drugLogList

    const [showPrintModal, setShowPrintModal] = useState(false);

    // TODO: const checkoutList =

    /**
     * Print the element (including modals id="printThis")
     * @param {HTMLElement} elem
     */
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
                    <DrugLogGrid
                        condensed="true"
                        drugLog={drugLogList}
                        medicineList={medicineList}
                        drugId={null}
                    />
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
