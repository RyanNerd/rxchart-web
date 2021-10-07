import DisabledSpinner from "components/Pages/ListGroups/DisabledSpinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import React, {useEffect, useRef, useState} from "reactn";
import {DrugLogRecord, MedicineRecord, newMedicineRecord} from "types/RecordTypes";
import {calculateLastTaken, getLastTakenVariant} from "utility/common";
import LogButtons from "../../Buttons/LogButtons";
import ShadowBox from "../../Buttons/ShadowBox";
import MedicineDetail from "../Grids/MedicineDetail";

interface IProps {
    activeOtc: MedicineRecord | null
    disabled?: boolean
    drugLogList: DrugLogRecord[]
    editOtcMedicine: (m: MedicineRecord) => void
    logOtcDrug: () => void
    logOtcDrugAmount: (n: number) => void
    otcList: MedicineRecord[]
    otcSelected: (d: MedicineRecord | null) => void
}

/**
 * OtcListGroup
 * @param {IProps} props
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

    const [filteredOtcList, setFilteredOtcList] = useState(otcList);
    const [searchIsValid, setSearchIsValid] = useState<boolean | null>(null);
    const [searchText, setSearchText] = useState('');
    const lastTaken = activeOtc?.Id ? calculateLastTaken(activeOtc.Id, drugLogList) : null;
    const lastTakenVariant = lastTaken && lastTaken >= 8 ? 'primary' : getLastTakenVariant(lastTaken);
    const searchRef = useRef<HTMLInputElement>(null);

    // Filter the otcList by the search textbox value
    useEffect(() => {
        if (searchText.length > 0) {
            const filter = otcList.filter((medicineRecord) => {
                const drug = medicineRecord.Drug.toLowerCase();
                const barcode = medicineRecord.Barcode ? medicineRecord.Barcode.toLowerCase() : '';
                const other = medicineRecord.OtherNames ? medicineRecord.OtherNames.toLowerCase() : '';
                const search = searchText.toLowerCase();
                return drug.includes(search) || barcode.includes(search) || other.includes(search);
            })
            setSearchIsValid(filter?.length > 0);
            setFilteredOtcList(filter?.length > 0 ? filter : []);
        } else {
            setSearchIsValid(false);
            setFilteredOtcList(otcList);
        }
    }, [otcList, searchText])

    return (
        <ListGroup>
            <ListGroup.Item
                disabled={disabled}
                style={{
                    paddingTop: "0.45rem",
                    paddingRight: "1.25rem",
                    paddingBottom: 0,
                    paddingLeft: "1.25rem"
                }}
            >
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <Form.Control
                                autoFocus
                                className="mr-2"
                                disabled={disabled}
                                ref={searchRef}
                                id="otc-page-search-text"
                                isValid={searchIsValid || false}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                    }
                                }}
                                onClick={(e: React.MouseEvent<HTMLElement>) => {
                                    e.preventDefault();
                                    setSearchText('');
                                    setSearchIsValid(null);
                                    otcSelected(null);
                                }}
                                placeholder="Search OTC medicine"
                                size="sm"
                                style={{width: "220px"}}
                                type="search"
                                value={searchText}
                            />
                        </InputGroup.Prepend>
                        <InputGroup.Append style={{zIndex: 0}}>
                            <Button
                                disabled={disabled}
                                className="mr-1"
                                onClick={(e) => {
                                    e.preventDefault();
                                    editOtcMedicine({...newMedicineRecord, OTC: true});
                                }}
                                size="sm"
                                variant="info"
                            >
                                + OTC
                            </Button>

                            {activeOtc &&
                            <Button
                                disabled={disabled}
                                onClick={(e) => {
                                    e.preventDefault();
                                    editOtcMedicine({...activeOtc} as MedicineRecord);
                                }}
                                size="sm"
                                variant="info"
                            >
                                Edit <b>{activeOtc.Drug}</b>
                            </Button>
                            }
                        </InputGroup.Append>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Button
                        disabled={!activeOtc || disabled}
                        className="mr-2"
                        onClick={(e) => {
                            e.preventDefault();
                            logOtcDrug();
                        }}
                        size="sm"
                        variant={lastTakenVariant}
                    >
                        <span>
                            {disabled && <DisabledSpinner/>}
                            + Log {activeOtc ? activeOtc.Drug + ' ' + activeOtc.Strength : ""}
                        </span>
                    </Button>

                    <LogButtons
                        disabled={!activeOtc || disabled}
                        lastTaken={lastTaken}
                        lastTakenVariant={lastTakenVariant}
                        onLogAmount={(n) => logOtcDrugAmount(n)}
                    />
                </FormGroup>
            </ListGroup.Item>

            <ListGroup.Item disabled={disabled}>
                <div style={{height: searchIsValid ? undefined : "450px", overflow: "auto"}}>
                    <Table
                        bordered
                        hover
                        size="sm"
                        striped
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
                                activeDrug={activeOtc}
                                columns={[
                                    'Drug',
                                    'Strength'
                                ]}
                                drug={drug}
                                key={'otc' + drug.Id}
                                onSelect={(d) => {
                                    setSearchText(d.Drug);
                                    searchRef?.current?.focus();
                                    otcSelected(d);
                                }}
                            />)
                        }
                        </tbody>
                    </Table>
                </div>
            </ListGroup.Item>

            {activeOtc?.Directions && activeOtc.Drug === searchText &&
                <ListGroup.Item
                    style={{
                        paddingTop: "0.25rem",
                        paddingRight: "1.25rem",
                        paddingBottom: "0.25rem",
                        paddingLeft: "1.25rem"
                    }}
                >
                    <ShadowBox>
                        <span><b>Directions: </b> {activeOtc.Directions}</span>
                    </ShadowBox>
                </ListGroup.Item>
            }

            {activeOtc?.OtherNames && activeOtc.Drug === searchText &&
                <ListGroup.Item
                    style={{
                        paddingTop: "0.25rem",
                        paddingRight: "1.25rem",
                        paddingBottom: "0.25rem",
                        paddingLeft: "1.25rem"
                    }}
                >
                    <ShadowBox>
                        <span><b>Other Names: </b> {activeOtc.OtherNames}</span>
                    </ShadowBox>
                </ListGroup.Item>
            }
        </ListGroup>
    )
}

export default OtcListGroup;
