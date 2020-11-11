import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Confirm from "../Modals/Confirm";
import DrugLogEdit from "../Modals/DrugLogEdit";
import DrugLogGrid from "../Grids/DrugLogGrid";
import Form from 'react-bootstrap/Form';
import LastTakenButton from "../Buttons/LastTakenButton";
import MedicineEdit from "../Modals/MedicineEdit";
import MedicineListGroup from "../ListGroups/MedicineListGroup";
import React, {useEffect, useGlobal, useRef, useState} from 'reactn';
import Row from 'react-bootstrap/Row';
import TabContent from "../../styles/common.css";
import {Alert} from "react-bootstrap";
import {DrugLogRecord, MedicineRecord, newDrugInfo} from "../../types/RecordTypes";
import {
    calculateLastTaken, getDrugName,
    getFormattedDate,
    getLastTakenVariant,
    isSearchValid,
    searchDrugs
} from "../../utility/common";

/**
 * OtcPage
 * UI for logging OTC medications
 * @returns {JSX.Element | null}
 */
const OtcPage = (): JSX.Element | null => {
    const [, setDeleteDrugLog] = useGlobal('deleteDrugLog');
    const [, setUpdateDrugLog] = useGlobal('updateDrugLog');
    const [, setUpdateOtcMedicine] = useGlobal('updateOtcMedicine');
    const [activeDrug, setActiveDrug] = useState<MedicineRecord | null>(null);
    const [activeResident] = useGlobal('activeResident');
    const [activeTabKey] = useGlobal('activeTabKey');
    const [drugInfo, setDrugInfo] = useState<MedicineRecord | null>(null);
    const [drugLogInfo, setDrugLogInfo] = useState<DrugLogRecord | null>(null);
    const [drugLogList] = useGlobal('drugLogList');
    const [lastTaken, setLastTaken] = useState<number | null>(null);
    const [otcList] = useGlobal('otcList');
    const [otcLogList, setOtcLogList] = useState<DrugLogRecord[]>([]);
    const [residentId, setResidentId] = useState(activeResident && activeResident.Id);
    const [searchIsValid, setSearchIsValid] = useState<boolean | null>(null);
    const [searchText, setSearchText] = useState('');
    const [showDeleteDrugLogRecord, setShowDeleteDrugLogRecord] = useState<any>(false);
    const [showDrugLog, setShowDrugLog] = useState(false);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);
    const focusRef = useRef<HTMLInputElement>(null);

    // We only want to list the OTC drugs on this page that the resident has taken.
    useEffect(() => {
        // @link https://stackoverflow.com/questions/31005396/filter-array-of-objects-with-another-array-of-objects
        const otc = (otcList.length > 0) && drugLogList ? drugLogList.filter((drug: DrugLogRecord) => {
            return otcList.some((m) => {
                return m.Id === drug?.MedicineId;
            });
        }) : [];
        setOtcLogList(otc);
    }, [drugLogList, otcList])

    // Set focus to the search input when this page is selected.
    useEffect(() => {
        if (activeTabKey === 'otc' && focusRef && focusRef.current) {
            focusRef.current.focus();
        }
    }, [activeTabKey]);

    // Set the active drug when the otcList changes.
    useEffect(() => {
        if (otcList.length > 0) {
            setActiveDrug(otcList[0]);
        } else {
            setActiveDrug(null);
        }
        setResidentId(activeResident && activeResident.Id);
    }, [otcList, activeResident]);

    // Calculate how many hours it has been since the activeDrug was taken and set showLastTakenWarning value
    useEffect(() => {
        if (activeDrug && activeDrug.Id) {
            setLastTaken(calculateLastTaken(activeDrug.Id, drugLogList));
        } else {
            setLastTaken(null);
        }
    }, [activeDrug, drugLogList]);

    // Handle if the search text has a match in the otcList.
    useEffect(() => {
        if (otcList.length > 0) {
            const drugMatch = searchDrugs(searchText, otcList);
            if (drugMatch) {
                setActiveDrug(drugMatch);
            }
        }
    }, [searchText, otcList]);

    // Show or hide the valid search icon
    useEffect(() => {
        if (activeDrug) {
            setSearchIsValid(isSearchValid(searchText, activeDrug));
        }
    }, [activeDrug, searchText]);

    // Reset the search text input when the resident changes.
    useEffect(() => {
        setSearchText('');
    }, [activeResident]);

    // If there isn't an activeResident or this tab isn't active then don't render
    if (!residentId || activeTabKey !== 'otc') {
        return null;
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Fires when user clicks on +Log or the drug log edit button
     * @param {React.MouseEvent<HTMLElement>} e
     * @param {DrugLogRecord} drugLogInfo
     */
    const addEditDrugLog = (e: React.MouseEvent<HTMLElement>, drugLogInfo?: DrugLogRecord) => {
        e.preventDefault();
        const drugLogRecord = drugLogInfo ? {...drugLogInfo} : {
            Id: null,
            ResidentId: residentId,
            MedicineId: activeDrug?.Id,
            Notes: ""
        } as DrugLogRecord;
        setDrugLogInfo(drugLogRecord);
        setShowDrugLog(true);
    }

    /**
     * Fires when the Log 1 or Log 2 buttons are clicked.
     * @param {number} amount
     */
    const handleLogDrugAmount = (amount: number) => {
        const drugId = activeDrug?.Id as number;
        if (drugId) {
            const notes = amount.toString();
            const drugLogInfo = {
                Id: null,
                ResidentId: residentId,
                MedicineId: drugId,
                Notes: notes
            };
            setUpdateDrugLog(drugLogInfo);
        }
    }

    const lastTakenVariant = lastTaken && lastTaken >= 8 ? 'primary' : getLastTakenVariant(lastTaken);
    const shortenedDrugName = activeDrug?.Drug.substring(0, 21);

    return (
        <Form>
            <Form.Group className={TabContent} as={Row}>
                <Form.Group as={Col} controlId="otc-buttons">
                    <Form.Group as={Row} sm="8">
                        <Button
                            className="mr-1"
                            size="sm"
                            variant="info"
                            onClick={(e) => {
                                e.preventDefault();
                                setDrugInfo({...newDrugInfo, OTC: true});
                                setShowMedicineEdit(true);
                            }}
                        >
                            + OTC
                        </Button>

                        {activeDrug &&
                            <Button
                                size="sm"
                                variant="info"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setDrugInfo({...activeDrug} as MedicineRecord);
                                    setShowMedicineEdit(true);

                                }}
                            >
                                Edit <b>{activeDrug.Drug}</b>
                            </Button>
                        }
                    </Form.Group>

                    {otcList.length > 0 &&
                        <Form.Group as={Row}>
                            <Form.Control
                                style={{width: "220px"}}
                                isValid={searchIsValid || false}
                                type="search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search OTC"
                                ref={focusRef}
                            />

                            {activeDrug &&
                            <h3 className="ml-4"><b>{shortenedDrugName}</b></h3>
                            }
                        </Form.Group>
                    }
                </Form.Group>

                {activeDrug &&
                    <>
                        <Col sm="8">
                            <span style={{textAlign: "center"}}> <h2>OTC Drug History</h2> </span>
                            <Button
                                disabled={lastTaken === 0}
                                variant={"outline-" + lastTakenVariant}
                                className="mr-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogDrugAmount(1);
                                }}
                            >
                                Log 1 {activeDrug.Drug.substr(0,25)}
                            </Button>

                            <Button
                                disabled={lastTaken === 0}
                                className="mr-2"
                                variant={"outline-" + lastTakenVariant}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogDrugAmount(2);
                                }}
                            >
                                Log 2
                            </Button>

                            <Button
                                disabled={lastTaken === 0}
                                className="mr-2"
                                variant={"outline-" + lastTakenVariant}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogDrugAmount(3);
                                }}
                            >
                                Log 3
                            </Button>

                            <Button
                                disabled={lastTaken === 0}
                                className="mr-2"
                                variant={"outline-" + lastTakenVariant}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogDrugAmount(4);
                                }}
                            >
                                Log 4
                            </Button>

                            <LastTakenButton
                                lastTaken={lastTaken}
                            />
                        </Col>

                        <Row>
                            <Col sm="4">
                                <MedicineListGroup
                                    lastTaken={lastTaken}
                                    medicineList={otcList}
                                    activeDrug={activeDrug}
                                    drugChanged={(drug: MedicineRecord) => setActiveDrug(drug)}
                                    addDrugLog={(e: React.MouseEvent<HTMLElement>) => addEditDrugLog(e)}
                                    logDrug={(amount: number) => handleLogDrugAmount(amount)}
                                    canvasId={"otc-barcode"}
                                />
                            </Col>

                            <Col sm="8">
                                <DrugLogGrid
                                    columns={['Drug', 'Created', 'Updated', 'Amount']}
                                    drugLog={otcLogList || []}
                                    otcList={otcList}
                                    onEdit={(e, r) => addEditDrugLog(e, r)}
                                    onDelete={(e, r) =>setShowDeleteDrugLogRecord(r)}
                                />
                            </Col>
                        </Row>
                    </>
                }
            </Form.Group>

            {/* MedicineEdit Modal*/}
            {drugInfo &&
                <MedicineEdit
                    show={showMedicineEdit}
                    onClose={(r) => {
                        setShowMedicineEdit(false);
                        setUpdateOtcMedicine(r);
                    }}
                    drugInfo={drugInfo}
                    otc={true}
                />
            }

            {drugLogInfo &&
                <DrugLogEdit
                    show={showDrugLog}
                    drugLogInfo={drugLogInfo}
                    onHide={() => setShowDrugLog(!showDrugLog)}
                    onClose={(drugLogRecord) => {
                        setShowDrugLog(false);
                        setUpdateDrugLog(drugLogRecord);
                    }}
                />
            }

            {showDeleteDrugLogRecord &&
                <Confirm.Modal
                    size='lg'
                    show={typeof showDeleteDrugLogRecord === 'object'}
                    buttonvariant="danger"
                    onSelect={(a) => {
                        setShowDeleteDrugLogRecord(false);
                        setDeleteDrugLog(a ? showDeleteDrugLogRecord.Id : null);
                    }}
                >
                    <Confirm.Header>
                        <Confirm.Title>
                            Delete {getDrugName(showDeleteDrugLogRecord.MedicineId, otcList)} Log Record
                        </Confirm.Title>
                    </Confirm.Header>
                    <Confirm.Body>
                        <Alert variant="secondary">
                            Date: {getFormattedDate(showDeleteDrugLogRecord.Updated)}
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

export default OtcPage;
