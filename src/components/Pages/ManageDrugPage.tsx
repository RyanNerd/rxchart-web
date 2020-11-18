import Confirm from "../Modals/Confirm";
import MedicineDetail from "../Grids/MedicineDetail";
import MedicineEdit from "../Modals/MedicineEdit";
import React, {useGlobal, useState} from 'reactn';
import Table from "react-bootstrap/Table";
import TooltipButton from "../Buttons/TooltipButton";
import {Alert} from "react-bootstrap";
import {getMDY} from "../../utility/common";
import {MedicineRecord, newDrugInfo} from "../../types/RecordTypes";

/**
 * ManageDrugPage
 * Page for Displaying, editing and adding Medicine
 * @returns {JSX.Element}
 */
const ManageDrugPage = (): JSX.Element | null => {
    const [, setMedicine] = useGlobal('medicine');
    const [activeResident] = useGlobal('activeResident');
    const [activeTabKey] = useGlobal('activeTabKey');
    const [medicineInfo, setMedicineInfo] = useState<MedicineRecord | null>(null);
    const [medicineList] = useGlobal('medicineList');
    const [showDeleteMedicine, setShowDeleteMedicine] = useState(false);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);

    // If this tab isn't active then don't render
    if (activeTabKey !== 'manage') {
        return null;
    } else {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    /**
     * Fires when the Edit button is clicked
     * @param {React.MouseEvent<HTMLElement>} e
     * @param {MedicineRecord | null} medicine
     */
    const onEdit = (e: React.MouseEvent<HTMLElement>, medicine: MedicineRecord | null) => {
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
                {medicineList.map((drug: MedicineRecord) =>
                    <MedicineDetail
                        drug={drug}
                        key={'med-' + drug.Id}
                        onDelete={(e, medicineRecord) => {
                            e.preventDefault();
                            setMedicineInfo({...medicineRecord});
                            setShowDeleteMedicine(true);
                        }}
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
                    setMedicine({action: 'update', payload: r});
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
                    setMedicine(a ? {action: "delete", payload: medicineInfo?.Id as number} : null);
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
