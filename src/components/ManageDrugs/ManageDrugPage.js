import React, {useGlobal, useState} from 'reactn';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import MedicineEdit from "../Medicine/MedicineEdit";
import ConfirmationDialog from "../Dialog/ConfirmationDialog";

/**
 *
 * @returns {null|*}
 */
export default function ManageDrugPage()
{
    const [ medicineList ] = useGlobal('medicineList');

    const [ showMedicineEdit, setShowMedicineEdit ] = useState(false);
    const [ showDeleteMedicine, setShowDeleteMedicine ] = useState(false);
    const [ medicineInfo, setMedicineInfo ] = useState(null);

    if (!medicineList) {
        return null;
    }

    function onEdit(e, medicine)
    {
        e.preventDefault();
        const medicineInfo = {...medicine};
        setMedicineInfo(medicineInfo);
        setShowMedicineEdit(true);
    }

    function handleMedicineEditModalClose(r)
    {
        if (r) {
            alert(r);
        } else {
            alert('cancel');
        }
    }

    function onDelete(e, medicine)
    {
        e.preventDefault();
        setMedicineInfo({...medicine});
        setShowDeleteMedicine(true);
    }

    function deleteMedicine()
    {
        setShowDeleteMedicine(false);
        alert(medicineInfo.Drug + ' deleted');
    }

    const MedicineDetail = item => {
        return (
            <tr
                key={'medicine-grid-row-' + item.Id}
                id={'medicine-grid-row-' + item.Id}
            >
                <td>
                    <Button
                        size="sm"
                        id={"medicine-edit-btn-" + item.Id}
                        onClick={(e) => onEdit(e, item)}
                    >
                        Edit
                    </Button>
                </td>
                <td>{item.Drug}</td>
                <td>{item.Strength}</td>
                <td>{item.Directions}</td>
                <td>{item.Notes}</td>
                <td>{item.Barcode}</td>
                <td>
                    <Button
                        size="sm"
                        id={"medicine-grid-delete-btn-" + item.Id}
                        variant="outline-danger"
                        onClick={(e, item) => onDelete(e, item)}
                    >
                        <span role="img" aria-label="delete">🗑️</span>
                    </Button>
                </td>
            </tr>
        )
    };

    return (
        <>
            <Table
                striped
                bordered
                hover
                size="sm"
            >
                <thead>
                <tr>
                    <th> </th>
                    <th>
                        Drug
                    </th>
                    <th>
                        Strength
                    </th>
                    <th>
                        Directions
                    </th>
                    <th>
                        Notes
                    </th>
                    <th>
                        Barcode
                    </th>
                    <th> </th>
                </tr>
                </thead>
                <tbody>
                    {medicineList.map(MedicineDetail)}
                </tbody>
            </Table>

            {/* MedicineEdit Modal*/}
            <MedicineEdit
                show={showMedicineEdit}
                onHide={() => setShowMedicineEdit(!showMedicineEdit)}
                onClose={(r) => handleMedicineEditModalClose(r)}
                drugInfo={medicineInfo}
            />

            {medicineInfo &&
            <ConfirmationDialog
                title={"Delete " + medicineInfo.Drug}
                body={
                    <b style={{color: "red"}}>
                        Are you sure?
                    </b>
                }
                show={showDeleteMedicine}
                onAnswer={(a) =>
                {
                    if (a) {
                        deleteMedicine();
                    } else {
                        setShowDeleteMedicine(false);
                    }
                }}
                onHide={() => setShowDeleteMedicine(false)}
            />
            }
        </>
    );
}
