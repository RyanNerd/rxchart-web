import React, {useGlobal, useState} from 'reactn';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import MedicineEdit from "../components/Modals/MedicineEdit";
import ConfirmationDialog from "../components/Modals/Dialog/ConfirmationDialog";
import DeleteMedicine from "../providers/helpers/DeleteMedicine";
import TooltipButton from "../components/Buttons/TooltipButton";
import RefreshOtcList from "../providers/helpers/RefreshOtcList";
import PropTypes from 'prop-types';

/**
 * ManageOtcPage
 * Page for Displaying, editing and adding Medicine
 *
 * @returns {null|*}
 */
const ManageOtcPage = (props) => {
    const [ otcList, setOtcList ] = useGlobal('otcList');
    const [ providers ] = useGlobal('providers');
    const medicineProvider = providers.medicineProvider;

    const [ showMedicineEdit, setShowMedicineEdit ] = useState(false);
    const [ showDeleteMedicine, setShowDeleteMedicine ] = useState(false);
    const [ medicineInfo, setMedicineInfo ] = useState(null);

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

    const handleMedicineEditModalClose = (drugInfo) => {
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
                    RefreshOtcList(providers.medicineProvider)
                    .then((data) => {setOtcList(data)})
                    .catch((err) => setOtcList(null));
                })
                .catch((err) => props.onError(err));
        }

        setShowMedicineEdit(false);
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
            <TooltipButton
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
                {otcList.map(MedicineDetail)}
                </tbody>
            </Table>
            }

            {showMedicineEdit &&
            /* MedicineEdit Modal */
            <MedicineEdit
                otc={true}
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

ManageOtcPage.propTypes = {
    onError: PropTypes.func.isRequired
}

export default ManageOtcPage;
