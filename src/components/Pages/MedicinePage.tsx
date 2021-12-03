import MedDrugLogHistory from 'components/Pages/Grids/MedDrugLogHistory';
import CheckoutListGroup from 'components/Pages/ListGroups/CheckoutListGroup';
import {IDropdownItem} from 'components/Pages/ListGroups/MedDropdown';
import DeleteDrugLogModal from 'components/Pages/Modals/DeleteDrugLogModal';
import DeleteMedicineModal from 'components/Pages/Modals/DeleteMedicineModal';
import DrugLogToast from 'components/Pages/Toasts/DrugLogToast';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import ToggleButton from 'react-bootstrap/ToggleButton';
import React, {useEffect, useGlobal, useState} from 'reactn';
import {DrugLogRecord, MedicineRecord, newDrugLogRecord, PillboxItemRecord, PillboxRecord} from 'types/RecordTypes';
import {
    asyncWrapper,
    calculateLastTaken,
    clientFullName,
    getCheckoutList,
    getDrugName,
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
import DrugLogEdit from './Modals/DrugLogEdit';
import MedicineEdit from './Modals/MedicineEdit';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

export type TPillboxMedLog = {
    Active: boolean;
    Drug: string | undefined;
    Notes: string | null;
    PillboxId?: number | null;
    PillboxItemId?: number | null;
    Quantity: number;
    Strength: string | null | undefined;
    Updated: Date | null | undefined;
};

// Display states
enum DISPLAY_TYPE {
    History = 'history',
    Medicine = 'med',
    OTC = 'otc',
    Pillbox = 'pillbox',
    Print = 'print'
}

interface IProps {
    activeTabKey: string;
}

/**
 * MedicinePage - UI for logging prescription medications
 * @param {IProps} props The props for this component
 * @returns {JSX.Element | null}
 */
const MedicinePage = (props: IProps): JSX.Element | null => {
    const [activeClient, setActiveClient] = useGlobal('activeClient');
    const [activeMed, setActiveMed] = useState<MedicineRecord | null>(null);
    const [activeOtc, setActiveOtc] = useState<MedicineRecord | null>(null);
    const [activePillbox, setActivePillbox] = useState<PillboxRecord | null>(null);
    const [activeTabKey, setActiveTabKey] = useState(props.activeTabKey);
    const [checkoutList, setCheckoutList] = useState<DrugLogRecord[]>([]);
    const [clientId, setClientId] = useState<number | null>(activeClient?.clientInfo?.Id || null);
    const [displayType, setDisplayType] = useState<DISPLAY_TYPE>(DISPLAY_TYPE.Medicine);
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [isBusy, setIsBusy] = useState(false);
    const [lastTaken, setLastTaken] = useState(
        activeMed?.Id && activeClient?.drugLogList ? calculateLastTaken(activeMed.Id, activeClient.drugLogList) : null
    );
    const [medItemList, setMedItemList] = useState<IDropdownItem[]>([]);
    const [mm] = useGlobal('medicineManager');
    const [otcList, setOtcList] = useGlobal('otcList');
    const [otcLogList, setOtcLogList] = useState<DrugLogRecord[]>([]);
    const [pillboxMedLogList, setPillboxMedLogList] = useState<TPillboxMedLog[]>([]);
    const [showDeleteDrugLogRecord, setShowDeleteDrugLogRecord] = useState<DrugLogRecord | null>(null);
    const [showDeleteMedicine, setShowDeleteMedicine] = useState(0);
    const [showDrugLog, setShowDrugLog] = useState<DrugLogRecord | null>(null);
    const [showMedicineEdit, setShowMedicineEdit] = useState<MedicineRecord | null>(null);
    const [toast, setToast] = useState<null | DrugLogRecord[]>(null);

    // Refresh activeClient when the activeResident global changes.
    useEffect(() => {
        if (activeClient) {
            setClientId(activeClient?.clientInfo?.Id ? activeClient.clientInfo.Id : null);
        }
    }, [activeClient]);

    // activeTabKey refresh from prop
    useEffect(() => {
        setActiveTabKey(props.activeTabKey);
    }, [props.activeTabKey]);

    // Update the otcLogList when the drugLogList is changed.
    useEffect(() => {
        // We only want to list the OTC drugs on this page that the resident has taken.
        // @link https://stackoverflow.com/questions/31005396/filter-array-of-objects-with-another-array-of-objects
        const drugLogList = activeClient?.drugLogList;
        if (drugLogList) {
            setOtcLogList(
                drugLogList.filter((drug: DrugLogRecord) => {
                    return otcList.some((m) => {
                        return m.Id === drug?.MedicineId;
                    });
                })
            );
        }
    }, [activeClient, activeClient?.drugLogList, otcList]);

    // Update the checkoutList when drugLogList changes
    useEffect(() => {
        if (activeClient?.drugLogList) {
            setCheckoutList(getCheckoutList(activeClient.drugLogList));
        }
    }, [activeClient, setCheckoutList]);

    // Refresh the pillboxDrugLog[]
    useEffect(() => {
        if (activePillbox && activeClient) {
            const pillboxMedLog = [] as TPillboxMedLog[];
            const pillboxItemList = activeClient.pillboxItemList;
            const drugLogList = activeClient.drugLogList;
            pillboxItemList.forEach((pbi) => {
                if (pbi.PillboxId === activePillbox.Id && pbi.Quantity) {
                    const drugLogRecord = drugLogList.find(
                        (dlr) =>
                            dlr.PillboxItemId === pbi.Id &&
                            dlr.MedicineId === pbi.MedicineId &&
                            dlr.Updated &&
                            isToday(dlr.Updated)
                    );

                    if (drugLogRecord) {
                        const med = activeClient.medicineList.find((m) => m.Id === drugLogRecord.MedicineId);
                        pillboxMedLog.push({
                            Active: !!med?.Active,
                            Drug: med?.Drug,
                            Strength: med?.Strength,
                            Quantity: pbi.Quantity,
                            Notes: drugLogRecord.Notes,
                            PillboxItemId: drugLogRecord.PillboxItemId,
                            PillboxId: activePillbox.Id,
                            Updated: drugLogRecord.Updated
                        });
                    }
                }
            });
            setPillboxMedLogList(multiSort(pillboxMedLog, {Quantity: SortDirection.asc, Drug: SortDirection.desc}));
        }
    }, [activeClient, activePillbox, setPillboxMedLogList]);

    // Build the dropdown items for the Medicine dropdown
    useEffect(() => {
        const itemList = [] as IDropdownItem[];
        if (activeClient) {
            const {drugLogList, pillboxList, pillboxItemList, medicineList} = activeClient;
            const checkoutList = getCheckoutList(drugLogList);

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
            if (pbCnt > 0) itemList.push({id: 0, description: 'divider', subtext: null});

            medicineList.forEach((m) => {
                if (m.Active) {
                    const strength = m.Strength || '';
                    const other = m.OtherNames?.length > 0 ? `(${m.OtherNames})` : null;
                    const checkoutMed = checkoutList.find((c) => c.MedicineId === m.Id);
                    const description = (checkoutMed ? '❎ ' : '') + m.Drug + ' ' + strength;
                    itemList.push({
                        id: m.Id as number,
                        description,
                        subtext: other
                    });
                }
            });

            // If activeMed is null, and we have med items in the list then set the initial activeMed to the first item
            if (activeMed === null && itemList.length > 0) {
                const medsOnly = itemList.filter((i) => i.id > 0);
                setActiveMed(medsOnly.length === 0 ? null : medicineList.find((m) => m.Id === medsOnly[0].id) || null);
            }
        } else {
            setActiveMed(null);
        }
        setMedItemList(itemList);
    }, [activeClient, activeMed]);

    useEffect(() => {
        setLastTaken(
            activeClient && activeMed && activeMed.Id
                ? calculateLastTaken(activeMed.Id, activeClient.drugLogList)
                : null
        );
    }, [activeClient, activeMed, activeMed?.Id]);

    // If there isn't an active client, or this isn't the active tab then do not render
    if (activeTabKey !== 'medicine' || !clientId || !activeClient) return null;

    const medicineOtcList = activeClient.medicineList.concat(otcList) as MedicineRecord[];

    /**
     * Given a MedicineRecord object Update/Insert the record and rehydrate the global otcList / medicineList
     * Set the activeOtc or the activeMed with the updated medicine (if Active)
     * @param {MedicineRecord} med Medicine record object
     */
    const saveMedicine = async (med: MedicineRecord) => {
        await setIsBusy(true);
        const [e, m] = (await asyncWrapper(mm.updateMedicine(med))) as [unknown, Promise<MedicineRecord>];
        if (e) await setErrorDetails(e);
        const updatedMedicineRecord = await m;
        if (updatedMedicineRecord.OTC) {
            const [errLoadOtc, otcMeds] = (await asyncWrapper(mm.loadOtcList())) as [
                unknown,
                Promise<MedicineRecord[]>
            ];
            if (errLoadOtc) await setErrorDetails(errLoadOtc);
            else await setOtcList(await otcMeds);
            setActiveOtc(updatedMedicineRecord.Active ? updatedMedicineRecord : null);
        } else {
            const [errLoadMeds, meds] = (await asyncWrapper(mm.loadMedicineList(clientId))) as [
                unknown,
                Promise<MedicineRecord[]>
            ];
            if (errLoadMeds) await setErrorDetails(errLoadMeds);
            else await setActiveClient({...activeClient, medicineList: await meds});
            const activeMeds = (await meds).filter((m) => m.Active);
            setActiveMed(
                updatedMedicineRecord.Active ? updatedMedicineRecord : activeMeds.length === 0 ? null : activeMeds[0]
            );
        }
        await setIsBusy(false);
    };

    /**
     * Given a MedicineRecord PK delete the medicine
     * @param {number} medicineId The PK of the Medicine record to delete
     */
    const deleteMedicine = async (medicineId: number) => {
        await setIsBusy(true);
        const [e, deleted] = (await asyncWrapper(mm.deleteMedicine(medicineId))) as [unknown, Promise<boolean>];
        if (e) await setErrorDetails(e);
        if (await deleted)
            await setActiveClient({
                ...activeClient,
                medicineList: await mm.loadMedicineList(clientId)
            });
        else await setErrorDetails(new Error('Unable to delete medicine. Id: ' + medicineId));
        await setIsBusy(false);
    };

    /**
     * Given a DrugLogRecord Update or Insert the record and rehydrate the drugLogList
     * @param {DrugLogRecord} drugLog Druglog record object
     */
    const saveDrugLog = async (drugLog: DrugLogRecord): Promise<DrugLogRecord> => {
        await setIsBusy(true);
        const [e, updatedDrugLog] = (await asyncWrapper(mm.updateDrugLog(drugLog))) as [
            unknown,
            Promise<DrugLogRecord>
        ];
        if (e) await setErrorDetails(e);
        else {
            const [errLoadLog, drugLogs] = (await asyncWrapper(mm.loadDrugLog(clientId, 5))) as [
                unknown,
                Promise<DrugLogRecord[]>
            ];
            if (errLoadLog) await setErrorDetails(errLoadLog);
            else await setActiveClient({...activeClient, drugLogList: await drugLogs});
        }
        await setIsBusy(false);
        return await updatedDrugLog;
    };

    /**
     * Add or update a pillboxRecord record.
     * @param {PillboxRecord} pillboxRecord Pillbox record object
     */
    const savePillbox = async (pillboxRecord: PillboxRecord) => {
        setIsBusy(true);
        const [e, updatedPillbox] = (await asyncWrapper(mm.updatePillbox(pillboxRecord))) as [
            unknown,
            Promise<PillboxRecord>
        ];
        if (e) await setErrorDetails(e);
        else setActivePillbox(await updatedPillbox);
        const [errLoadPillbox, pillboxes] = (await asyncWrapper(mm.loadPillboxList(clientId))) as [
            unknown,
            Promise<PillboxRecord[]>
        ];
        if (errLoadPillbox) await setErrorDetails(errLoadPillbox);
        else await setActiveClient({...activeClient, pillboxList: await pillboxes});
        setIsBusy(false);
    };

    /**
     * Delete an existing pillbox.
     * @param {number} pillboxId The PK for the Pillbox table
     */
    const deletePillbox = async (pillboxId: number) => {
        setIsBusy(true);
        const [e, pillboxDeleted] = (await asyncWrapper(mm.deletePillbox(pillboxId))) as [unknown, Promise<boolean>];
        if (e) await setErrorDetails(e);
        else if (await pillboxDeleted) {
            const [errLoad, pillboxes] = (await asyncWrapper(mm.loadPillboxList(clientId))) as [
                unknown,
                Promise<PillboxRecord[]>
            ];
            if (errLoad) await setErrorDetails(errLoad);
            else {
                const pillboxList = await pillboxes;
                await setActiveClient({...activeClient, pillboxList});
                await setActivePillbox(pillboxList.length > 0 ? pillboxList[0] : null);
            }
        } else {
            await setErrorDetails(new Error('Unable to delete Pillbox. Id: ' + pillboxId));
        }
        setIsBusy(false);
    };

    /**
     * Handle when the user clicks on Log Pillbox
     */
    const handleLogPillbox = async () => {
        setIsBusy(true);
        const toastQ = [] as DrugLogRecord[];
        const [e, loggedPillboxMeds] = (await asyncWrapper(mm.logPillbox(activePillbox?.Id as number))) as [
            unknown,
            Promise<DrugLogRecord[]>
        ];
        if (e) await setErrorDetails(e);
        else {
            const loggedPillboxDrugs = await loggedPillboxMeds;
            if (loggedPillboxDrugs.length > 0) {
                const [errLoadLog, drugLogs] = (await asyncWrapper(mm.loadDrugLog(clientId, 5))) as [
                    unknown,
                    Promise<DrugLogRecord[]>
                ];
                if (errLoadLog) await setErrorDetails(errLoadLog);
                else await setActiveClient({...activeClient, drugLogList: await drugLogs});
                loggedPillboxDrugs.forEach((ld) => toastQ.push({...ld}));
                setToast(toastQ);
            }
        }
        setIsBusy(false);
    };

    /**
     * Add or update a pillboxItem record
     * @param {PillboxItemRecord} pillboxItemRecord The pillboxItem record object
     */
    const savePillboxItem = async (pillboxItemRecord: PillboxItemRecord) => {
        setIsBusy(true);
        const [e, updatedPillboxItem] = (await asyncWrapper(mm.updatePillboxItem(pillboxItemRecord))) as [
            unknown,
            Promise<PillboxItemRecord>
        ];
        if (e) await setErrorDetails(e);
        else if (await updatedPillboxItem) {
            const [errLoadPills, pillboxItems] = (await asyncWrapper(mm.loadPillboxItemList(clientId as number))) as [
                unknown,
                Promise<PillboxItemRecord[]>
            ];
            if (errLoadPills) await setErrorDetails(errLoadPills);
            else await setActiveClient({...activeClient, pillboxItemList: await pillboxItems});
        }
        setIsBusy(false);
    };

    /**
     * Fires when user clicks on +Log or the drug log edit button
     * @param {DrugLogRecord} drugLogInfo The drugLog record object
     * @param {boolean} isOtc True if drug to log is an OTC med
     */
    const addEditDrugLog = (drugLogInfo?: DrugLogRecord, isOtc?: boolean) => {
        const drugLogRecord = drugLogInfo
            ? {...drugLogInfo}
            : ({
                  Id: null,
                  ResidentId: clientId,
                  MedicineId: isOtc ? activeOtc?.Id : activeMed?.Id,
                  Notes: ''
              } as DrugLogRecord);
        setShowDrugLog(drugLogRecord);
    };

    /**
     * Fires when the Log 1...4 buttons are clicked.
     * @param {number} amount The number of pills (medication) taken
     * @param {boolean} isOtc True if the amount logged is an OTC med
     */
    const handleLogDrugAmount = (amount: number, isOtc?: boolean) => {
        const medicineId = isOtc ? activeOtc?.Id : activeMed?.Id;
        const drugLogInfo = {...newDrugLogRecord};
        drugLogInfo.ResidentId = clientId;
        drugLogInfo.MedicineId = medicineId as number;
        drugLogInfo.Notes = amount.toString();
        saveDrugLog(drugLogInfo).then((r) => setToast([r]));
    };

    /**
     * Convenience function to get drug name
     * @param {number} medicineId The PK of the Medicine table
     * @returns {string | undefined}
     */
    const drugName = (medicineId: number): string | undefined => {
        return getDrugName(medicineId, medicineOtcList);
    };

    /**
     * Handle when the user has clicked on a pill
     * @param {number} pillboxId The PK of the Pillbox table
     */
    const handleOnPillClick = (pillboxId: number) => {
        if (activeClient) {
            const pb = activeClient.pillboxList.find((p) => p.Id === pillboxId);
            if (pb) {
                setActivePillbox(pb);
                setDisplayType(DISPLAY_TYPE.Pillbox);
            }
        }
    };

    if (!activeClient) return null;

    const {drugLogList, pillboxList, pillboxItemList, medicineList} = activeClient;

    return (
        <>
            <Tabs
                activeKey={displayType}
                onSelect={(key) => setDisplayType((key as DISPLAY_TYPE) || DISPLAY_TYPE.Medicine)}
            >
                <Tab
                    style={{marginLeft: '-40px'}}
                    title={
                        <ToggleButton
                            checked={displayType === DISPLAY_TYPE.Medicine}
                            className="d-print-none"
                            id="med-list-group-med-radio-btn"
                            key="med-list-group-med-btn"
                            name="radio-med-list-group"
                            onChange={() => setDisplayType(DISPLAY_TYPE.Medicine)}
                            size="sm"
                            type="radio"
                            value={DISPLAY_TYPE.Medicine}
                            variant="outline-success"
                        >
                            <span className="ml-2">Medicine</span>
                        </ToggleButton>
                    }
                    eventKey={DISPLAY_TYPE.Medicine}
                >
                    <Row noGutters>
                        <Col>
                            <MedListGroup
                                activeMed={activeMed}
                                addDrugLog={() => addEditDrugLog()}
                                canvasId="med-barcode"
                                clientId={clientId}
                                disabled={isBusy}
                                editMedicine={(medicineRecord) => setShowMedicineEdit(medicineRecord)}
                                itemChanged={(id) => {
                                    if (id < 0) {
                                        setActivePillbox(pillboxList.find((p) => p.Id === Math.abs(id)) || null);
                                        setDisplayType(DISPLAY_TYPE.Pillbox);
                                    } else {
                                        setActiveMed(medicineList.find((m) => m.Id === id) || null);
                                    }
                                }}
                                itemList={medItemList}
                                lastTaken={activeMed?.Id ? calculateLastTaken(activeMed.Id, drugLogList) : null}
                                logDrug={(n) => handleLogDrugAmount(n)}
                            />
                        </Col>
                        <ListGroup as={Col} className="ml-2">
                            <ListGroup.Item style={{textAlign: 'center'}}>
                                <Button
                                    className="hover-underline-animation"
                                    href={`https://vsearch.nlm.nih.gov/vivisimo/cgi-bin/query-meta?v%3Aproject=medlineplus&v%3Asources=medlineplus-bundle&query=${activeMed?.Drug}`}
                                    size="lg"
                                    target="_blank"
                                    variant="link"
                                >
                                    {activeMed?.Drug}
                                </Button>

                                <LastTakenButton lastTaken={lastTaken} />

                                {activeMed?.Id && (
                                    <DrugLogGrid
                                        columns={['Taken', 'Notes', 'Out', 'In']}
                                        drugId={activeMed.Id}
                                        gridLists={{medicineList, drugLogList, pillboxList, pillboxItemList}}
                                        onDelete={(drugLogRecord) => setShowDeleteDrugLogRecord(drugLogRecord)}
                                        onEdit={(r) => addEditDrugLog(r)}
                                        onPillClick={(n) => handleOnPillClick(n)}
                                    />
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Row>
                </Tab>

                <Tab
                    style={{marginLeft: '-40px'}}
                    eventKey={DISPLAY_TYPE.OTC}
                    title={
                        <ToggleButton
                            checked={displayType === DISPLAY_TYPE.OTC}
                            className="ml-2 d-print-none"
                            disabled={otcList?.length === 0}
                            id="med-list-group-otc-radio-btn"
                            key="med-list-group-otc-btn"
                            name="radio-med-list-group"
                            onChange={() => setDisplayType(DISPLAY_TYPE.OTC)}
                            size="sm"
                            type="radio"
                            value={DISPLAY_TYPE.OTC}
                            variant="outline-success"
                        >
                            <span className="ml-2">OTC</span>
                        </ToggleButton>
                    }
                >
                    <Row noGutters>
                        <Col>
                            <OtcListGroup
                                activeOtc={activeOtc}
                                disabled={otcList.length === 0 || isBusy}
                                drugLogList={drugLogList}
                                editOtcMedicine={(medicineRecord) => setShowMedicineEdit(medicineRecord)}
                                logOtcDrug={() => addEditDrugLog(undefined, true)}
                                logOtcDrugAmount={(n) => handleLogDrugAmount(n, true)}
                                otcList={otcList}
                                otcSelected={(medicineRecord) => setActiveOtc(medicineRecord)}
                            />
                        </Col>

                        <ListGroup as={Col} className="ml-2">
                            <ListGroup.Item>
                                <h5 className="mb-2" style={{textAlign: 'center'}}>
                                    OTC History
                                </h5>
                                <DrugLogGrid
                                    columns={['Drug', 'Taken', 'Notes']}
                                    onDelete={(drugLogRecord) => setShowDeleteDrugLogRecord(drugLogRecord)}
                                    onEdit={(drugLogRecord) => addEditDrugLog(drugLogRecord, true)}
                                    gridLists={{
                                        medicineList: otcList,
                                        drugLogList: otcLogList,
                                        pillboxList: undefined,
                                        pillboxItemList: undefined
                                    }}
                                />
                            </ListGroup.Item>
                        </ListGroup>
                    </Row>
                </Tab>

                {/* Only show when: activeClient && activeClient.clientInfo */}
                <Tab
                    style={{marginLeft: '-40px'}}
                    className="d-print-flex"
                    eventKey={DISPLAY_TYPE.History}
                    title={
                        <ToggleButton
                            checked={displayType === DISPLAY_TYPE.History}
                            className="ml-2 d-print-none"
                            disabled={drugLogList.length === 0}
                            id="med-list-group-history-radio-btn"
                            key="med-list-group-history-btn"
                            onChange={() => setDisplayType(DISPLAY_TYPE.History)}
                            size="sm"
                            type="radio"
                            value={DISPLAY_TYPE.History}
                            variant="outline-success"
                        >
                            <span className="ml-2">History</span>
                        </ToggleButton>
                    }
                >
                    <MedDrugLogHistory
                        activeClient={activeClient.clientInfo}
                        gridLists={{
                            drugLogList,
                            pillboxList,
                            pillboxItemList,
                            medicineList: medicineList.concat(otcList)
                        }}
                        onEdit={(drugLogRecord) => addEditDrugLog(drugLogRecord)}
                        onDelete={(drugLogRecord) => setShowDeleteDrugLogRecord(drugLogRecord)}
                        onPillClick={(pillboxId) => handleOnPillClick(pillboxId)}
                    />
                </Tab>

                {/* Show when activePillbox && activePillbox.Id */}
                <Tab
                    style={{marginLeft: '-40px'}}
                    eventKey={DISPLAY_TYPE.Pillbox}
                    title={
                        <ToggleButton
                            checked={displayType === DISPLAY_TYPE.Pillbox}
                            className="ml-2 d-print-none"
                            disabled={medicineList.length < 5}
                            id="med-list-group-pill-radio-btn"
                            key="med-list-group-pill-btn"
                            name="radio-med-list-group"
                            onChange={() => setDisplayType(DISPLAY_TYPE.Pillbox)}
                            size="sm"
                            type="radio"
                            value={DISPLAY_TYPE.Pillbox}
                            variant="outline-success"
                        >
                            <span className="ml-2">Pillbox</span>
                        </ToggleButton>
                    }
                >
                    <Row className={TabContent} noGutters>
                        <Col>
                            <PillboxListGroup
                                activePillbox={activePillbox}
                                clientRecord={activeClient.clientInfo}
                                disabled={isBusy}
                                gridLists={{
                                    medicineList: medicineList.filter((m) => m.Active),
                                    pillboxList,
                                    pillboxItemList,
                                    drugLogList
                                }}
                                logPillbox={() => handleLogPillbox()}
                                onDelete={(pillboxId) => deletePillbox(pillboxId)}
                                onEdit={(pillboxRecord) => savePillbox(pillboxRecord)}
                                onSelect={(pillboxId) =>
                                    setActivePillbox(pillboxList.find((pb) => pb.Id === pillboxId) || null)
                                }
                                pillboxMedLogList={pillboxMedLogList}
                            />
                        </Col>
                        <ListGroup as={Col} className="ml-3">
                            {displayType === DISPLAY_TYPE.Pillbox && activePillbox && activePillbox.Id && (
                                <PillboxCard
                                    activePillbox={activePillbox}
                                    medicineList={medicineList}
                                    onEdit={(pillboxItemRecord) => savePillboxItem(pillboxItemRecord)}
                                    pillboxItemList={pillboxItemList}
                                />
                            )}
                        </ListGroup>
                    </Row>
                </Tab>

                {/* Only show when: activeClient && activeClient.clientInfo */}
                <Tab
                    style={{marginLeft: '-40px'}}
                    eventKey={DISPLAY_TYPE.Print}
                    title={
                        <ToggleButton
                            checked={displayType === DISPLAY_TYPE.Print}
                            className="ml-2 d-print-none"
                            disabled={checkoutList.length === 0}
                            id="med-list-group-print-radio-btn"
                            key="med-list-group-print-btn"
                            name="radio-print-list-group"
                            onChange={() => setDisplayType(DISPLAY_TYPE.Print)}
                            size="sm"
                            type="radio"
                            value={DISPLAY_TYPE.Print}
                            variant="outline-success"
                        >
                            <span className="ml-2">
                                Print Med Checkout{' '}
                                {checkoutList.length > 0 && <Badge variant="secondary">{checkoutList.length}</Badge>}
                            </span>
                        </ToggleButton>
                    }
                >
                    <CheckoutListGroup
                        activeClient={activeClient.clientInfo}
                        checkoutList={checkoutList}
                        medicineList={medicineList}
                    />
                </Tab>
            </Tabs>

            <MedicineEdit
                allowDelete={!drugLogList.find((d) => d.MedicineId === showMedicineEdit?.Id)}
                drugInfo={showMedicineEdit as MedicineRecord}
                existingDrugs={showMedicineEdit?.Id === null ? medicineList.map((m) => m.Drug) : []}
                fullName={clientFullName(activeClient.clientInfo)}
                onClose={(medicineRecord) => {
                    setShowMedicineEdit(null);
                    if (medicineRecord) saveMedicine(medicineRecord);
                }}
                show={showMedicineEdit !== null}
            />

            <DrugLogEdit
                drugLogInfo={showDrugLog as DrugLogRecord}
                drugName={getMedicineRecord(showDrugLog?.MedicineId as number, medicineOtcList)?.Drug || '[unknown]'}
                onClose={(drugLogRecord) => {
                    setShowDrugLog(null);
                    if (drugLogRecord)
                        saveDrugLog(drugLogRecord).then((updatedDrugLogRecord) => setToast([updatedDrugLogRecord]));
                }}
                onHide={() => setShowDrugLog(null)}
                otc={getMedicineRecord(showDrugLog?.MedicineId as number, medicineOtcList)?.OTC || false}
                show={showDrugLog !== null}
            />

            <DeleteDrugLogModal
                drugLogRecord={showDeleteDrugLogRecord as DrugLogRecord}
                drugName={showDeleteDrugLogRecord ? drugName(showDeleteDrugLogRecord.MedicineId) || '' : ''}
                onSelect={(drugLogRecord) => {
                    setShowDeleteDrugLogRecord(null);
                    if (drugLogRecord)
                        mm.deleteDrugLog(showDeleteDrugLogRecord?.Id as number).then(() => {
                            mm.loadDrugLog(clientId, 5).then((drugLogRecords) => {
                                setActiveClient({...activeClient, drugLogList: drugLogRecords});
                            });
                        });
                }}
                show={showDeleteDrugLogRecord !== null}
            />

            <DeleteMedicineModal
                medicineRecord={medicineList.find((m) => m.Id === showDeleteMedicine) as MedicineRecord}
                onSelect={(medicineId) => {
                    setShowDeleteMedicine(0);
                    if (medicineId > 0) {
                        deleteMedicine(medicineId).then(() => {
                            if (medicineList.length > 0) setActiveMed(medicineList[0]);
                            else setActiveMed(null);
                        });
                    }
                }}
                show={showDeleteMedicine !== 0}
            />

            <DrugLogToast
                medicineList={medicineOtcList}
                onClose={() => setToast(null)}
                show={toast !== null}
                toast={toast as DrugLogRecord[]}
            />
        </>
    );
};

export default MedicinePage;
