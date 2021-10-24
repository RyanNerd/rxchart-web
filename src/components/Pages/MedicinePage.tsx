import MedDrugLogHistory from 'components/Pages/Grids/MedDrugLogHistory';
import CheckoutListGroup from 'components/Pages/ListGroups/CheckoutListGroup';
import {IDropdownItem} from 'components/Pages/ListGroups/MedDropdown';
import DrugLogToast from 'components/Pages/Toasts/DrugLogToast';
import {SetStateAction} from 'react';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import ToggleButton from 'react-bootstrap/ToggleButton';
import React, {useEffect, useGlobal, useState} from 'reactn';
import {DrugLogRecord, MedicineRecord, newDrugLogRecord, PillboxRecord, ResidentRecord} from 'types/RecordTypes';
import {
    calculateLastTaken,
    getCheckoutList,
    getDrugName,
    getFormattedDate,
    getMedicineRecord,
    isToday,
    multiSort,
    SortDirection
} from 'utility/common';
import TabContent from '../../styles/common.css';
import LastTakenButton from './Buttons/LastTakenButton';
import DrugLogGrid from './Grids/DrugLogGrid';
import PillboxCard from './Grids/PillboxCard';
import MedListGroup from './ListGroups/MedListGroup';
import OtcListGroup from './ListGroups/OtcListGroup';
import PillboxListGroup from './ListGroups/PillboxListGroup';
import Confirm from './Modals/Confirm';
import DrugLogEdit from './Modals/DrugLogEdit';
import MedicineEdit from './Modals/MedicineEdit';

export type TPillboxMedLog = {
    Active: boolean;
    Drug: string | undefined;
    Strength: string | null | undefined;
    Quantity: number;
    Notes: string | null;
    Updated: Date | null | undefined;
    PillboxItemId?: number | null;
    PillboxId?: number | null;
};

// Display states
enum DISPLAY_TYPE {
    Medicine = 'med',
    OTC = 'otc',
    Pillbox = 'pillbox',
    History = 'history',
    Print = 'print'
}

interface IProps {
    activeResident: ResidentRecord | null;
    activeTabKey: string;
}

/**
 * MedicinePage - UI for logging prescription medications
 * @param {IProps} props The props for this component
 * @returns {JSX.Element | null}
 */
const MedicinePage = (props: IProps): JSX.Element | null => {
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [activeClient, setActiveClient] = useState(props.activeResident);
    const [activeMed, setActiveMed] = useState<MedicineRecord | null>(null);
    const [activeOtc, setActiveOtc] = useState<MedicineRecord | null>(null);
    const [activePillbox, setActivePillbox] = useState<PillboxRecord | null>(null);
    const [activeTabKey, setActiveTabKey] = useState(props.activeTabKey);
    const [checkoutList, setCheckoutList] = useState<DrugLogRecord[]>([]);
    const [clientId, setClientId] = useState<number | null>(activeClient?.Id || null);
    const [displayType, setDisplayType] = useState<DISPLAY_TYPE>(DISPLAY_TYPE.Medicine);
    const [drugLogList, setDrugLogList] = useGlobal('drugLogList');
    const [globalMedicineList, setGlobalMedicineList] = useGlobal('medicineList');
    const [isBusy, setIsBusy] = useState(false);
    const [medicineList, setMedicineList] = useState<MedicineRecord[] | null>(null);
    const [mm] = useGlobal('medicineManager');
    const [otcList, setOtcList] = useGlobal('otcList');
    const [otcLogList, setOtcLogList] = useState<DrugLogRecord[]>([]);
    const [pillboxMedLogList, setPillboxMedLogList] = useState<TPillboxMedLog[]>([]);
    const [pillboxItemList, setPillboxItemList] = useGlobal('pillboxItemList');
    const [pillboxList, setPillboxList] = useGlobal('pillboxList');
    const [showDeleteDrugLogRecord, setShowDeleteDrugLogRecord] = useState<DrugLogRecord | null>(null);
    const [showDrugLog, setShowDrugLog] = useState<DrugLogRecord | null>(null);
    const [showMedicineEdit, setShowMedicineEdit] = useState<MedicineRecord | null>(null);
    const [toast, setToast] = useState<null | DrugLogRecord[]>(null);

    // Refresh activeClient when the activeResident global changes.
    useEffect(() => {
        if (props.activeResident) {
            setActiveClient(props.activeResident);
            setClientId(props.activeResident?.Id ? props.activeResident.Id : null);
        }
    }, [props.activeResident]);

    // activeTabKey refresh from prop
    useEffect(() => {
        setActiveTabKey(props.activeTabKey);
    }, [props.activeTabKey]);

    // Update the otcLogList when the drugLogList is changed.
    useEffect(() => {
        // We only want to list the OTC drugs on this page that the resident has taken.
        // @link https://stackoverflow.com/questions/31005396/filter-array-of-objects-with-another-array-of-objects
        setOtcLogList(
            drugLogList.filter((drug: DrugLogRecord) => {
                return otcList.some((m) => {
                    return m.Id === drug?.MedicineId;
                });
            })
        );
    }, [drugLogList, otcList]);

    // Refresh of medicineList from globalMedicineList;
    useEffect(() => {
        setMedicineList(globalMedicineList.filter((m) => m.Active));
    }, [globalMedicineList]);

    // Update the checkoutList when drugLogList changes
    useEffect(() => {
        setCheckoutList(getCheckoutList(drugLogList));
    }, [drugLogList]);

    // Set the default activeMed
    useEffect(() => {
        // We are using medicineList === null as an indicator of if the medicine list has changed
        if (medicineList !== null) {
            if (activeMed && medicineList.find((m) => m.Id === activeMed.Id)) {
                // NOP
            } else {
                setActiveMed(medicineList.length > 0 ? medicineList[0] : null);
            }
        }
    }, [medicineList, activeMed, setActiveMed]);

    // Refresh the pillboxDrugLog[]
    useEffect(() => {
        if (activePillbox) {
            const pillboxMedLog = [] as TPillboxMedLog[];
            pillboxItemList.forEach((pbi) => {
                if (pbi.PillboxId === activePillbox.Id && pbi.Quantity) {
                    const pbl = drugLogList.find(
                        (dl) =>
                            dl.PillboxItemId === pbi.Id &&
                            dl.MedicineId === pbi.MedicineId &&
                            dl.Updated &&
                            isToday(dl.Updated)
                    );

                    if (pbl) {
                        const med = globalMedicineList?.find((m) => m.Id === pbl.MedicineId);
                        pillboxMedLog.push({
                            Active: !!med?.Active,
                            Drug: med?.Drug,
                            Strength: med?.Strength,
                            Quantity: pbi.Quantity,
                            Notes: pbl.Notes,
                            PillboxItemId: pbl.PillboxItemId,
                            PillboxId: activePillbox.Id,
                            Updated: pbl.Updated
                        });
                    }
                }
            });

            setPillboxMedLogList(multiSort(pillboxMedLog, {Quantity: SortDirection.asc, Drug: SortDirection.desc}));
        }
    }, [medicineList, pillboxItemList, activePillbox, drugLogList, globalMedicineList, setPillboxMedLogList]);

    // If there isn't an active client, or medicineList isn't populated, or this isn't the active tab then do not render
    if (!clientId || !medicineList || activeTabKey !== 'medicine') return null;

    /**
     * Given a MedicineRecord Update or Insert the record and rehydrate the globalMedicineList
     * @param {MedicineRecord} med Medicine record object
     */
    const saveMedicine = async (med: MedicineRecord) => {
        const m = await mm.updateMedicine(med);

        // If the updated record is OTC we need to refresh the otcList as well.
        if (m.OTC) {
            // Rehydrate the global otcList
            const ol = await mm.loadOtcList();
            await setOtcList(ol);
            setActiveOtc(m);
        } else {
            // Rehydrate the global medicineList
            const ml = await mm.loadMedicineList(clientId);
            await setGlobalMedicineList(ml);
            setActiveMed(m);
        }
    };

    /**
     * Given a DrugLogRecord Update or Insert the record and rehydrate the drugLogList
     * @param {DrugLogRecord} drugLog Druglog record object
     */
    const saveDrugLog = async (drugLog: DrugLogRecord): Promise<DrugLogRecord> => {
        await setIsBusy(true);
        const r = await mm.updateDrugLog(drugLog);
        // Rehydrate the drugLogList
        const drugs = await mm.loadDrugLog(clientId, 5);
        await setDrugLogList(drugs);
        await setIsBusy(false);
        return r;
    };

    /**
     * Add or update a pillbox record.
     * @param {PillboxRecord} pillbox Pillbox record object
     */
    const savePillbox = async (pillbox: PillboxRecord) => {
        const pb = await mm.updatePillbox(pillbox);
        if (pb) {
            const pbl = await mm.loadPillboxList(clientId);
            await setPillboxList(pbl);
            await setActivePillbox(pb);
        }
    };

    /**
     * Delete an existing pillbox.
     * @param {number} pillboxId The PK for the Pillbox table
     */
    const deletePillbox = async (pillboxId: number) => {
        const d = await mm.deletePillbox(pillboxId);
        if (d) {
            const pbl = await mm.loadPillboxList(clientId);
            await setPillboxList(pbl);
            await setActivePillbox(pbl.length > 0 ? pbl[0] : null);
        }
    };

    /**
     * Fires when user clicks on +Log or the drug log edit button
     * @param {DrugLogRecord} drugLogInfo The drugLog record object
     */
    const addEditDrugLog = (drugLogInfo?: DrugLogRecord) => {
        const drugLogRecord = drugLogInfo
            ? {...drugLogInfo}
            : ({
                  Id: null,
                  ResidentId: clientId,
                  MedicineId: activeMed?.Id,
                  Notes: ''
              } as DrugLogRecord);
        setShowDrugLog(drugLogRecord);
    };

    /**
     * Fires when user clicks on +Log or the drug log edit button for OTC drugs
     * @param {DrugLogRecord} drugLogInfo The drugLog record object
     */
    const addEditOtcLog = (drugLogInfo?: DrugLogRecord) => {
        const drugLogRecord = drugLogInfo
            ? {...drugLogInfo}
            : ({
                  Id: null,
                  ResidentId: clientId,
                  MedicineId: activeOtc?.Id,
                  Notes: ''
              } as DrugLogRecord);
        setShowDrugLog(drugLogRecord);
    };

    /**
     * Fires when the Log 1...4 buttons are clicked.
     * @param {number} amount The number of pills (medication) taken
     */
    const handleLogDrugAmount = (amount: number) => {
        const drugLogInfo = {...newDrugLogRecord};
        drugLogInfo.ResidentId = clientId;
        drugLogInfo.MedicineId = activeMed?.Id as number;
        drugLogInfo.Notes = amount.toString();
        saveDrugLog(drugLogInfo).then((r) => setToast([r]));
    };

    /**
     * Fires when the Log 1 or Log 2, etc. buttons are clicked for OTC drugs
     * @param {number} amount The number of pills (medication) taken
     */
    const handleLogOtcDrugAmount = (amount: number) => {
        const drugId = activeOtc?.Id as number;
        if (drugId) {
            const drugLogInfo = {...newDrugLogRecord};
            drugLogInfo.ResidentId = clientId;
            drugLogInfo.MedicineId = drugId;
            drugLogInfo.Notes = amount.toString();
            saveDrugLog(drugLogInfo).then((r) => setToast([r]));
        }
    };

    /**
     * Convenience function to get drug name
     * @param {number} medicineId The PK of the Medicine table
     * @returns {string | undefined}
     */
    const drugName = (medicineId: number): string | undefined => {
        return getDrugName(medicineId, medicineList.concat(otcList));
    };

    /**
     * Handle when the user clicks on Log Pillbox
     */
    const handleLogPillbox = () => {
        /**
         * Log all the pillbox items, refresh the drugLogList, and toast the logged drugs
         * @param {number} pillboxId The PK of the Pillbox table
         */
        const logPillbox = async (pillboxId: number) => {
            const toastQ = [] as DrugLogRecord[];

            // Log drugs in the pillbox
            const loggedPillboxDrugs = await mm.logPillbox(pillboxId);

            // If there are any logged Pillbox drugs then refresh the drugLogList global and toast the success.
            if (loggedPillboxDrugs.length > 0) {
                const drugLogs = await mm.loadDrugLog(clientId, 5);
                await setDrugLogList(drugLogs);
                loggedPillboxDrugs.forEach((ld) => toastQ.push(ld));
                setToast(toastQ);
            }
        };

        // Tell the UI that we're busy. Then log the pillbox contents and when done tell the UI we're no longer busy.
        setIsBusy(true);
        logPillbox(activePillbox?.Id as number).then(() => setIsBusy(false));
    };

    /**
     * Handle when the user has clicked on a pill
     * @param {number} n The PK of the Pillbox table
     */
    const handleOnPillClick = (n: number) => {
        const pb = pillboxList.find((p) => p.Id === n);
        if (pb) {
            setActivePillbox(pb);
            setDisplayType(DISPLAY_TYPE.Pillbox);
        }
    };

    /**
     * Builds and returns the dropdown items for the Medicine dropdown
     * @returns {IDropdownItem[]}
     */
    const buildItemList = () => {
        const itemList = [] as IDropdownItem[];

        // Build the itemList with any pillboxes and meds from medicineList
        let pbCnt = 0;
        pillboxList.forEach((p) => {
            const pbItems = pillboxItemList.filter((pbi) => pbi.PillboxId === p.Id);
            const loggedPillboxItems = drugLogList.filter(
                (d) => d.Updated && isToday(d.Updated) && pbItems.find((pbi) => pbi.Id === d.PillboxItemId)
            );

            if (loggedPillboxItems.length === 0) {
                itemList.push({
                    id: -(p.Id as number),
                    description: p.Name.toUpperCase(),
                    subtext: null
                }); // Pillbox have negative id
                pbCnt++;
            }
        });
        if (pbCnt > 0) {
            itemList.push({id: 0, description: 'divider', subtext: null});
        }
        medicineList.forEach((m) => {
            const strength = m.Strength || '';
            const other = m.OtherNames?.length > 0 ? `(${m.OtherNames})` : null;
            const description = m.Drug + ' ' + strength;
            itemList.push({
                id: m.Id as number,
                description,
                subtext: other
            });
        });
        return itemList;
    };

    return (
        <>
            <Row className={TabContent} noGutters>
                <ListGroup as={Col}>
                    <ListGroup.Item
                        style={{
                            paddingTop: '0.45rem',
                            paddingRight: '1.25rem',
                            paddingBottom: 0,
                            paddingLeft: '1.25rem'
                        }}
                    >
                        <ToggleButton
                            className="d-print-none"
                            key="med-list-group-med-btn"
                            id="med-list-group-med-radio-btn"
                            type="radio"
                            size="sm"
                            variant="outline-success"
                            name="radio-med-list-group"
                            value={DISPLAY_TYPE.Medicine}
                            checked={displayType === DISPLAY_TYPE.Medicine}
                            onChange={() => setDisplayType(DISPLAY_TYPE.Medicine)}
                        >
                            <span className="ml-2">Medicine</span>
                        </ToggleButton>

                        <ToggleButton
                            key="med-list-group-otc-btn"
                            id="med-list-group-otc-radio-btn"
                            className="ml-2 d-print-none"
                            disabled={otcList?.length === 0}
                            type="radio"
                            size="sm"
                            variant="outline-success"
                            name="radio-med-list-group"
                            value={DISPLAY_TYPE.OTC}
                            checked={displayType === DISPLAY_TYPE.OTC}
                            onChange={() => setDisplayType(DISPLAY_TYPE.OTC)}
                        >
                            <span className="ml-2">OTC</span>
                        </ToggleButton>

                        <ToggleButton
                            key="med-list-group-history-btn"
                            id="med-list-group-history-radio-btn"
                            className="ml-2 d-print-none"
                            disabled={drugLogList.length === 0}
                            size="sm"
                            type="radio"
                            variant="outline-success"
                            value={DISPLAY_TYPE.History}
                            checked={displayType === DISPLAY_TYPE.History}
                            onChange={() => setDisplayType(DISPLAY_TYPE.History)}
                        >
                            <span className="ml-2">History</span>
                        </ToggleButton>

                        <ToggleButton
                            key="med-list-group-pill-btn"
                            id="med-list-group-pill-radio-btn"
                            className="ml-2 d-print-none"
                            disabled={medicineList.length < 5}
                            size="sm"
                            type="radio"
                            variant="outline-success"
                            name="radio-med-list-group"
                            value={DISPLAY_TYPE.Pillbox}
                            checked={displayType === DISPLAY_TYPE.Pillbox}
                            onChange={() => setDisplayType(DISPLAY_TYPE.Pillbox)}
                        >
                            <span className="ml-2">Pillbox</span>
                        </ToggleButton>

                        <ToggleButton
                            key="med-list-group-print-btn"
                            id="med-list-group-print-radio-btn"
                            className="ml-2 d-print-none"
                            size="sm"
                            type="radio"
                            disabled={checkoutList.length === 0}
                            variant="outline-success"
                            name="radio-print-list-group"
                            value={DISPLAY_TYPE.Print}
                            checked={displayType === DISPLAY_TYPE.Print}
                            onChange={() => setDisplayType(DISPLAY_TYPE.Print)}
                        >
                            <span className="ml-2">
                                Print Med Checkout{' '}
                                {checkoutList.length > 0 && <Badge variant="secondary">{checkoutList.length}</Badge>}
                            </span>
                        </ToggleButton>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        {displayType === DISPLAY_TYPE.Medicine && (
                            <MedListGroup
                                disabled={isBusy}
                                activeMed={activeMed}
                                addDrugLog={() => addEditDrugLog()}
                                clientId={clientId}
                                editMedicine={(m) => setShowMedicineEdit(m)}
                                canvasId="med-barcode"
                                itemChanged={(id) => {
                                    if (id < 0) {
                                        setActivePillbox(pillboxList.find((p) => p.Id === Math.abs(id)) || null);
                                        setDisplayType(DISPLAY_TYPE.Pillbox);
                                    } else {
                                        setActiveMed(medicineList.find((m) => m.Id === id) || null);
                                    }
                                }}
                                itemList={buildItemList()}
                                lastTaken={activeMed?.Id ? calculateLastTaken(activeMed.Id, drugLogList) : null}
                                logDrug={(n) => handleLogDrugAmount(n)}
                            />
                        )}

                        {displayType === DISPLAY_TYPE.OTC && (
                            <OtcListGroup
                                disabled={otcList.length === 0 || isBusy}
                                editOtcMedicine={(r) => setShowMedicineEdit(r)}
                                activeOtc={activeOtc}
                                drugLogList={drugLogList}
                                logOtcDrugAmount={(n) => handleLogOtcDrugAmount(n)}
                                logOtcDrug={() => addEditOtcLog()}
                                otcList={otcList}
                                otcSelected={(d) => setActiveOtc(d)}
                            />
                        )}

                        {displayType === DISPLAY_TYPE.Pillbox && (
                            <PillboxListGroup
                                activePillbox={activePillbox}
                                disabled={isBusy}
                                onSelect={(id) => setActivePillbox(pillboxList.find((pb) => pb.Id === id) || null)}
                                onEdit={(r) => savePillbox(r)}
                                onDelete={(id) => deletePillbox(id)}
                                logPillbox={() => handleLogPillbox()}
                                gridLists={{
                                    medicineList: globalMedicineList,
                                    pillboxList,
                                    pillboxItemList,
                                    drugLogList
                                }}
                                pillboxMedLogList={pillboxMedLogList}
                            />
                        )}

                        {displayType === DISPLAY_TYPE.History && activeClient && (
                            <ListGroup className="d-print-flex">
                                <ListGroup.Item>
                                    <MedDrugLogHistory
                                        activeClient={activeClient}
                                        gridLists={{
                                            drugLogList,
                                            pillboxList,
                                            pillboxItemList,
                                            medicineList: globalMedicineList.concat(otcList)
                                        }}
                                        onPillClick={(n) => handleOnPillClick(n)}
                                        onEdit={(d: DrugLogRecord | undefined) => addEditDrugLog(d)}
                                        onDelete={(d: SetStateAction<DrugLogRecord | null>) =>
                                            setShowDeleteDrugLogRecord(d)
                                        }
                                    />
                                </ListGroup.Item>
                            </ListGroup>
                        )}

                        {displayType === DISPLAY_TYPE.Print && activeClient && (
                            <CheckoutListGroup
                                checkoutList={checkoutList}
                                medicineList={medicineList}
                                activeClient={activeClient}
                            />
                        )}
                    </ListGroup.Item>
                </ListGroup>

                {displayType !== DISPLAY_TYPE.Print && displayType !== DISPLAY_TYPE.History && (
                    <ListGroup as={Col} className="ml-3">
                        {displayType === DISPLAY_TYPE.Medicine && (
                            <ListGroup.Item style={{textAlign: 'center'}}>
                                <Button
                                    size="lg"
                                    className="hover-underline-animation"
                                    variant="link"
                                    target="_blank"
                                    href={'https://goodrx.com/' + activeMed?.Drug}
                                >
                                    {activeMed?.Drug}
                                </Button>

                                <LastTakenButton
                                    lastTaken={activeMed?.Id ? calculateLastTaken(activeMed.Id, drugLogList) : null}
                                />

                                {activeMed?.Id && (
                                    <DrugLogGrid
                                        drugId={activeMed.Id}
                                        columns={['Taken', 'Notes', 'Out', 'In']}
                                        onPillClick={(n) => handleOnPillClick(n)}
                                        onEdit={(r) => addEditDrugLog(r)}
                                        onDelete={(r) => setShowDeleteDrugLogRecord(r)}
                                        gridLists={{medicineList, drugLogList, pillboxList, pillboxItemList}}
                                    />
                                )}
                            </ListGroup.Item>
                        )}

                        {displayType === DISPLAY_TYPE.OTC && (
                            <ListGroup.Item>
                                <h5 className="mb-2" style={{textAlign: 'center'}}>
                                    OTC History
                                </h5>
                                <DrugLogGrid
                                    gridLists={{
                                        medicineList: otcList,
                                        drugLogList: otcLogList,
                                        pillboxList: undefined,
                                        pillboxItemList: undefined
                                    }}
                                    columns={['Drug', 'Taken', 'Notes']}
                                    onEdit={(r) => addEditOtcLog(r)}
                                    onDelete={(r) => setShowDeleteDrugLogRecord(r)}
                                />
                            </ListGroup.Item>
                        )}

                        {displayType === DISPLAY_TYPE.Pillbox && activePillbox && activePillbox.Id && (
                            <PillboxCard
                                medicineList={medicineList}
                                activePillbox={activePillbox}
                                mm={mm}
                                pillboxItemList={pillboxItemList}
                                setPillboxItemList={setPillboxItemList}
                            />
                        )}
                    </ListGroup>
                )}
            </Row>

            {/* MedicineEdit Modal*/}
            {showMedicineEdit && (
                <MedicineEdit
                    show={true}
                    onClose={(r: MedicineRecord | null) => {
                        setShowMedicineEdit(null);
                        if (r) saveMedicine(r);
                    }}
                    drugInfo={showMedicineEdit}
                />
            )}

            {showDrugLog && (
                <DrugLogEdit
                    otc={getMedicineRecord(showDrugLog.MedicineId, medicineList.concat(otcList))?.OTC || false}
                    drugName={
                        getMedicineRecord(showDrugLog.MedicineId, medicineList.concat(otcList))?.Drug || '[unknown]'
                    }
                    show={true}
                    drugLogInfo={showDrugLog}
                    onHide={() => setShowDrugLog(null)}
                    onClose={(drugLogRecord) => {
                        setShowDrugLog(null);
                        if (drugLogRecord) saveDrugLog(drugLogRecord).then((r) => setToast([r]));
                    }}
                />
            )}

            {/* Confirm Delete of Drug Log*/}
            {showDeleteDrugLogRecord && (
                <Confirm.Modal
                    size="lg"
                    onSelect={(a) => {
                        setShowDeleteDrugLogRecord(null);
                        if (a)
                            mm.deleteDrugLog(showDeleteDrugLogRecord?.Id as number).then((ok) => {
                                if (ok) {
                                    mm.loadDrugLog(clientId, 5).then((drugs) => setDrugLogList(drugs));
                                } else {
                                    setErrorDetails('DrugLog delete failed for Id: ' + showDeleteDrugLogRecord.Id);
                                }
                            });
                    }}
                    show={true}
                    buttonvariant="danger"
                >
                    <Confirm.Header>
                        <Confirm.Title>Delete {drugName(showDeleteDrugLogRecord.MedicineId)} Log Record</Confirm.Title>
                    </Confirm.Header>
                    <Confirm.Body>
                        {showDeleteDrugLogRecord && showDeleteDrugLogRecord.Updated && (
                            <Alert variant="secondary">Date: {getFormattedDate(showDeleteDrugLogRecord.Updated)}</Alert>
                        )}
                        <b style={{color: 'red'}}>Are you sure?</b>
                    </Confirm.Body>
                </Confirm.Modal>
            )}

            <DrugLogToast
                toast={toast as DrugLogRecord[]}
                medicineList={medicineList.concat(otcList)}
                show={toast !== null}
                onClose={() => setToast(null)}
            />
        </>
    );
};

export default MedicinePage;
