import Confirm from "../components/Modals/Confirm";
import MedicineDetail from "../components/Grids/MedicineDetail";
import MedicineEdit from "../components/Modals/MedicineEdit";
import React, {useGlobal, useState} from 'reactn';
import Table from "react-bootstrap/Table";
import TooltipButton from "../components/Buttons/TooltipButton";
import {Alert} from "react-bootstrap";
import {getMDY} from "../utility/common";
import {MedicineRecord, newDrugInfo} from "../types/RecordTypes";

interface IProps {
    onError: (e: Error) => void
}

/**
 * ManageDrugPage
 * Page for Displaying, editing and adding Medicine
 *
 * @returns {JSX.Element}
 */
const ManageDrugPage = (props: IProps): JSX.Element => {
    const [activeResident] = useGlobal('activeResident');
    const [medicineInfo, setMedicineInfo] = useState<MedicineRecord | null>(null);
    const [medicineList, setMedicineList] = useGlobal('medicineList');
    const [mm] = useGlobal('medicineManager');
    const [showDeleteMedicine, setShowDeleteMedicine] = useState(false);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);
    const onError = props.onError;

    /**
     * Fires when the Edit button is clicked
     *
     * @param {React.MouseEvent<HTMLElement>} e
     * @param {MedicineRecord | null} medicine
     */
    const onEdit = (e: React.MouseEvent<HTMLElement>, medicine: MedicineRecord | null): void => {
        e.preventDefault();
        const mdy = getMDY();
        const medicineInfo = (medicine) ? {...medicine} : {
            ...newDrugInfo,
            OTC: false,
            ResidentId: activeResident?.Id,
            FillDateDay: mdy.day,
            FillDateMonth: mdy.month,
            FillDateYear: mdy.year
        };
        setMedicineInfo(medicineInfo);
        setShowMedicineEdit(true);
    }

    /**
     * Handle the delete click event.
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
     * Fires when user confirms to delete the medication.
     */
    const deleteDrug = () => {
            mm.deleteMedicine(medicineInfo?.Id as number)
                .then((deleted) => {
                    if (deleted) {
                        mm.loadMedicineList(activeResident?.Id as number)
                        .then((medicineRecords) => {
                            setMedicineList(medicineRecords);
                        })
                            .catch((err) => onError(err));
                    }
                })
                .catch((err) => onError(err));
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
                {medicineList.map((drug: MedicineRecord) =>
                    <MedicineDetail
                        drug={drug}
                        key={'med-' + drug.Id}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                )}
                </tbody>
            </Table>

            {showMedicineEdit && medicineInfo &&
                /* MedicineEdit Modal */
                <MedicineEdit
                    show={showMedicineEdit}
                    onClose={(r) => {
                        setShowMedicineEdit(false);
                        if (r) {
                            mm.updateMedicine(r)
                                .then(() => {
                                    mm.loadMedicineList(activeResident?.Id as number)
                                        .then((medicines) => setMedicineList(medicines))
                                })
                                .catch((err) => onError(err))
                        }
                    }}
                    drugInfo={medicineInfo}
                />
            }

            {medicineInfo && showDeleteMedicine &&
                <Confirm.Modal
                    show={showDeleteMedicine}
                    buttonvariant="danger"
                    onSelect={(a) => {
                        setShowDeleteMedicine(false);
                        if (a) {
                            deleteDrug()
                        }
                    }}
                >
                    <Confirm.Header>
                        <Confirm.Title>
                            {"Delete " + medicineInfo.Drug}
                        </Confirm.Title>
                    </Confirm.Header>
                    <Confirm.Body>
                        <Alert variant="danger">
                            Deleting this medicine will remove <b>ALL</b> history of this drug being taken!
                        </Alert>
                        <b style={{color: "red"}}>
                            Are you sure?
                        </b>
                    </Confirm.Body>
                </Confirm.Modal>
            }
        </>
    );
}

export default ManageDrugPage;
