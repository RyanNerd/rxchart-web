import {Button, Form, FormGroup, InputGroup, ListGroup} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import React, {useEffect, useRef, useState} from "reactn";
import {DrugLogRecord, MedicineRecord, newMedicineRecord} from "types/RecordTypes";
import {calculateLastTaken, getLastTakenVariant} from "utility/common";
import LogButtons from "../../Buttons/LogButtons";
import ShadowBox from "../../Buttons/ShadowBox";
import MedicineDetail from "../Grids/MedicineDetail";

interface IProps {
    activeOtc: MedicineRecord
    disabled?: boolean
    drugLogList: DrugLogRecord[]
    editOtcMedicine: (m: MedicineRecord) => void
    logOtcDrug: (e: React.MouseEvent<HTMLElement>) => void
    logOtcDrugAmount: (n: number) => void
    otcList: MedicineRecord[]
    setActiveOtcDrug: (d: MedicineRecord) => void
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
        setActiveOtcDrug
    } = props;

    const [filteredOtcList, setFilteredOtcList] = useState(otcList);
    const [searchIsValid, setSearchIsValid] = useState<boolean | null>(null);
    const [searchText, setSearchText] = useState('');
    const lastTaken = (activeOtc && activeOtc.Id) ? calculateLastTaken(activeOtc.Id, drugLogList) : null;
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

            if (filter && filter.length > 0) {
                setSearchIsValid(true);
                setFilteredOtcList(filter);
            } else {
                setSearchIsValid(false);
                setFilteredOtcList([]);
            }
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
                                ref={searchRef}
                                id="otc-page-search-text"
                                isValid={searchIsValid || false}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                    }
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
                        className="mr-2"
                        onClick={(e) => logOtcDrug(e)}
                        size="sm"
                        variant={lastTakenVariant}
                    >
                        + Log {activeOtc.Drug + ' ' + activeOtc.Strength}
                    </Button>

                    <LogButtons
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
                                onSelect={(e, d) => {
                                    e.preventDefault();
                                    setSearchText(d.Drug);
                                    searchRef?.current?.focus();
                                    setActiveOtcDrug(d);
                                }}
                            />)
                        }
                        </tbody>
                    </Table>
                </div>
            </ListGroup.Item>

            {activeOtc.Directions &&
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

            {activeOtc.OtherNames &&
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
