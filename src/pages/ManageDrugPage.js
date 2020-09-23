import React, {useGlobal, useState} from 'reactn';
import Table from "react-bootstrap/Table";
import MedicineDetail from "../components/Grids/MedicineDetail";
import MedicineEdit from "../components/Modals/MedicineEdit";
import ConfirmationDialog from "../components/Modals/Dialog/ConfirmationDialog";
import RefreshMedicineList from "../providers/RefreshMedicineList";
import DeleteMedicine from "../providers/helpers/DeleteMedicine";
import TooltipButton from "../components/Buttons/TooltipButton";
import PropTypes from 'prop-types';
import {handleMedicineEditModalClose} from "../utility/helpers";

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

    const [ showMedicineEdit, setShowMedicineEdit ] = useState(false);
    const [ showDeleteMedicine, setShowDeleteMedicine ] = useState(false);
    const [ medicineInfo, setMedicineInfo ] = useState(null);

    const medicineProvider = providers.medicineProvider;
    const onError = props.onError;
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    /**
     * Fires when the Edit button is clicked
     *
     * @param {MouseEvent} e
     * @param {object} medicine
     */
    const onEdit = (e, medicine) => {
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

    /**
     * Handle the delete click event.
     *
     * @param {MouseEvent} e
     * @param {object} medicine

     */
    const onDelete = (e, medicine) => {
        e.preventDefault();
        setMedicineInfo({...medicine});
        setShowDeleteMedicine(true);
    }

    /**
     * Fires when user confirms to delete the medication.
     */
    const deleteMedicine = () => {
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

    return (
        <>
            <TooltipButton
                className="mb-2"
                tooltip="Manually Add New Medicine"
                size="sm"
                variant="info"
                onClick={(e) => onEdit(e, null)}
            >
                + Medicine
            </TooltipButton>

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
                    {medicineList.map((drug) => MedicineDetail(drug, onDelete, onEdit, true))}
                    </tbody>
                </Table>
            }

            {showMedicineEdit &&
                /* MedicineEdit Modal */
                <MedicineEdit
                    show={showMedicineEdit}
                    onHide={() => setShowMedicineEdit(!showMedicineEdit)}
                    onClose={(r) => {
                        handleMedicineEditModalClose(r, medicineProvider, () => RefreshMedicineList(medicineProvider, r.ResidentId), setMedicineList, onError);
                        setShowMedicineEdit(false);
                    }}
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

ManageDrugPage.propTypes = {
    onError: PropTypes.func.isRequired
}

export default ManageDrugPage;
