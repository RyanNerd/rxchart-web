import TooltipContainer from 'components/Pages/Containters/TooltipContainer';
import ManageOtcGrid from 'components/Pages/Grids/ManageOtcGrid';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, {useEffect, useGlobal, useRef, useState} from 'reactn';
import {MedicineRecord, newMedicineRecord} from 'types/RecordTypes';
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
    const [medicineInfo, setMedicineInfo] = useState<MedicineRecord | null>(null);
    const [mm] = useGlobal('medicineManager');
    const [otcList, setOtcList] = useGlobal('otcList');
    const [filteredOtcList, setFilteredOtcList] = useState<MedicineRecord[]>(otcList);
    const [searchIsValid, setSearchIsValid] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);
    const focusRef = useRef<HTMLInputElement>(null);
    const activeTabKey = props.activeTabKey;

    // Set focus to the Search textbox when this page becomes active
    useEffect(() => {
        focusRef?.current?.focus();
    });

    // Search filter side effect
    useEffect(() => {
        if (searchText.length > 0) {
            const filter = otcList.filter((o) => {
                return (
                    o.Drug.toLowerCase().includes(searchText.toLowerCase()) ||
                    o.OtherNames?.toLowerCase().includes(searchText.toLowerCase())
                );
            });

            if (filter.length > 0) {
                setFilteredOtcList(filter);
                setSearchIsValid(true);
            } else {
                setSearchIsValid(false);
                setFilteredOtcList([]);
            }
        } else {
            setSearchIsValid(false);
            setFilteredOtcList(otcList);
        }
    }, [otcList, searchText]);

    // If this tab isn't active then don't render
    if (activeTabKey !== 'manage-otc') return null;

    /**
     * Given a MedicineRecord Update or Insert the record and rehydrate the global otcList
     * @param {MedicineRecord} med The medicine record object
     */
    const saveOtcMedicine = async (med: MedicineRecord) => {
        const m = await mm.updateMedicine(med);
        const ol = await mm.loadOtcList();
        await setOtcList(ol);
        return m;
    };

    /**
     * Fires when the Edit button is clicked
     * @param {MedicineRecord | null} medicine The medicine record object for update, null indicates a new record
     */
    const onEdit = (medicine?: MedicineRecord | null) => {
        const medicineInfo = medicine ? {...medicine} : {...newMedicineRecord, OTC: true};
        setMedicineInfo(medicineInfo);
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
                    style={{width: '820px'}}
                    isValid={searchIsValid}
                    ref={focusRef}
                    type="search"
                    value={searchText}
                    onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                        }
                    }}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search OTC"
                />
            </ButtonGroup>

            <Row>
                <ManageOtcGrid
                    onDelete={(medicineRecord) => {
                        saveOtcMedicine({...medicineRecord, Active: !medicineRecord.Active}).then((m) =>
                            setSearchText(m.Active ? m.Drug : '')
                        );
                    }}
                    onEdit={onEdit}
                    otcList={filteredOtcList}
                />
            </Row>

            <MedicineEdit
                drugInfo={medicineInfo as MedicineRecord}
                onClose={(r) => {
                    setShowMedicineEdit(false);
                    if (r) saveOtcMedicine(r).then((m) => setSearchText(m.Active ? m.Drug : ''));
                }}
                show={showMedicineEdit}
            />
        </>
    );
};

export default ManageOtcPage;
