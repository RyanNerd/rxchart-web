import OtcListGroupGrid from 'components/Pages/Grids/OtcListGroupGrid';
import DisabledSpinner from 'components/Pages/ListGroups/DisabledSpinner';
import {TAB_KEY} from 'components/Pages/rxPage';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import React, {useEffect, useRef, useState} from 'reactn';
import {DrugLogRecord, MedicineRecord, newMedicineRecord} from 'types/RecordTypes';
import {calculateLastTaken, getLastTakenVariant} from 'utility/common';
import LogButtons from '../Buttons/LogButtons';
import ShadowBox from '../Buttons/ShadowBox';

interface IProps {
    activeOtc: MedicineRecord | null;
    activeRxTab: TAB_KEY;
    disabled?: boolean;
    drugLogList: DrugLogRecord[];
    editOtcMedicine: (m: MedicineRecord) => void;
    logOtcDrug: () => void;
    logOtcDrugAmount: (n: number) => void;
    otcList: MedicineRecord[];
    otcSelected: (d: MedicineRecord | null) => void;
}

/**
 * OtcListGroup
 * @param {IProps} props The props for the component
 */
const OtcListGroup = (props: IProps): JSX.Element | null => {
    const {
        activeOtc,
        disabled = false,
        drugLogList,
        editOtcMedicine,
        logOtcDrug,
        logOtcDrugAmount,
        otcList,
        otcSelected
    } = props;

    const [filteredOtcList, setFilteredOtcList] = useState(otcList.filter((o) => o.Active));
    const [searchIsValid, setSearchIsValid] = useState<boolean | null>(null);
    const [searchText, setSearchText] = useState('');
    const lastTaken = activeOtc?.Id ? calculateLastTaken(activeOtc.Id, drugLogList) : null;
    const lastTakenVariant = lastTaken && lastTaken >= 8 ? 'primary' : getLastTakenVariant(lastTaken);
    const searchReference = useRef<HTMLInputElement>(null);

    const [activeRxTab, setActiveRxTab] = useState<TAB_KEY>(props.activeRxTab);
    useEffect(() => {
        setActiveRxTab(props.activeRxTab);
        if (props.activeRxTab === TAB_KEY.OTC) searchReference?.current?.focus();
    }, [activeRxTab, props.activeRxTab]);

    // Filter the otcList by the search textbox value
    useEffect(() => {
        if (searchText.length > 0) {
            const filter = otcList.filter((medicineRecord) => {
                const drug = medicineRecord.Drug.toLowerCase();
                const barcode = medicineRecord.Barcode ? medicineRecord.Barcode.toLowerCase() : '';
                const other = medicineRecord.OtherNames ? medicineRecord.OtherNames.toLowerCase() : '';
                const search = searchText.toLowerCase();
                return (
                    medicineRecord.Active &&
                    (drug.includes(search) || barcode.includes(search) || other.includes(search))
                );
            });
            setSearchIsValid(filter?.length > 0);
            setFilteredOtcList(filter?.length > 0 ? filter : []);
        } else {
            setSearchIsValid(false);
            setFilteredOtcList(otcList.filter((o) => o.Active));
        }
    }, [otcList, searchText]);

    const listGroupStyle = {
        paddingTop: '0.25rem',
        paddingRight: '1.25rem',
        paddingBottom: '0.25rem',
        paddingLeft: '1.25rem'
    };

    return (
        <ListGroup>
            <ListGroup.Item
                disabled={disabled}
                style={{
                    paddingTop: '0.45rem',
                    paddingRight: '1.25rem',
                    paddingBottom: 0,
                    paddingLeft: '1.25rem'
                }}
            >
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <Form.Control
                                autoFocus
                                autoComplete="off"
                                className="mr-2"
                                disabled={disabled}
                                id="otc-page-search-text"
                                isValid={searchIsValid || false}
                                onChange={(changeEvent) => setSearchText(changeEvent.target.value)}
                                onKeyDown={(keyboardEvent: React.KeyboardEvent<HTMLElement>) => {
                                    if (keyboardEvent.key === 'Enter') keyboardEvent.preventDefault();
                                }}
                                onClick={() => {
                                    setSearchText('');
                                    setSearchIsValid(null);
                                    otcSelected(null);
                                }}
                                placeholder="Search OTC medicine"
                                ref={searchReference}
                                size="sm"
                                style={{width: '220px'}}
                                type="search"
                                value={searchText}
                            />
                        </InputGroup.Prepend>
                        <InputGroup.Append style={{zIndex: 0}}>
                            <Button
                                className="mr-1"
                                disabled={disabled}
                                onClick={() => editOtcMedicine({...newMedicineRecord, OTC: true})}
                                size="sm"
                                variant="info"
                            >
                                + OTC
                            </Button>

                            {activeOtc && (
                                <Button
                                    disabled={disabled}
                                    onClick={() => editOtcMedicine({...activeOtc} as MedicineRecord)}
                                    size="sm"
                                    variant="info"
                                >
                                    Edit <b>{activeOtc.Drug}</b>
                                </Button>
                            )}
                        </InputGroup.Append>
                    </InputGroup>
                </FormGroup>
                {activeOtc && !disabled && (
                    <FormGroup>
                        <Button
                            className="mr-2"
                            disabled={!activeOtc || disabled}
                            onClick={() => logOtcDrug()}
                            size="sm"
                            variant={lastTakenVariant}
                        >
                            <span>
                                {disabled && (
                                    <>
                                        <DisabledSpinner />{' '}
                                    </>
                                )}
                                + Log {activeOtc ? activeOtc.Drug + ' ' + activeOtc.Strength : ''}
                            </span>
                        </Button>

                        <LogButtons
                            disabled={!activeOtc || disabled}
                            lastTaken={lastTaken}
                            lastTakenVariant={lastTakenVariant}
                            onLogAmount={(n) => logOtcDrugAmount(n)}
                        />
                    </FormGroup>
                )}
            </ListGroup.Item>

            <ListGroup.Item disabled={disabled}>
                <div style={{height: searchIsValid ? undefined : '450px', overflow: 'auto'}}>
                    <OtcListGroupGrid
                        activeDrug={activeOtc}
                        onSelect={(d) => {
                            setSearchText(d.Drug);
                            searchReference?.current?.focus();
                            otcSelected(d);
                        }}
                        otcList={filteredOtcList}
                    />
                </div>
            </ListGroup.Item>

            {activeOtc?.Directions && activeOtc.Drug === searchText && (
                <ListGroup.Item style={listGroupStyle}>
                    <ShadowBox>
                        <span>
                            <b>Directions: </b> {activeOtc.Directions}
                        </span>
                    </ShadowBox>
                </ListGroup.Item>
            )}

            {activeOtc?.OtherNames && activeOtc.Drug === searchText && (
                <ListGroup.Item style={listGroupStyle}>
                    <ShadowBox>
                        <span>
                            <b>Other Names: </b> {activeOtc.OtherNames}
                        </span>
                    </ShadowBox>
                </ListGroup.Item>
            )}
        </ListGroup>
    );
};

export default OtcListGroup;
