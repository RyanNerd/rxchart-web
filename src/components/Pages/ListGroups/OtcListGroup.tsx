import {Button, Form, FormGroup, InputGroup, ListGroup} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {DrugLogRecord, MedicineRecord} from "../../../types/RecordTypes";
import MedicineDetail from "../Grids/MedicineDetail";
import React, {useEffect, useState} from "reactn";
import LogButtons from "../../Buttons/LogButtons";
import {calculateLastTaken, getLastTakenVariant} from "../../../utility/common";
import ShadowBox from "../../Buttons/ShadowBox";

interface IProps {
    activeOtcDrug: MedicineRecord
    addOtcMedicine: () => (void)
    drugLogList: DrugLogRecord[]
    editOtcMedicine: () => (void)
    logOtcDrugAmount: (n: number) => (void)
    otcList: MedicineRecord[]
    setActiveOtcDrug: (d: MedicineRecord) => (void)
}

const OtcListGroup = (props: IProps): JSX.Element | null => {
    const {
        activeOtcDrug,
        addOtcMedicine,
        drugLogList,
        editOtcMedicine,
        logOtcDrugAmount,
        otcList,
        setActiveOtcDrug
    } = props;

    const lastTaken = (activeOtcDrug && activeOtcDrug.Id) ? calculateLastTaken(activeOtcDrug.Id, drugLogList) : null;
    const lastTakenVariant = lastTaken && lastTaken >= 8 ? 'primary' : getLastTakenVariant(lastTaken);
    const [searchIsValid, setSearchIsValid] = useState<boolean | null>(null);
    const [searchText, setSearchText] = useState('');
    const [filteredOtcList, setFilteredOtcList] = useState(otcList);
    const [showDetails, setShowDetails] = useState(false);

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

    return (
        // <ListGroup>
        <ListGroup>
            <ListGroup.Item action onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? "Hide OTC" : "Show OTC"}
            </ListGroup.Item>

            {showDetails &&
            <>
            <ListGroup.Item>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <Form.Control
                                className="mb-1 mr-2"
                                size="sm"
                                id="otc-page-search-text"
                                style={{width: "220px"}}
                                type="search"
                                isValid={searchIsValid || false}
                                value={searchText}
                                onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                    }
                                }}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search OTC medicine"
                            />
                        </InputGroup.Prepend>
                        <InputGroup.Append>
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
                        size="sm"
                        className="mr-2"
                        variant={lastTakenVariant}
                    >
                        + Log OTC
                    </Button>

                    <LogButtons
                        onLogAmount={(n) => logOtcDrugAmount(n)}
                        lastTaken={lastTaken}
                        lastTakenVariant={lastTakenVariant}
                        drugName={activeOtcDrug.Drug}
                    />
                </FormGroup>
                {activeOtcDrug.Directions &&
                    <ShadowBox>
                        <span><b>Directions: </b> {activeOtcDrug.Directions}</span>
                    </ShadowBox>
                }
            </ListGroup.Item>

            <ListGroup.Item>
                <div style={{height: "300px", overflow: "auto"}}>
                    <Table
                        striped
                        bordered
                        hover
                        size="sm"
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
                                drug={drug}
                                columns={[
                                    'Drug',
                                    'Strength'
                                ]}
                                key={'otc' + drug.Id}
                                onSelect={(e, d) => {
                                    setActiveOtcDrug(d);
                                }}
                                activeDrug={activeOtcDrug}
                            />)
                        }
                        </tbody>
                    </Table>
                </div>
            </ListGroup.Item>
            </>
            }



            {/*{activeOtcDrug.Barcode &&*/}
            {/*<ListGroup.Item>*/}
            {/*    <canvas id="otc-barcode"/>*/}
            {/*</ListGroup.Item>*/}
            {/*}*/}
        </ListGroup>
    )
}

export default OtcListGroup;
