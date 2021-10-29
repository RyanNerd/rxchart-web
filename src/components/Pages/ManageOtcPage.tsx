import TooltipContainer from 'components/Pages/Buttons/Containters/TooltipContainer';
import ManageOtcGrid from 'components/Pages/Grids/ManageOtcGrid';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, {useEffect, useGlobal, useRef, useState} from 'reactn';
import {ClientRecord, MedicineRecord, newMedicineRecord} from 'types/RecordTypes';
import Confirm from './Modals/Confirm';
import MedicineEdit from './Modals/MedicineEdit';

interface IProps {
    activeTabKey: string;
    clientRecord: ClientRecord;
}

/**
 * ManageOtcPage - UI for Displaying, editing and adding OTC drugs
 * @param {IProps} props The props for the component
 * @returns {JSX.Element | null}
 */
const ManageOtcPage = (props: IProps): JSX.Element | null => {
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [medicineInfo, setMedicineInfo] = useState<MedicineRecord | null>(null);
    const [mm] = useGlobal('medicineManager');
    const [otcList, setOtcList] = useGlobal('otcList');
    const [filteredOtcList, setFilteredOtcList] = useState<MedicineRecord[]>(otcList);
    const [searchIsValid, setSearchIsValid] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [showDeleteMedicine, setShowDeleteMedicine] = useState(false);
    const [showMedicineEdit, setShowMedicineEdit] = useState(false);
    const focusRef = useRef<HTMLInputElement>(null);

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
    if (props.activeTabKey !== 'manage-otc') return null;

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
                    style={{width: '220px'}}
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
                        setMedicineInfo({...medicineRecord});
                        setShowDeleteMedicine(true);
                    }}
                    onEdit={onEdit}
                    otcList={filteredOtcList}
                />
            </Row>

            {showMedicineEdit && medicineInfo && (
                /* MedicineEdit Modal */
                <MedicineEdit
                    clientRecord={props.clientRecord}
                    show={showMedicineEdit}
                    onClose={(r) => {
                        setShowMedicineEdit(false);
                        if (r) {
                            saveOtcMedicine(r);
                        }
                    }}
                    drugInfo={medicineInfo}
                />
            )}

            {medicineInfo && showDeleteMedicine && (
                <Confirm.Modal
                    size="lg"
                    show={showDeleteMedicine}
                    buttonvariant="danger"
                    onSelect={(a) => {
                        setShowDeleteMedicine(false);
                        if (a) {
                            mm.deleteMedicine(medicineInfo?.Id as number).then((d) => {
                                if (d) {
                                    mm.loadOtcList().then((ol) => setOtcList(ol));
                                } else {
                                    setErrorDetails('Unable to Delete OTC medicine. Id: ' + medicineInfo.Id);
                                }
                            });
                        }
                    }}
                >
                    <Confirm.Header>
                        <Confirm.Title>{'Delete ' + medicineInfo.Drug}</Confirm.Title>
                    </Confirm.Header>
                    <Confirm.Body>
                        <Alert variant="danger" style={{textAlign: 'center'}}>
                            <span>
                                This will delete the OTC medicine <b>{medicineInfo.Drug}</b> for <i>ALL</i> residents
                            </span>
                            <span>
                                {' '}
                                and <b>ALL</b> history for this drug!
                            </span>
                        </Alert>
                        <Alert variant="warning">Are you sure?</Alert>
                    </Confirm.Body>
                </Confirm.Modal>
            )}
        </>
    );
};

export default ManageOtcPage;
