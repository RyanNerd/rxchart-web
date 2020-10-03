import React, {useGlobal, useState} from 'reactn';
import Table from "react-bootstrap/Table";
import MedicineDetail from "../components/Grids/MedicineDetail";
import MedicineEdit from "../components/Modals/MedicineEdit";
import ConfirmationDialog from "../components/Modals/ConfirmationDialog";
import DeleteMedicine from "../providers/helpers/DeleteMedicine";
import TooltipButton from "../components/Buttons/TooltipButton";
import PropTypes from 'prop-types';
import MedicineProvider from "../providers/MedicineProvider";
import {MedicineRecord, newDrugInfo} from "../types/RecordTypes";
import {useProviders} from "../utility/useProviders";
import {updateMedicine} from "./Common/updateMedicine";
import getMedicineList from "./Common/getMedicineList";

interface IProps {
    onError: (e: Error) => void
}

/**
 * ManageDrugPage
 * Page for Displaying, editing and adding Medicine
 *
 * @returns {null|*}
 */
const ManageDrugPage = (props: IProps) => {
    const [ medicineList, setMedicineList ] = useGlobal<MedicineRecord>('medicineList');
    const [ activeResident ]= useGlobal('activeResident');

    const [ showMedicineEdit, setShowMedicineEdit ] = useState(false);
    const [ showDeleteMedicine, setShowDeleteMedicine ] = useState(false);
    const [ medicineInfo, setMedicineInfo ] = useState<MedicineRecord | null>(null);

    const providers = useProviders();
    const medicineProvider = providers.medicineProvider as typeof MedicineProvider;
    const onError = props.onError;

    /**
     * Fires when the Edit button is clicked
     *
     * @param {MouseEvent} e
     * @param {object} medicine
     */
    const onEdit = (e: React.MouseEvent<HTMLElement>, medicine: MedicineRecord | null) => {
        e.preventDefault();
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const medicineInfo = (medicine) ? {...medicine} : {
            ...newDrugInfo,
            OTC: false,
            ResidentId: activeResident?.Id,
            FillDateDay: day,
            FillDateMonth: month,
            FillDateYear: year
        };
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
        if (medicineInfo && medicineInfo.Id && activeResident) {
            DeleteMedicine(medicineProvider, medicineInfo.Id)
            .then((deleted: any) => {
                if (deleted) {
                    if (activeResident.Id) {
                        getMedicineList(medicineProvider, activeResident.Id)
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
                    {medicineList.map((drug: MedicineRecord) => MedicineDetail(drug, onDelete, onEdit, true))}
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
                        if (residentId && r) {
                            updateMedicine(medicineProvider, r)
                            .then(() => {
                                getMedicineList(medicineProvider, residentId)
                                .then((medicines) => setMedicineList(medicines))
                            })
                            .catch((err) => onError(err))
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
