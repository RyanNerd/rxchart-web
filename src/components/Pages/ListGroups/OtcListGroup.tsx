import LogButtons from "../../Buttons/LogButtons";
import MedicineDetail from "../Grids/MedicineDetail";
import React, {useEffect, useState} from "reactn";
import ShadowBox from "../../Buttons/ShadowBox";
import Table from "react-bootstrap/Table";
import {Button, Collapse, Form, FormGroup, InputGroup, ListGroup, ListGroupItem} from "react-bootstrap";
import {DrugLogRecord, MedicineRecord} from "../../../types/RecordTypes";
import {calculateLastTaken, getLastTakenVariant} from "../../../utility/common";
import {useRef} from "react";

interface IProps {
    activeOtcDrug: MedicineRecord
    addOtcMedicine: () => void
    drugLogList: DrugLogRecord[]
    editOtcMedicine: () => void
    logOtcDrug: (e: React.MouseEvent<HTMLElement>) => void
    logOtcDrugAmount: (n: number) => void
    otcList: MedicineRecord[]
    setActiveOtcDrug: (d: MedicineRecord) => void
    onDisplay?: (s: boolean) => void
}

/**
 * OtcListGroup
 * @param {IProps} props
 */
const OtcListGroup = (props: IProps): JSX.Element | null => {
    const {
        activeOtcDrug,
        addOtcMedicine,
        drugLogList,
        editOtcMedicine,
        logOtcDrug,
        logOtcDrugAmount,
        onDisplay,
        otcList,
        setActiveOtcDrug
    } = props;

    const lastTaken = (activeOtcDrug && activeOtcDrug.Id) ? calculateLastTaken(activeOtcDrug.Id, drugLogList) : null;
    const lastTakenVariant = lastTaken && lastTaken >= 8 ? 'primary' : getLastTakenVariant(lastTaken);
    const [searchIsValid, setSearchIsValid] = useState<boolean | null>(null);
    const [searchText, setSearchText] = useState('');
    const [filteredOtcList, setFilteredOtcList] = useState(otcList);
    const [showOtc, setShowOtc] = useState(false);
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

    // Invoke callback when the OtcListGroup is shown or hidden
    useEffect(() => {
        if (onDisplay) {
            onDisplay(showOtc);
        }
    }, [showOtc, onDisplay])

    return (
        <ListGroup>
            <ListGroupItem
                action
                as="button"
                active={!showOtc}
                onClick={() => setShowOtc(!showOtc)}
                style={{height: "35px", verticalAlign: "middle", lineHeight: "100%", zIndex: 0}}
            >
                <div style={{textAlign: "center"}}>
                    {showOtc ? 'Hide OTC' : 'Show OTC'}
                </div>
            </ListGroupItem>

            <Collapse
                in={showOtc}
                onEntered={() => searchRef?.current?.focus()}
            >
                <ListGroup.Item>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <Form.Control
                                    className="mr-2"
                                    id="otc-page-search-text"
                                    isValid={searchIsValid || false}
                                    placeholder="Search OTC medicine"
                                    size="sm"
                                    style={{width: "220px"}}
                                    type="search"
                                    ref={searchRef}
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </InputGroup.Prepend>
                            <InputGroup.Append style={{zIndex: 0}}>
                                <Button
                                    className="mr-1"
                                    size="sm"
                                    variant="info"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addOtcMedicine();
                                    }}
                                >
                                    + OTC
                                </Button>

                                {activeOtcDrug &&
                                <Button
                                    size="sm"
                                    variant="info"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        editOtcMedicine();
                                    }}
                                >
                                    Edit <b>{activeOtcDrug.Drug}</b>
                                </Button>
                                }
                            </InputGroup.Append>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Button
                            onClick={(e) => logOtcDrug(e)}
                            className="mr-2"
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

            <Collapse in={showOtc}>
                <ListGroup.Item>
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
