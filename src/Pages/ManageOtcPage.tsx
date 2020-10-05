import React, {useGlobal, useState} from 'reactn';
import Table from "react-bootstrap/Table";
import MedicineDetail from "../components/Grids/MedicineDetail";
import MedicineEdit from "../components/Modals/MedicineEdit";
import DeleteMedicine from "./Common/deleteMedicine";
import TooltipButton from "../components/Buttons/TooltipButton";
import MedicineProvider from "../providers/MedicineProvider";
import {MedicineRecord, newDrugInfo} from "../types/RecordTypes";
import {useProviders} from "../utility/useProviders";
import {updateMedicine} from "./Common/updateMedicine";
import getOtcList from "./Common/getOtcList";
import Confirm from "../components/Modals/Confirm";
import {Alert} from "react-bootstrap";

interface IProps {
    onError: (e: Error) => void
}

/**
 * ManageOtcPage
 * Page for Displaying, editing and adding OTC drugs
 *
 * @returns {null|*}
 */
const ManageOtcPage = (props: IProps) => {
    const [ otcList, setOtcList ] = useGlobal<any>('otcList');

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
        const medicineInfo = (medicine) ? {...medicine} : {...newDrugInfo, OTC: true};
        setMedicineInfo(medicineInfo);
        setShowMedicineEdit(true);
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
            .then((deleted: any) => {
                if (deleted) {
                    getOtcList(medicineProvider)
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
                {otcList.map((drug: MedicineRecord) => MedicineDetail(drug, onDelete, onEdit, false))}
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
                    if (r) {
                        updateMedicine(medicineProvider, r)
                        .then(() => {
                            getOtcList(medicineProvider)
                                .then((medicines) => setOtcList(medicines))
                        })
                        .catch((err) => onError(err))
                    }
                    setShowMedicineEdit(false);
                }}
                drugInfo={medicineInfo}
            />
            }

            {medicineInfo && showDeleteMedicine &&
                <Confirm.Modal
                    size="lg"
                    show={showDeleteMedicine}
                    onAnswer={(a)=> {
                        setShowDeleteMedicine(false);
                        if (a) {deleteMedicine()}
                    }}
                >
                    <Confirm.Header>
                        <Confirm.Title>
                            {"Delete " + medicineInfo.Drug}
                        </Confirm.Title>
                    </Confirm.Header>
                    <Confirm.Body>
                        <>
                            <b style={{color: "#fa2224"}}>This will delete this OTC medicine for ALL residents</b>
                            <p style={{color: "red"}}>
                                Are you sure?
                            </p>
                        </>
                    </Confirm.Body>
                </Confirm.Modal>
            }
        </>
    );
}

export default ManageOtcPage;
