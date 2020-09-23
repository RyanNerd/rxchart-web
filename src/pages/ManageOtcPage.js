import React, {useGlobal, useState} from 'reactn';
import Table from "react-bootstrap/Table";
import MedicineDetail from "../components/Grids/MedicineDetail";
import MedicineEdit from "../components/Modals/MedicineEdit";
import ConfirmationDialog from "../components/Modals/Dialog/ConfirmationDialog";
import DeleteMedicine from "../providers/helpers/DeleteMedicine";
import TooltipButton from "../components/Buttons/TooltipButton";
import RefreshOtcList from "../providers/helpers/RefreshOtcList";
import PropTypes from 'prop-types';
import {handleMedicineEditModalClose} from "../utility/helpers";

/**
 * ManageOtcPage
 * Page for Displaying, editing and adding OTC drugs
 *
 * @returns {null|*}
 */
const ManageOtcPage = (props) => {
    const [ otcList, setOtcList ] = useGlobal('otcList');
    const [ providers ] = useGlobal('providers');

    const [ showMedicineEdit, setShowMedicineEdit ] = useState(false);
    const [ showDeleteMedicine, setShowDeleteMedicine ] = useState(false);
    const [ medicineInfo, setMedicineInfo ] = useState(null);

    const medicineProvider = providers.medicineProvider;
    const onError = props.onError;

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
                ResidentId: null,
                Drug: "",
                Strength: "",
                Directions: "",
                OTC: true
            };
        } else {
            medicineInfo = {...medicine};
        }

        setMedicineInfo(medicineInfo);
        setShowMedicineEdit(true);
    }

    /**
     * Handle the click event for delete
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
     * Fires when user confirms to delete the medicine
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
                    RefreshOtcList(providers.medicineProvider)
                    .then((data) => setOtcList(data))
                    .catch((err) => setOtcList(null));
                }
            });
        setShowDeleteMedicine(false);
    }

    return (
        <>
            <TooltipButton
                className="mb-2"
                tooltip="Manually Add New OTC"
                size="sm"
                variant="info"
                onClick={(e) => onEdit(e, null)}
            >
                + OTC
            </TooltipButton>

            {otcList &&
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
                        Barcode
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {otcList.map((drug) => MedicineDetail(drug, onDelete, onEdit, false))}
                </tbody>
            </Table>
            }

            {showMedicineEdit &&
            /* MedicineEdit Modal */
            <MedicineEdit
                otc={true}
                show={showMedicineEdit}
                onHide={() => setShowMedicineEdit(!showMedicineEdit)}
                onClose={(r) => {
                    handleMedicineEditModalClose(r, medicineProvider, ()=>RefreshOtcList(medicineProvider), setOtcList, onError);
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

ManageOtcPage.propTypes = {
    onError: PropTypes.func.isRequired
}

export default ManageOtcPage;
