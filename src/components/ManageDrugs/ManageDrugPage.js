import React, {useGlobal, useState} from 'reactn';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import MedicineEdit from "../Medicine/MedicineEdit";
import ConfirmationDialog from "../Dialog/ConfirmationDialog";
import RefreshMedicineList from "../../providers/RefreshMedicineList";
import AddNewMedicineButton from "./AddNewMedicineButton";
import DeleteMedicine from "../../providers/helpers/DeleteMedicine";

/**
 * ManageDrugPage
 * Page for Displaying, editing and adding Medicine
 *
 * @returns {null|*}
 */
const ManageDrugPage = (props) => {
    const [ medicineList, setMedicineList ] = useGlobal('medicineList');
    const [ providers ] = useGlobal('providers');
    const [ activeResident ]= useGlobal('activeResident');
    const medicineProvider = providers.medicineProvider;

    const [ showMedicineEdit, setShowMedicineEdit ] = useState(false);
    const [ showDeleteMedicine, setShowDeleteMedicine ] = useState(false);
    const [ medicineInfo, setMedicineInfo ] = useState(null);

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    /**
     * Fires when the Edit button is clicked
     *
     * @param {Event} e
     * @param {object} medicine
     */
    function onEdit(e, medicine)
    {
        e.preventDefault();

        let medicineInfo;
        if (!medicine) {
            medicineInfo = {
                Id: 0,
                Barcode: "",
                ResidentId: activeResident.Id,
                Drug: "",
                Strength: "",
                Directions: "",
                Notes: "",
                FillDateMonth: month,
                FillDateDay: day,
                FillDateYear: year
            };
        } else {
            medicineInfo = {...medicine};
        }

        setMedicineInfo(medicineInfo);
        setShowMedicineEdit(true);
    }

    function handleMedicineEditModalClose(drugInfo) {
        if (drugInfo) {
            const drugData = {...drugInfo};

            if (!drugData.Id) {
                drugData.Id = null;
            }

            if (drugData.Notes === '') {
                drugData.Notes = null;
            }

            medicineProvider.post(drugData)
            .then((drugRecord) => {
                RefreshMedicineList(medicineProvider, drugData.ResidentId)
                .then((drugList) => {
                    setMedicineList(drugList);
                })
                .catch((err) => {
                    props.onError(err);
                });
            });
        }
        setShowMedicineEdit(false);
    }

    function onDelete(e, medicine)
    {
        e.preventDefault();
        setMedicineInfo({...medicine});
        setShowDeleteMedicine(true);
    }

    function deleteMedicine()
    {
        // Work around for a weird bug that manifests itself only in production.
        let medProvider = medicineProvider;
        if (medProvider === undefined) {
            medProvider = providers.medicineProvider;
        }

        DeleteMedicine(medProvider, medicineInfo.Id)
        .then((deleted) => {
            if (deleted) {
                RefreshMedicineList(medicineProvider, activeResident.Id)
                .then((data) => {
                    setMedicineList(data);
                });
            }
        });
        setShowDeleteMedicine(false);
    }

    const MedicineDetail = (item) => {
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
                        onClick={(e) => onDelete(e, item)}
                    >
                        <span role="img" aria-label="delete">🗑️</span>
                    </Button>
                </td>
            </tr>
        )
    };

    return (
        <>
            <AddNewMedicineButton
                style={{marginBottom: "15px"}}
                onClick={(e) => onEdit(e, null)}
            />

            {medicineList &&
                <Table
                  striped
                  bordered
                  hover
                  size="sm"
                >
                    <thead>
                    <tr>
                        <th></th>
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
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {medicineList.map(MedicineDetail)}
                    </tbody>
                </Table>
            }

            {showMedicineEdit &&
                /* MedicineEdit Modal */
                <MedicineEdit
                    show={showMedicineEdit}
                    onHide={() => setShowMedicineEdit(!showMedicineEdit)}
                    onClose={(r) => handleMedicineEditModalClose(r)}
                    drugInfo={medicineInfo}
                />
            }

            {medicineInfo && showDeleteMedicine &&
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

export default ManageDrugPage;
