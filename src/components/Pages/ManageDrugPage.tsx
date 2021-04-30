import Confirm from "./Modals/Confirm";
import MedicineDetail from "./Grids/MedicineDetail";
import MedicineEdit from "./Modals/MedicineEdit";
import React, {useGlobal, useState} from 'reactn';
import Table from "react-bootstrap/Table";
import TooltipButton from "../Buttons/TooltipButton";
import {Alert, Form, Row} from "react-bootstrap";
import {getDrugName, getMDY, isToday} from "../../utility/common";
import {DrugLogRecord, MedicineRecord, newDrugInfo, newDrugLogRecord} from "../../types/RecordTypes";
import TabContent from "../../styles/common.css";
import DrugLogGrid from "./Grids/DrugLogGrid";
import DrugLogEdit from "./Modals/DrugLogEdit";
import Button from "react-bootstrap/Button";

/**
 * ManageDrugPage
 * Page for Displaying, editing and adding Medicine
 * @returns {JSX.Element}
 */
const ManageDrugPage = (): JSX.Element | null => {
    const [, setMedicine] = useGlobal('__medicine');
    const [, setDrugLog] = useGlobal('__drugLog');
    const [activeResident] = useGlobal('activeResident');
    const [activeTabKey] = useGlobal('activeTabKey');
    const [drugLogList] = useGlobal('drugLogList');
    const [medicineInfo, setMedicineInfo] = useState<MedicineRecord | null>(null);
    const [medicineList] = useGlobal('medicineList');
    const [showDeleteMedicine, setShowDeleteMedicine] = useState(false);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);
    const [showCheckoutModal, setShowCheckoutModal] = useState<DrugLogRecord | boolean>(false);

    // We only display the log for drugs that were updated/created today.
    const checkoutList = drugLogList.filter((dr) => {
        const updated = dr && dr.Updated;
        return updated && isToday(updated);
    });

    // If this tab isn't active then don't render
    if (activeTabKey !== 'manage') {
        return null;
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

    const handleCheckoutClicked = (e: React.MouseEvent<HTMLElement, MouseEvent>, r: MedicineRecord) => {
        e.preventDefault();
        const exitingCheckout = checkoutList.filter((cl) => {
            return cl.MedicineId === r.Id;
        });

        const drugLog = exitingCheckout.length > 0 ? exitingCheckout[0] : {...newDrugLogRecord};
        if (drugLog.ResidentId === 0) {
            drugLog.ResidentId = r.ResidentId as number;
            drugLog.MedicineId = r.Id as number;
        }

        setShowCheckoutModal(drugLog);
    }

    return (
        <Form className={TabContent}>
                <Row>
                    <TooltipButton
                        tooltip="Manually Add New Medicine"
                        size="sm"
                        variant="info"
                        onClick={(e: React.MouseEvent<HTMLElement>) => onEdit(e, null)}
                    >
                        + Medicine
                    </TooltipButton>

                    <Button
                        className="ml-3"
                        size="sm"
                        variant="info"
                        disabled={true}
                        onClick={() => {
                            // todo: setActiveTabKey('medicine-checkout');
                            alert('medicine-checkout');
                        }}
                    >
                        Print Medicine Checkout
                    </Button>
                </Row>


                <Row style={{height: "475px", overflowY: "scroll"}} className="mt-2">
                    <Table
                        striped
                        bordered
                        hover
                        size="sm"
                    >
                        <thead>
                        <tr>
                            <th></th>
                            {/* Edit */}
                            <th></th>
                            {/* Checkout */}
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
                            {/* Delete */}
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
                                onCheckout={(e, r) => handleCheckoutClicked(e, r)}
                            />
                        )}
                        </tbody>
                    </Table>
                </Row>

                {checkoutList && checkoutList.length > 0 &&
                <Row style={{height: "220px", overflowY: "scroll"}} className="mt-2">
                    <DrugLogGrid
                        onEdit={(e, r) => {
                            if (r) {
                                setShowCheckoutModal(r);
                            }
                        }}
                        medicineList={medicineList}
                        includeCheckout={true}
                        drugLog={checkoutList}
                        columns={['Drug', 'Created', 'Updated', 'Notes', 'Out', 'In']}
                    />
                </Row>
                }


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

            <DrugLogEdit
                drugName={getDrugName(typeof showCheckoutModal !== "boolean" ?
                    showCheckoutModal?.MedicineId : 0, medicineList)}
                drugLogInfo={showCheckoutModal as DrugLogRecord}
                onClose={(dl) => {
                    setShowCheckoutModal(false);
                    setDrugLog({action: "update", payload: dl});
                    console.log('drugLogRecord', dl);
                }}
                onHide={() => setShowCheckoutModal(false)}
                show={showCheckoutModal !== false}
            />

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
        </Form>
    );
}

export default ManageDrugPage;
