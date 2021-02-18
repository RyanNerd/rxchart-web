import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Confirm from "./Modals/Confirm";
import DrugLogEdit from "./Modals/DrugLogEdit";
import DrugLogGrid from "./Grids/DrugLogGrid";
import Form from 'react-bootstrap/Form';
import LastTakenButton from "../Buttons/LastTakenButton";
import LogButtons from "../Buttons/LogButtons";
import MedicineDetail from "./Grids/MedicineDetail";
import MedicineEdit from "./Modals/MedicineEdit";
import React, {useEffect, useGlobal, useRef, useState} from 'reactn';
import Row from 'react-bootstrap/Row';
import ShadowBox from "../Buttons/ShadowBox";
import TabContent from "../../styles/common.css";
import Table from "react-bootstrap/Table";
import {Alert, ListGroup} from "react-bootstrap";
import {calculateLastTaken, getDrugName, getFormattedDate, getLastTakenVariant} from "../../utility/common";
import {drawBarcode} from "../../utility/drawBarcode";
import {DrugLogRecord, MedicineRecord, newDrugInfo} from "../../types/RecordTypes";

/**
 * OtcPage
 * UI for logging OTC medications
 * @returns {JSX.Element | null}
 */
const OtcPage = (): JSX.Element | null => {
    const [, setDrugLog] = useGlobal('drugLog');
    const [, setOtcMedicine] = useGlobal('otcMedicine');
    const [activeDrug, setActiveDrug] = useState<MedicineRecord | null>(null);
    const [activeResident] = useGlobal('activeResident');
    const [activeTabKey] = useGlobal('activeTabKey');
    const [drugInfo, setDrugInfo] = useState<MedicineRecord | null>(null);
    const [drugLogInfo, setDrugLogInfo] = useState<DrugLogRecord | null>(null);
    const [drugLogList] = useGlobal('drugLogList');
    const [otcList] = useGlobal('otcList');
    const [filteredOtcList, setFilteredOtcList] = useState(otcList);
    const [lastTaken, setLastTaken] = useState<number | null>(null);
    const [otcLogList, setOtcLogList] = useState<DrugLogRecord[]>([]);
    const [residentId, setResidentId] = useState(activeResident && activeResident.Id);
    const [searchIsValid, setSearchIsValid] = useState<boolean | null>(null);
    const [searchText, setSearchText] = useState('');
    const [showDeleteDrugLogRecord, setShowDeleteDrugLogRecord] = useState<DrugLogRecord | null>(null);
    const [showDrugLog, setShowDrugLog] = useState(false);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);
    const barCode = activeDrug?.Barcode || null;
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

    // Filter the otcList by the search textbox value
    useEffect(() => {
        if (searchText.length > 0) {
            const filter = otcList.filter((medicineRecord) => {
                const drug = medicineRecord.Drug.toLowerCase();
                const barcode = medicineRecord.Barcode ? medicineRecord.Barcode.toLowerCase() : '';
                const search = searchText.toLowerCase();
                return drug.includes(search) || barcode.includes(search);
            })

            if (filter && filter.length > 0) {
                setSearchIsValid(true);
                setFilteredOtcList(filter);
            } else {
                setSearchIsValid(false);
                setFilteredOtcList([]);
            }
        } else {
            setSearchIsValid(false);
            setFilteredOtcList(otcList);
        }
    }, [otcList, searchText])

    // Update the barcode image if the barcode has changed
    useEffect(() => {
        // Only try to create a barcode canvas IF there is actually a barcode value.
        if (barCode) {
            drawBarcode(barCode, 'otc-barcode');
        }
    }, [barCode]);

    // If there isn't an activeResident or this tab isn't active then don't render
    if (!residentId || activeTabKey !== 'otc') {
        return null;
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
                Notes: notes,
                In: null,
                Out: null
            };
            setDrugLog({action: 'update', payload: drugLogInfo});
        }
    }

    const lastTakenVariant = lastTaken && lastTaken >= 8 ? 'primary' : getLastTakenVariant(lastTaken);

    return (
        <Form>
            <Form.Group className={TabContent} as={Row}>
                <Col>
                    <Form.Group controlId="otc-buttons">
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

                    <Form.Group as={Row}>
                        <Form.Control
                            id="otc-page-search-text"
                            style={{width: "220px"}}
                            type="search"
                            isValid={searchIsValid || false}
                            value={searchText}
                            onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                }
                            }}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Search OTC medicine"
                            ref={focusRef}
                        />
                        {activeDrug &&
                        <h3 className="ml-4">
                            <b>{activeDrug.Drug}</b>
                        </h3>}
                    </Form.Group>
                </Col>

                {activeDrug &&
                <>
                    <Col sm="8">
                        <span style={{textAlign: "center"}}> <h2>OTC Drug History</h2> </span>

                        <LogButtons
                            onLogAmount={(n) => handleLogDrugAmount(n)}
                            lastTaken={lastTaken}
                            lastTakenVariant={lastTakenVariant}
                            drugName={activeDrug.Drug}
                        />
                        <span className="ml-2">
                        <LastTakenButton
                            lastTaken={lastTaken}
                        />
                        </span>
                    </Col>

                    <Row>
                        <Col sm="4">
                            <ListGroup>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <LogButtons
                                            onLogAmount={(n) => handleLogDrugAmount(n)}
                                            lastTaken={lastTaken}
                                            lastTakenVariant={lastTakenVariant}
                                            drugName={activeDrug.Drug}
                                        />
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup.Item>
                                    <div style={{height: "325px", overflow: "auto"}}>
                                        <Table
                                            striped
                                            bordered
                                            hover
                                            size="sm"
                                        >
                                            <thead>
                                            <tr>
                                                <th/>
                                                <th>
                                                    Drug
                                                </th>
                                                <th>
                                                    Strength
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {filteredOtcList.map((drug: MedicineRecord) =>
                                                <MedicineDetail
                                                    drug={drug}
                                                    columns={[
                                                        'Drug',
                                                        'Strength'
                                                    ]}
                                                    key={'otc' + drug.Id}
                                                    onSelect={(e, d) => {
                                                        setActiveDrug(d);
                                                    }}
                                                    activeDrug={activeDrug}
                                                />)
                                            }
                                            </tbody>
                                        </Table>
                                    </div>
                                </ListGroup.Item>

                                {activeDrug.Directions &&
                                <ListGroup.Item>
                                    <ShadowBox>
                                        <b>
                                            Directions:
                                        </b>
                                        <span> {activeDrug.Directions}</span>
                                    </ShadowBox>
                                </ListGroup.Item>
                                }

                                {activeDrug.Barcode &&
                                <ListGroup.Item>
                                    <canvas id="otc-barcode"/>
                                </ListGroup.Item>
                                }
                            </ListGroup>
                        </Col>

                        <Col sm="8">
                            <DrugLogGrid
                                columns={['Drug', 'Created', 'Updated', 'Notes']}
                                drugLog={otcLogList || []}
                                medicineList={otcList}
                                onEdit={(e, r) => {
                                    e.preventDefault();
                                    setDrugLogInfo(r);
                                    setShowDrugLog(true);
                                }}
                                onDelete={(e, r) => {
                                    e.preventDefault();
                                    setShowDeleteDrugLogRecord(r);
                                }}
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
                    setOtcMedicine({action: 'update', payload: r});
                }}
                drugInfo={drugInfo}
            />
            }

            {drugLogInfo &&
            <DrugLogEdit
                show={showDrugLog}
                drugLogInfo={drugLogInfo}
                onHide={() => setShowDrugLog(!showDrugLog)}
                onClose={(drugLogRecord) => {
                    setShowDrugLog(false);
                    setDrugLog({action: 'update', payload: drugLogRecord});
                }}
            />
            }

            {showDeleteDrugLogRecord &&
            <Confirm.Modal
                size='lg'
                show={typeof showDeleteDrugLogRecord === 'object'}
                buttonvariant="danger"
                onSelect={(a) => {
                    setShowDeleteDrugLogRecord(null);
                    setDrugLog(a ? {action: 'delete', payload: showDeleteDrugLogRecord?.Id as number} : null);
                }}
            >
                <Confirm.Header>
                    <Confirm.Title>
                        Delete {getDrugName(showDeleteDrugLogRecord.MedicineId, otcList)} Log Record
                    </Confirm.Title>
                </Confirm.Header>
                <Confirm.Body>
                    {showDeleteDrugLogRecord && showDeleteDrugLogRecord.Updated &&
                    <Alert variant="secondary">
                        Date: {getFormattedDate(showDeleteDrugLogRecord.Updated)}
                    </Alert>
                    }
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
