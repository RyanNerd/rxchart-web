import TooltipContainer from 'components/Pages/Containters/TooltipContainer';
import ManageOtcGrid from 'components/Pages/Grids/ManageOtcGrid';
import DeleteMedicineModal from 'components/Pages/Modals/DeleteMedicineModal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, {useEffect, useGlobal, useRef, useState} from 'reactn';
import {DrugLogRecord, MedicineRecord, newMedicineRecord} from 'types/RecordTypes';
import MedicineEdit from './Modals/MedicineEdit';

interface IProps {
    activeTabKey: string;
}

/**
 * ManageOtcPage - UI for Displaying, editing and adding OTC drugs
 * @param {IProps} props The props for the component
 * @returns {JSX.Element | null}
 */
const ManageOtcPage = (props: IProps): JSX.Element | null => {
    const [allowDelete, setAllowDelete] = useState(false);
    const [medicineInfo, setMedicineInfo] = useState<MedicineRecord | null>(null);
    const [mm] = useGlobal('medicineManager');
    const [otcList, setOtcList] = useGlobal('otcList');
    const [filteredOtcList, setFilteredOtcList] = useState<MedicineRecord[]>(otcList);
    const [searchIsValid, setSearchIsValid] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [showDeleteMedicine, setShowDeleteMedicine] = useState(0);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);
    const activeTabKey = props.activeTabKey;

    const focusRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        focusRef?.current?.focus();
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
    if (activeTabKey !== 'manage-otc') return null;

    /**
     * Given a MedicineRecord object Update or Insert the record and rehydrate the global otcList
     * @param {MedicineRecord} otcMed The medicine record object
     */
    const saveOtcMedicine = async (otcMed: MedicineRecord) => {
        const m = await mm.updateMedicine(otcMed);
        await setOtcList(await mm.loadOtcList());
        return m;
    };

    /**
     * Given a MedicineRecord PK delete the medicine record and rehydrate the global otcList
     * @param {number} medicineId The PK of the Medicine record to delete, or a zero for a NOP
     */
    const deleteOtcMedicine = async (medicineId: number) => {
        if (medicineId > 0) {
            if (await mm.deleteMedicine(medicineId)) await setOtcList(await mm.loadOtcList());
        }
    };

    /**
     * Fires when the Edit button is clicked
     * @param {MedicineRecord | null} medicine The medicine record object for update, null indicates a new record
     */
    const onEdit = async (medicine?: MedicineRecord | null) => {
        /**
         * Given the Medicine PK return all MedHistory records
         * @param {number} medicineId The Medicine PK
         * @returns {Promise<DrugLogRecord[]>}
         */
        const getDrugLogForMedication = async (medicineId: number): Promise<DrugLogRecord[]> => {
            return await mm.loadDrugLogForMedicine(medicineId);
        };

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
            setShowMedicineEdit(true);
        } else {
            setShowMedicineEdit(true);
        }
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
                    style={{width: '820px'}}
                    isValid={searchIsValid}
                    ref={focusRef}
                    type="search"
                    value={searchText}
                    onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                        if (e.key === 'Enter') e.preventDefault();
                    }}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search OTC"
                />
            </ButtonGroup>

            <Row>
                <ManageOtcGrid
                    onToggleActive={(medicineRecord) => {
                        saveOtcMedicine({...medicineRecord, Active: !medicineRecord.Active}).then((m) =>
                            setSearchText(m.Active ? m.Drug : '')
                        );
                    }}
                    onEdit={onEdit}
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
                show={showDeleteMedicine !== 0}
                medicine={otcList.find((m) => m.Id === showDeleteMedicine) as MedicineRecord}
                onSelect={(medicineId) => {
                    deleteOtcMedicine(medicineId)
                        .then(() => setShowDeleteMedicine(0))
                        .then(() => setSearchText(''));
                }}
            />
        </>
    );
};

export default ManageOtcPage;
