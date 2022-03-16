import PillboxCard from 'components/Pages/Grids/PillboxCard';
import PillboxListGroup from 'components/Pages/ListGroups/PillboxListGroup';
import DrugLogToast from 'components/Pages/Toasts/DrugLogToast';
import {IMedHistoryProvider} from 'providers/MedHistoryProvider';
import {IPillboxItemProvider} from 'providers/PillboxItemProvider';
import {IPillboxProvider} from 'providers/PillboxProvider';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import React, {useEffect, useGlobal, useState} from 'reactn';
import {TClient} from 'reactn/default';
import TabContent from 'styles/common.css';
import {DrugLogRecord, PillboxItemRecord, PillboxRecord} from 'types/RecordTypes';
import {asyncWrapper, isToday, multiSort, SortDirection} from 'utility/common';

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

interface IProps {
    activePillbox: PillboxRecord | null;
    activePillboxChanged: (pb: PillboxRecord | null) => void;
    medHistoryProvider: IMedHistoryProvider;
    pillboxItemProvider: IPillboxItemProvider;
    pillboxProvider: IPillboxProvider;
}

/**
 * RxPillbox tab - Displays PillboxListGroup and PillboxCard
 * @param {IProps} props The props for this component
 */
const RxPillbox = (props: IProps) => {
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [activeClient, setActiveClient] = useGlobal('activeClient');
    const [isBusy, setIsBusy] = useState(false);
    const [pillboxMedLogList, setPillboxMedLogList] = useState<TPillboxMedLog[]>([]);
    const [toast, setToast] = useState<null | DrugLogRecord[]>(null);
    const {activePillboxChanged, medHistoryProvider, pillboxProvider, pillboxItemProvider} = props;

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
            for (const pbi of pillboxItemList) {
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
            }
            setPillboxMedLogList(multiSort(pillboxMedLog, {Quantity: SortDirection.asc, Drug: SortDirection.desc}));
        }
    }, [activeClient, activePillbox, setPillboxMedLogList]);

    /**
     * Add or update a pillboxRecord record.
     * @param {PillboxRecord} pillboxRecord Pillbox record object
     */
    const savePillbox = async (pillboxRecord: PillboxRecord) => {
        setIsBusy(true);
        const [errorUpdatePillbox, updatedPillbox] = (await asyncWrapper(pillboxProvider.update(pillboxRecord))) as [
            unknown,
            Promise<PillboxRecord>
        ];
        if (errorUpdatePillbox) await setErrorDetails(errorUpdatePillbox);
        else {
            activePillboxChanged(await updatedPillbox);
        }
        const [errorLoadPillbox, pillboxes] = (await asyncWrapper(
            pillboxProvider.loadList(activeClient?.clientInfo.Id as number)
        )) as [unknown, Promise<PillboxRecord[]>];
        await (errorLoadPillbox
            ? setErrorDetails(errorLoadPillbox)
            : setActiveClient({...(activeClient as TClient), pillboxList: await pillboxes}));
        setIsBusy(false);
    };

    /**
     * Delete an existing pillbox.
     * @param {number} pillboxId The PK for the Pillbox table
     */
    const deletePillbox = async (pillboxId: number) => {
        setIsBusy(true);
        const [errorDeletePillbox, pillboxDeleted] = (await asyncWrapper(pillboxProvider.delete(pillboxId))) as [
            unknown,
            Promise<boolean>
        ];
        if (errorDeletePillbox) await setErrorDetails(errorDeletePillbox);
        else if (await pillboxDeleted) {
            const [errorLoadPillbox, pillboxes] = (await asyncWrapper(
                pillboxProvider.loadList(activeClient?.clientInfo.Id as number)
            )) as [unknown, Promise<PillboxRecord[]>];
            if (errorLoadPillbox) await setErrorDetails(errorLoadPillbox);
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
        const [error, updatedPillboxItem] = (await asyncWrapper(pillboxItemProvider.update(pillboxItemRecord))) as [
            unknown,
            Promise<PillboxItemRecord>
        ];
        if (error) await setErrorDetails(error);
        else if (await updatedPillboxItem) {
            const [errorLoadPills, pillboxItems] = (await asyncWrapper(
                pillboxItemProvider.loadList(activeClient?.clientInfo.Id as number)
            )) as [unknown, Promise<PillboxItemRecord[]>];
            await (errorLoadPills
                ? setErrorDetails(errorLoadPills)
                : setActiveClient({...(activeClient as TClient), pillboxItemList: await pillboxItems}));
        }
        setIsBusy(false);
    };

    /**
     * Handle when the user clicks on Log Pillbox
     */
    const handleLogPillbox = async () => {
        setIsBusy(true);
        const toastQ = [] as DrugLogRecord[];
        const [error, loggedPillboxMeds] = (await asyncWrapper(pillboxProvider.log(activePillbox?.Id as number))) as [
            unknown,
            Promise<DrugLogRecord[]>
        ];
        if (error) await setErrorDetails(error);
        else {
            const loggedPillboxDrugs = await loggedPillboxMeds;
            if (loggedPillboxDrugs.length > 0) {
                const [errorLoadLog, drugLogs] = (await asyncWrapper(
                    medHistoryProvider.load(activeClient?.clientInfo.Id as number, 5)
                )) as [unknown, Promise<DrugLogRecord[]>];
                await (errorLoadLog
                    ? setErrorDetails(errorLoadLog)
                    : setActiveClient({...(activeClient as TClient), drugLogList: await drugLogs}));
                for (const ld of loggedPillboxDrugs) toastQ.push({...ld});
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
                        activeClient={activeClient}
                        activePillbox={activePillbox}
                        disabled={isBusy}
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
