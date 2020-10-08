import React, {useGlobal, useState} from 'reactn';
import Table from "react-bootstrap/Table";
import MedicineDetail from "../components/Grids/MedicineDetail";
import MedicineEdit from "../components/Modals/MedicineEdit";
import deleteMedicine from "./Common/deleteMedicine";
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
 * @param {IProps} props
 * @returns {JSX.Element}
 */
const ManageOtcPage = (props: IProps): JSX.Element => {
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
     * @param {MedicineRecord | null} medicine
     */
    const onEdit = (e: React.MouseEvent<HTMLElement>, medicine?: MedicineRecord | null): void => {
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
     * @param {React.MouseEvent<HTMLElement>} e
     * @param {MedicineRecord} medicine
     */
    const onDelete = (e: React.MouseEvent<HTMLElement>, medicine: MedicineRecord): void => {
        e.preventDefault();
        setMedicineInfo({...medicine});
        setShowDeleteMedicine(true);
    }

    /**
     * Fires when user confirms to delete the medicine
     */
    const deleteDrug = (): void => {
        if (medicineInfo && medicineInfo.Id) {
            deleteMedicine(medicineProvider, medicineInfo.Id)
            .then((deleted) => {
                if (deleted) {
                    getOtcList(medicineProvider)
                    .then((drugRecords) => setOtcList(drugRecords))
                    .catch(() => setOtcList(null));
                }
            });
        }
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
                {otcList.map((drug: MedicineRecord) =>
                    <MedicineDetail
                        drug={drug}
                        columns={[
                            'Drug',
                            'Strength',
                            'Directions',
                            'Barcode'
                        ]}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />)
                }
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
                    yesButtonVariant="danger"
                    onAnswer={(a)=> {
                        setShowDeleteMedicine(false);
                        if (a) {
                            deleteDrug();
                        }
                    }}
                >
                    <Confirm.Header>
                        <Confirm.Title>
                            {"Delete " + medicineInfo.Drug}
                        </Confirm.Title>
                    </Confirm.Header>
                    <Confirm.Body>
                        <Alert
                            variant="danger"
                            style={{textAlign: "center"}}
                        >
                            <span>
                                This will delete the OTC medicine <b>{medicineInfo.Drug}</b> for <i>ALL</i> residents
                            </span>
                            <span> and <b>ALL</b> history for this drug!</span>
                        </Alert>
                        <Alert variant="warning">
                            Are you sure?
                        </Alert>
                    </Confirm.Body>
                </Confirm.Modal>
            }
        </>
    );
}

export default ManageOtcPage;
