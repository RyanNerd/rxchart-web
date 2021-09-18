import React, {useEffect, useRef, useState} from "reactn";

import Table from "react-bootstrap/Table";
import {Button, Collapse, Form, FormGroup, InputGroup, ListGroup, ListGroupItem} from "react-bootstrap";

import DisabledSpinner from "./DisabledSpinner";
import LogButtons from "../../Buttons/LogButtons";
import MedicineDetail from "../Grids/MedicineDetail";
import ShadowBox from "../../Buttons/ShadowBox";
import {DrugLogRecord, MedicineRecord} from "../../../types/RecordTypes";
import {calculateLastTaken, getLastTakenVariant} from "../../../utility/common";

interface IProps {
    activeOtcDrug: MedicineRecord
    addOtcMedicine: () => void
    disabled?: boolean
    drugLogList: DrugLogRecord[]
    editOtcMedicine: () => void
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
        activeOtcDrug,
        addOtcMedicine,
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
    const [showOtc, setShowOtc] = useState(false);
    const lastTaken = (activeOtcDrug && activeOtcDrug.Id) ? calculateLastTaken(activeOtcDrug.Id, drugLogList) : null;
    const lastTakenVariant = lastTaken && lastTaken >= 8 ? 'primary' : getLastTakenVariant(lastTaken);
    const searchRef = useRef<HTMLInputElement>(null);

    // Filter the otcList by the search textbox value
    useEffect(() => {
        if (searchText.length > 0) {
            const filter = otcList.filter((medicineRecord) => {
                const drug = medicineRecord.Drug.toLowerCase();
                const barcode = medicineRecord.Barcode ? medicineRecord.Barcode.toLowerCase() : '';
                const search = searchText.toLowerCase();
                return drug.includes(search) || barcode.includes(search);
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

    // TODO: Remove Collapse or move it up to MedicinePage
    // FIXME: Set focus via other means to the search textbox
    return (
        <ListGroup>
            {/*<ListGroupItem*/}
            {/*    action*/}
            {/*    active={!showOtc}*/}
            {/*    as="button"*/}
            {/*    disabled={disabled}*/}
            {/*    onClick={() => setShowOtc(!showOtc)}*/}
            {/*    style={{height: "35px", verticalAlign: "middle", lineHeight: "100%", zIndex: 0}}*/}
            {/*>*/}
            {/*    <div style={{textAlign: "center"}}>*/}
            {/*        {disabled ?*/}
            {/*            (<DisabledSpinner>{showOtc ? 'Hide OTC' : 'Show OTC'}</DisabledSpinner>)*/}
            {/*            :*/}
            {/*            (<>{showOtc ? 'Hide OTC' : 'Show OTC'}</>)*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*</ListGroupItem>*/}

            <Collapse
                in={true}
                onEntered={() => searchRef?.current?.focus()}
            >
                <ListGroup.Item disabled={disabled}>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <Form.Control
                                    className="mr-2"
                                    id="otc-page-search-text"
                                    isValid={searchIsValid || false}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                        }
                                    }}
                                    placeholder="Search OTC medicine"
                                    ref={searchRef}
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
                                        addOtcMedicine();
                                    }}
                                    size="sm"
                                    variant="info"
                                >
                                    + OTC
                                </Button>

                                {activeOtcDrug &&
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        editOtcMedicine();
                                    }}
                                    size="sm"
                                    variant="info"
                                >
                                    Edit <b>{activeOtcDrug.Drug}</b>
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
                            + Log OTC
                        </Button>

                        <LogButtons
                            drugName={activeOtcDrug.Drug}
                            lastTaken={lastTaken}
                            lastTakenVariant={lastTakenVariant}
                            onLogAmount={(n) => logOtcDrugAmount(n)}
                        />
                    </FormGroup>
                    {activeOtcDrug.Directions &&
                    <ShadowBox>
                        <span><b>Directions: </b> {activeOtcDrug.Directions}</span>
                    </ShadowBox>
                    }
                </ListGroup.Item>
            </Collapse>

            <Collapse in={true}>
                <ListGroup.Item disabled={disabled}>
                    <div style={{height: "450px", overflow: "auto"}}>
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
                                    activeDrug={activeOtcDrug}
                                    columns={[
                                        'Drug',
                                        'Strength'
                                    ]}
                                    drug={drug}
                                    key={'otc' + drug.Id}
                                    onSelect={(e, d) => {
                                        setActiveOtcDrug(d);
                                    }}
                                />)
                            }
                            </tbody>
                        </Table>
                    </div>
                </ListGroup.Item>
            </Collapse>
        </ListGroup>
    )
}

export default OtcListGroup;
