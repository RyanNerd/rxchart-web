import React, {useGlobal, useState} from 'reactn';
import Table from "react-bootstrap/Table";
import MedicineDetail from "../components/Grids/MedicineDetail";
import MedicineEdit from "../components/Modals/MedicineEdit";
import ConfirmationDialog from "../components/Modals/ConfirmationDialog";
import RefreshMedicineList from "../providers/helpers/RefreshMedicineList";
import DeleteMedicine from "../providers/helpers/DeleteMedicine";
import TooltipButton from "../components/Buttons/TooltipButton";
import PropTypes from 'prop-types';
import {handleMedicineEditModalClose} from "../utility/handleMedicineEditModalClose";
import MedicineProvider from "../providers/MedicineProvider";
import {MedicineRecord} from "../types/RecordTypes";

interface IProps {
    onError: () => void
}

/**
 * ManageDrugPage
 * Page for Displaying, editing and adding Medicine
 *
 * @returns {null|*}
 */
const ManageDrugPage = (props: IProps) => {
    const [ medicineList, setMedicineList ] = useGlobal('medicineList');
    const [ providers ] = useGlobal<any>('providers');
    const [ activeResident ]= useGlobal('activeResident');

    const [ showMedicineEdit, setShowMedicineEdit ] = useState(false);
    const [ showDeleteMedicine, setShowDeleteMedicine ] = useState(false);
    const [ medicineInfo, setMedicineInfo ] = useState<MedicineRecord | null>(null);

    const medicineProvider = providers.medicineProvider as typeof MedicineProvider;
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
    const onEdit = (e: React.MouseEvent<HTMLElement>, medicine: MedicineRecord | null) => {
        e.preventDefault();
        let medicineInfo;
        if (!medicine) {
            medicineInfo = {
                Id: null,
                Barcode: "",
                ResidentId: activeResident?.Id,
                Drug: "",
                Strength: "",
                Directions: "",
                Notes: "",
                FillDateMonth: month,
                FillDateDay: day,
                FillDateYear: year
            } as MedicineRecord;
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
    const onDelete = (e: React.MouseEvent<HTMLElement>, medicine: MedicineRecord) => {
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
        if (medicineInfo && medicineInfo.Id && activeResident) {
            DeleteMedicine(medProvider, medicineInfo.Id)
            .then((deleted: object) => {
                if (deleted) {
                    if (activeResident.Id) {
                        RefreshMedicineList(medicineProvider, activeResident.Id)
                        .then((data) => {
                            setMedicineList(data).then(() => {});
                        });
                    }
                }
            });
            setShowDeleteMedicine(false);
        }
    }

    return (
        <>
            <TooltipButton
                className="mb-2"
                tooltip="Manually Add New Medicine"
                size="sm"
                variant="info"
                onClick={(e: React.MouseEvent<HTMLElement>) => onEdit(e, null)}
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
                    {medicineList.map((drug) => MedicineDetail(drug, onDelete, onEdit, true))}
                    </tbody>
                </Table>
            }

            {showMedicineEdit && medicineInfo &&
                /* MedicineEdit Modal */
                <MedicineEdit
                    show={showMedicineEdit}
                    onHide={() => setShowMedicineEdit(!showMedicineEdit)}
                    onClose={(r) => {
                        const residentId = activeResident && activeResident.Id;
                        if (residentId) {
                            handleMedicineEditModalClose(r, medicineProvider, () =>
                                RefreshMedicineList(medicineProvider, residentId), setMedicineList, onError);
                        }
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
