import TooltipContainer from 'components/Pages/Containters/TooltipContainer';
import ManageOtcGrid from 'components/Pages/Grids/ManageOtcGrid';
import DeleteMedicineModal from 'components/Pages/Modals/DeleteMedicineModal';
import MedicineEdit from 'components/Pages/Modals/MedicineEdit';
import {DeleteResponse} from 'providers/MedicineProvider';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, {useEffect, useGlobal, useRef, useState} from 'reactn';
import {DrugLogRecord, MedicineRecord, newMedicineRecord} from 'types/RecordTypes';
import {asyncWrapper} from 'utility/common';

interface IProps {
    activeManagementKey: string;
}

/**
 * ManageOtc - UI for Displaying, editing and adding OTC drugs
 * @param {IProps} props The props for the component
 */
const ManageOtc = (props: IProps): JSX.Element | null => {
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [allowDelete, setAllowDelete] = useState(false);
    const [medicineInfo, setMedicineInfo] = useState<MedicineRecord | null>(null);
    const [providers] = useGlobal('providers');
    const medicineProvider = providers.medicineProvider;
    const medHistoryProvider = providers.medHistoryProvider;
    const [otcList, setOtcList] = useGlobal('otcList');
    const [filteredOtcList, setFilteredOtcList] = useState<MedicineRecord[]>(otcList);
    const [searchIsValid, setSearchIsValid] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [showDeleteMedicine, setShowDeleteMedicine] = useState(0);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);
    const activeTabKey = props.activeManagementKey;

    const focusReference = useRef<HTMLInputElement>(null);
    useEffect(() => {
        focusReference?.current?.focus();
    });

    // Search filter update
    useEffect(() => {
        if (searchText.length > 0) {
            const filter = otcList.filter((o) => {
                return (
                    o.Drug.toLowerCase().includes(searchText.toLowerCase()) ||
                    o.OtherNames?.toLowerCase().includes(searchText.toLowerCase())
                );
            });
            setFilteredOtcList(filter.length > 0 ? filter : []);
            setSearchIsValid(filter.length > 0);
        } else {
            setSearchIsValid(false);
            setFilteredOtcList(otcList);
        }
    }, [otcList, searchText]);

    // If this tab isn't active then don't render
    if (activeTabKey !== 'otc') return null;

    /**
     * Rehydrate the global otcList
     * @returns {Promise<void>}
     */
    const refreshOtcList = async () => {
        try {
            await setOtcList(await medicineProvider.loadOtcList());
        } catch (requestError: unknown) {
            await setErrorDetails(requestError);
        }
    };

    /**
     * Given a MedicineRecord object Update or Insert the record and rehydrate the global otcList
     * @param {MedicineRecord} otcMed The medicine record object
     */
    const saveOtcMedicine = async (otcMed: MedicineRecord) => {
        const [saveOtcMedicineError, medicineRecord] = (await asyncWrapper(medicineProvider.update(otcMed))) as [
            unknown,
            MedicineRecord
        ];
        await (saveOtcMedicineError ? setErrorDetails(saveOtcMedicineError) : refreshOtcList());
        return medicineRecord;
    };

    /**
     * Given a MedicineRecord PK delete the medicine record and rehydrate the global otcList
     * @param {number} medicineId The PK of the Medicine record to delete, or a zero for a NOP
     */
    const deleteOtcMedicine = async (medicineId: number) => {
        if (medicineId > 0) {
            const [deleteOtcMedicineError, deleteOtcMedicine] = (await asyncWrapper(
                medicineProvider.delete(medicineId)
            )) as [unknown, Promise<DeleteResponse>];
            const deleteResponse = await deleteOtcMedicine;
            if (!deleteResponse.success)
                await setErrorDetails(`Unable to delete OTC medicine record. Id: ${medicineId}`);
            else await (deleteOtcMedicineError ? setErrorDetails(deleteOtcMedicineError) : refreshOtcList());
        }
    };

    /**
     * Given the Medicine PK return all MedHistory records
     * @param {number} medicineId The Medicine PK
     * @returns {Promise<DrugLogRecord[]>} An array of drug log records
     */
    const getDrugLogForMedication = async (medicineId: number): Promise<DrugLogRecord[]> => {
        const [drugLogsForMedicationError, drugLogsForMedication] = (await asyncWrapper(
            medHistoryProvider.loadDrugLogForMedicine(medicineId)
        )) as [unknown, Promise<DrugLogRecord[]>];
        if (drugLogsForMedicationError) await setErrorDetails(drugLogsForMedicationError);
        return drugLogsForMedication;
    };

    /**
     * Fires when the Edit button is clicked
     * @param {MedicineRecord | null} medicine The medicine record object for update, null indicates a new record
     */
    const onEdit = async (medicine?: MedicineRecord | null) => {
        const medicineInfo = medicine ? {...medicine} : {...newMedicineRecord, OTC: true};
        setMedicineInfo(medicineInfo);

        // If this is an existing OTC medicine then determine if the medicine is allowed to be deleted
        if (medicineInfo.Id) {
            const dt = new Date();
            dt.setDate(dt.getDate() - 5);
            const logsInFiveDays = (await getDrugLogForMedication(medicineInfo.Id)).filter((d) => {
                const updated = d.Updated ? new Date(d.Updated) : null;
                return updated ? updated > dt : false;
            });
            setAllowDelete(logsInFiveDays.length === 0);
        }
        setShowMedicineEdit(true);
    };

    return (
        <>
            <ButtonGroup className="mb-2" as={Row}>
                <TooltipContainer tooltip="Manually Add New OTC">
                    <Button size="sm" variant="info" onClick={() => onEdit(null)}>
                        + OTC
                    </Button>
                </TooltipContainer>

                <Form.Control
                    autoFocus
                    className="ml-2"
                    id="medicine-page-search-text"
                    isValid={searchIsValid}
                    onChange={(changeEvent) => setSearchText(changeEvent.target.value)}
                    onKeyDown={(keyboardEvent: React.KeyboardEvent<HTMLElement>) => {
                        if (keyboardEvent.key === 'Enter') keyboardEvent.preventDefault();
                    }}
                    placeholder="Search OTC"
                    ref={focusReference}
                    style={{width: '820px'}}
                    type="search"
                    value={searchText}
                />
            </ButtonGroup>

            <Row>
                <ManageOtcGrid
                    onEdit={onEdit}
                    onToggleActive={(medicineRecord) => {
                        saveOtcMedicine({...medicineRecord, Active: !medicineRecord.Active}).then((m) =>
                            setSearchText(m.Active ? m.Drug : '')
                        );
                    }}
                    otcList={filteredOtcList}
                />
            </Row>

            <MedicineEdit
                allowDelete={allowDelete}
                drugInfo={medicineInfo as MedicineRecord}
                onClose={(r) => {
                    setShowMedicineEdit(false);
                    if (r) {
                        // Negative Id indicates a delete operation
                        if (r.Id && r.Id < 0) setShowDeleteMedicine(Math.abs(r.Id));
                        else saveOtcMedicine(r).then((m) => setSearchText(m.Active ? m.Drug : ''));
                    }
                }}
                show={showMedicineEdit}
            />

            <DeleteMedicineModal
                medicineRecord={otcList.find((m) => m.Id === showDeleteMedicine) as MedicineRecord}
                onSelect={async (medicineId) => {
                    await deleteOtcMedicine(medicineId);
                    await setShowDeleteMedicine(0);
                    await setSearchText('');
                }}
                show={showDeleteMedicine !== 0}
            />
        </>
    );
};

export default ManageOtc;
