import React, {useGlobal, useState} from 'reactn';
import Table from "react-bootstrap/Table";
import MedicineDetail from "../components/Grids/MedicineDetail";
import MedicineEdit from "../components/Modals/MedicineEdit";
import ConfirmationDialog from "../components/Modals/ConfirmationDialog";
import DeleteMedicine from "../providers/helpers/DeleteMedicine";
import TooltipButton from "../components/Buttons/TooltipButton";
import RefreshOtcList from "../providers/helpers/RefreshOtcList";
import {handleMedicineEditModalClose} from "../utility/handleMedicineEditModalClose";
import MedicineProvider from "../providers/MedicineProvider";
import {MedicineRecord} from "../types/RecordTypes";
import {useProviders} from "../utility/useProviders";

interface IProps {
    onError: (e: ErrorEvent) => void
}

/**
 * ManageOtcPage
 * Page for Displaying, editing and adding OTC drugs
 *
 * @returns {null|*}
 */
const ManageOtcPage = (props: IProps) => {
    const [ otcList, setOtcList ] = useGlobal('otcList');

    const [ showMedicineEdit, setShowMedicineEdit ] = useState(false);
    const [ showDeleteMedicine, setShowDeleteMedicine ] = useState(false);
    const [ medicineInfo, setMedicineInfo ] = useState<MedicineRecord | null>(null);

    const providers  = useProviders();
    const medicineProvider = providers.medicineProvider as typeof MedicineProvider;
    const onError = props.onError;

    /**
     * Fires when the Edit button is clicked
     *
     * @param {MouseEvent} e
     * @param {object} medicine
     */
    const onEdit = (e: React.MouseEvent<HTMLElement>, medicine?: MedicineRecord | null) => {
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
                Notes: "",
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
    const onDelete = (e: React.MouseEvent<HTMLElement>, medicine: MedicineRecord) => {
        e.preventDefault();
        setMedicineInfo({...medicine});
        setShowDeleteMedicine(true);
    }

    /**
     * Fires when user confirms to delete the medicine
     */
    const deleteMedicine = () => {
        if (medicineInfo && medicineInfo.Id) {
            DeleteMedicine(medicineProvider, medicineInfo.Id)
            .then((deleted: object) => {
                if (deleted) {
                    RefreshOtcList(medicineProvider)
                    .then((data) => setOtcList(data))
                    .catch(() => setOtcList(null));
                }
            });
        }
        setShowDeleteMedicine(false);
    }

    return (
        <>
            <TooltipButton
                className="mb-2"
                tooltip="Manually Add New OTC"
                size="sm"
                variant="info"
                onClick={(e: React.MouseEvent<HTMLElement>) => onEdit(e, null)}
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
                        Barcode
                    </th>
                    <th> </th>
                </tr>
                </thead>
                <tbody>
                {otcList.map((drug) => MedicineDetail(drug, onDelete, onEdit, false))}
                </tbody>
            </Table>
            }

            {showMedicineEdit && medicineInfo &&
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

export default ManageOtcPage;
