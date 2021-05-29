import Confirm from "./Modals/Confirm";
import MedicineDetail from "./Grids/MedicineDetail";
import MedicineEdit from "./Modals/MedicineEdit";
import React, {useGlobal, useState} from 'reactn';
import Table from "react-bootstrap/Table";
import TooltipButton from "../Buttons/TooltipButton";
import {Alert} from "react-bootstrap";
import {MedicineRecord, newMedicineRecord} from "../../types/RecordTypes";

/**
 * ManageOtcPage
 * Page for Displaying, editing and adding OTC drugs
 * @returns {JSX.Element}
 */
const ManageOtcPage = (): JSX.Element | null => {
    const [, setOtcMedicine] = useGlobal('__otcMedicine');
    const [activeTabKey] = useGlobal('activeTabKey');
    const [medicineInfo, setMedicineInfo] = useState<MedicineRecord | null>(null);
    const [otcList] = useGlobal('otcList');
    const [showDeleteMedicine, setShowDeleteMedicine] = useState(false);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);

    // If this tab isn't active then don't render
    if (activeTabKey !== 'manage-otc') {
        return null;
    }

    /**
     * Fires when the Edit button is clicked
     * @param {MouseEvent} e
     * @param {MedicineRecord | null} medicine
     */
    const onEdit = (e: React.MouseEvent<HTMLElement>, medicine?: MedicineRecord | null) => {
        e.preventDefault();
        const medicineInfo = (medicine) ? {...medicine} : {...newMedicineRecord, OTC: true};
        setMedicineInfo(medicineInfo);
        setShowMedicineEdit(true);
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
                        onDelete={(e, medicineRecord) => {
                            e.preventDefault();
                            setMedicineInfo({...medicineRecord});
                            setShowDeleteMedicine(true);
                        }
                        }
                        onEdit={onEdit}
                    />)
                }
                </tbody>
            </Table>

            {showMedicineEdit && medicineInfo &&
            /* MedicineEdit Modal */
            <MedicineEdit
                show={showMedicineEdit}
                onClose={(r) => {
                    setShowMedicineEdit(false);
                    setOtcMedicine({action: 'update', payload: r});
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
                    setOtcMedicine(a ? {action: 'delete', payload: medicineInfo?.Id as number} : null);
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
