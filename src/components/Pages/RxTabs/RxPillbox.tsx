import PillboxCard from 'components/Pages/Grids/PillboxCard';
import PillboxListGroup from 'components/Pages/ListGroups/PillboxListGroup';
import {TPillboxMedLog} from 'components/Pages/MedicinePage';
import DrugLogToast from 'components/Pages/Toasts/DrugLogToast';
import {IMedicineManager} from 'managers/MedicineManager';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import React, {useEffect, useGlobal, useState} from 'reactn';
import {TClient} from 'reactn/default';
import TabContent from 'styles/common.css';
import {DrugLogRecord, PillboxItemRecord, PillboxRecord} from 'types/RecordTypes';
import {asyncWrapper, isToday, multiSort, SortDirection} from 'utility/common';

interface IProps {
    mm: IMedicineManager;
    activePillbox: PillboxRecord | null;
    activePillboxChanged: (pb: PillboxRecord | null) => void;
}

const RxPillbox = (props: IProps) => {
    const mm = props.mm;
    const activePillboxChanged = props.activePillboxChanged;
    const [activeClient, setActiveClient] = useGlobal('activeClient');
    const [isBusy, setIsBusy] = useState(false);
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [toast, setToast] = useState<null | DrugLogRecord[]>(null);
    const [pillboxMedLogList, setPillboxMedLogList] = useState<TPillboxMedLog[]>([]);

    const [activePillbox, setActivePillbox] = useState(props.activePillbox);
    useEffect(() => {
        setActivePillbox(props.activePillbox);
    }, [props.activePillbox]);

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
        else {
            activePillboxChanged(await updatedPillbox);
        }
        const [errLoadPillbox, pillboxes] = (await asyncWrapper(
            mm.loadPillboxList(activeClient?.clientInfo.Id as number)
        )) as [unknown, Promise<PillboxRecord[]>];
        if (errLoadPillbox) await setErrorDetails(errLoadPillbox);
        else await setActiveClient({...(activeClient as TClient), pillboxList: await pillboxes});
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
            const [errLoad, pillboxes] = (await asyncWrapper(
                mm.loadPillboxList(activeClient?.clientInfo.Id as number)
            )) as [unknown, Promise<PillboxRecord[]>];
            if (errLoad) await setErrorDetails(errLoad);
            else {
                const pillboxList = await pillboxes;
                await setActiveClient({...(activeClient as TClient), pillboxList});
                activePillboxChanged(pillboxList.length > 0 ? pillboxList[0] : null);
            }
        } else {
            await setErrorDetails(new Error('Unable to delete Pillbox. Id: ' + pillboxId));
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
            const [errLoadPills, pillboxItems] = (await asyncWrapper(
                mm.loadPillboxItemList(activeClient?.clientInfo.Id as number)
            )) as [unknown, Promise<PillboxItemRecord[]>];
            if (errLoadPills) await setErrorDetails(errLoadPills);
            else await setActiveClient({...(activeClient as TClient), pillboxItemList: await pillboxItems});
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
                const [errLoadLog, drugLogs] = (await asyncWrapper(
                    mm.loadDrugLog(activeClient?.clientInfo.Id as number, 5)
                )) as [unknown, Promise<DrugLogRecord[]>];
                if (errLoadLog) await setErrorDetails(errLoadLog);
                else await setActiveClient({...(activeClient as TClient), drugLogList: await drugLogs});
                loggedPillboxDrugs.forEach((ld) => toastQ.push({...ld}));
                setToast(toastQ);
            }
        }
        setIsBusy(false);
    };

    if (activeClient === null) return null;
    return (
        <>
            <Row className={TabContent} noGutters>
                <Col>
                    <PillboxListGroup
                        activePillbox={activePillbox}
                        clientRecord={activeClient.clientInfo}
                        disabled={isBusy}
                        gridLists={{
                            medicineList: activeClient.medicineList.filter((m) => m.Active),
                            pillboxList: activeClient.pillboxList,
                            pillboxItemList: activeClient.pillboxItemList,
                            drugLogList: activeClient.drugLogList
                        }}
                        logPillbox={() => handleLogPillbox()}
                        onDelete={(pillboxId) => deletePillbox(pillboxId)}
                        onEdit={(pillboxRecord) => savePillbox(pillboxRecord)}
                        onSelect={(pillboxId) =>
                            activePillboxChanged(activeClient.pillboxList.find((pb) => pb.Id === pillboxId) || null)
                        }
                        pillboxMedLogList={pillboxMedLogList}
                    />
                </Col>
                <ListGroup as={Col} className="ml-3">
                    {activePillbox && activePillbox.Id && (
                        <PillboxCard
                            activePillbox={activePillbox}
                            medicineList={activeClient.medicineList}
                            onEdit={(pillboxItemRecord) => savePillboxItem(pillboxItemRecord)}
                            pillboxItemList={activeClient.pillboxItemList}
                        />
                    )}
                </ListGroup>
            </Row>

            <DrugLogToast
                medicineList={activeClient.medicineList}
                onClose={() => setToast(null)}
                show={toast !== null}
                toast={toast as DrugLogRecord[]}
            />
        </>
    );
};

export default RxPillbox;
