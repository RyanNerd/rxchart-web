import Confirm from "../Modals/Confirm";
import MedicineDetail from "../Grids/MedicineDetail";
import MedicineEdit from "../Modals/MedicineEdit";
import React, {useGlobal, useState} from 'reactn';
import Table from "react-bootstrap/Table";
import TooltipButton from "../Buttons/TooltipButton";
import {Alert} from "react-bootstrap";
import {MedicineRecord, newDrugInfo} from "../../types/RecordTypes";

/**
 * ManageOtcPage
 * Page for Displaying, editing and adding OTC drugs
 * @returns {JSX.Element}
 */
const ManageOtcPage = (): JSX.Element => {
    const [medicineInfo, setMedicineInfo] = useState<MedicineRecord | null>(null);
    const [mm] = useGlobal('medicineManager');
    const [otcList, setOtcList] = useGlobal('otcList');
    const [showDeleteMedicine, setShowDeleteMedicine] = useState(false);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);
    const [, setErrorDetails] = useGlobal('errorDetails');

    /**
     * Fires when the Edit button is clicked
     * @param {MouseEvent} e
     * @param {MedicineRecord | null} medicine
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
     * @param {React.MouseEvent<HTMLElement>} e
     * @param {MedicineRecord} medicine
     */
    const onDelete = (e: React.MouseEvent<HTMLElement>, medicine: MedicineRecord) => {
        e.preventDefault();
        setMedicineInfo({...medicine});
        setShowDeleteMedicine(true);
    }

    /**
     * Fires when user confirms to delete the medicine
     */
    const deleteDrug = () => {
            mm.deleteMedicine(medicineInfo?.Id as number)
                .then((deleted) => {
                    if (deleted) {
                       mm.loadOtcList()
                            .then((drugs) => setOtcList(drugs))
                            .catch(() => setOtcList([]));
                    }
                })
                .catch((err) => setErrorDetails(err))
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
                        key={'otc' + drug.Id}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />)
                }
                </tbody>
            </Table>

            {showMedicineEdit && medicineInfo &&
                /* MedicineEdit Modal */
                <MedicineEdit
                    otc={true}
                    show={showMedicineEdit}
                    onClose={(r) => {
                        setShowMedicineEdit(false);
                        if (r) {
                            mm.updateMedicine(r)
                                .then(() => {
                                    mm.loadOtcList()
                                        .then((otcDrugs) => setOtcList(otcDrugs))
                                })
                                .catch((err) => setErrorDetails(err))
                        }
                    }}
                    drugInfo={medicineInfo}
                />
            }

            {medicineInfo && showDeleteMedicine &&
                <Confirm.Modal
                    size="lg"
                    show={showDeleteMedicine}
                    buttonvariant="danger"
                    onSelect={(a) => {
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
