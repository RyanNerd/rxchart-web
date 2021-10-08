import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import React, {useGlobal, useState} from 'reactn';
import {MedicineRecord, newMedicineRecord} from "types/RecordTypes";
import TooltipButton from "./Buttons/TooltipButton";
import MedicineDetail from "./Grids/MedicineDetail";
import Confirm from "./Modals/Confirm";
import MedicineEdit from "./Modals/MedicineEdit";

/**
 * ManageOtcPage
 * Page for Displaying, editing and adding OTC drugs
 * @returns {JSX.Element}
 */
const ManageOtcPage = (): JSX.Element | null => {
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [activeTabKey] = useGlobal('activeTabKey');
    const [medicineInfo, setMedicineInfo] = useState<MedicineRecord | null>(null);
    const [mm] = useGlobal('medicineManager');
    const [otcList, setOtcList] = useGlobal('otcList');
    const [showDeleteMedicine, setShowDeleteMedicine] = useState(false);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);

    // If this tab isn't active then don't render
    if (activeTabKey !== 'manage-otc') {
        return null;
    }

    /**
     * Given a MedicineRecord Update or Insert the record and rehydrate the global otcList
     * @param {MedicineRecord} med
     */
    const saveOtcMedicine = async (med: MedicineRecord) => {
        const m = await mm.updateMedicine(med);

        // Rehydrate the global otcList
        const ol = await mm.loadOtcList();
        await setOtcList(ol);

        return m;
    }

    /**
     * Fires when the Edit button is clicked
     * @param {MedicineRecord | null} medicine
     */
    const onEdit = (medicine?: MedicineRecord | null) => {
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
                onClick={() => onEdit(null)}
            >
                + OTC
            </TooltipButton>

            <Table
                style={{height: "730px", overflowY: "scroll", display: "block"}}
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
                    <th style={{textAlign: 'center', verticalAlign: "middle"}}>Delete</th>
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
                        onDelete={(medicineRecord) => {
                            setMedicineInfo({...medicineRecord});
                            setShowDeleteMedicine(true);
                        }
                        }
                        onEdit={onEdit}
                        isOTC={true}
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
                    if (r) {
                        saveOtcMedicine(r);
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
                        mm.deleteMedicine(medicineInfo?.Id as number).then(d => {
                            if (d) {
                                mm.loadOtcList().then(ol => {
                                    setOtcList(ol)
                                })
                            } else {
                                setErrorDetails('Unable to Delete OTC medicine. Id: ' + medicineInfo.Id);
                            }
                        })
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
