import React, {useState} from 'reactn';
import {MedicineRecord} from "../../../types/RecordTypes";
import {Button, Table} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

interface IProps {
    show: boolean
    checkoutList: { id: number | null; value: number; }[] // List of medicine record Ids and checkout count
    medicineList: MedicineRecord[]
    onExited: () => void
}

const MedicineCheckoutModal = (props: IProps): JSX.Element | null => {
    const {
        show,
        checkoutList,
        medicineList,
        onExited
    } = props;

    const [showModal, setShowModal] = useState(show);

    const drugList: { Drug: string; Out: number; }[] = [];
    checkoutList.forEach((o) => {
        const drug = medicineList.find((mr) => {
            return mr.Id === o.id;
        });
        if (drug) {
            drugList.push({Drug: drug.Drug, Out: o.value});
        }
    });

    return (
        <Modal
            backdrop="static"
            centered
            show={showModal}
            onExited={() => onExited()}
        >
            <Modal.Body>
                <Table>
                    <th>
                        Drug
                    </th>
                    <th>
                        Out
                    </th>
                    <tbody>
                    {drugList.map((dl) => {
                        return (
                            <tr>
                                <td>
                                    {dl.Drug}
                                </td>
                                <td>
                                    {dl.Out}
                                </td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        setShowModal(false);
                    }}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MedicineCheckoutModal;
