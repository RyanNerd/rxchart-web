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
        logOtcDrugAmount,
        otcList,
        setActiveOtcDrug
    } = props;

    const lastTaken = (activeOtcDrug && activeOtcDrug.Id) ? calculateLastTaken(activeOtcDrug.Id, drugLogList) : null;
    const lastTakenVariant = lastTaken && lastTaken >= 8 ? 'primary' : getLastTakenVariant(lastTaken);
    const [searchIsValid, setSearchIsValid] = useState<boolean | null>(null);
    const [searchText, setSearchText] = useState('');
    const [filteredOtcList, setFilteredOtcList] = useState(otcList);

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
        <ListGroup>
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
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                    }
                                }}
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

            <ListGroup.Item>
                <div style={{height: "300px", overflow: "auto"}}>
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
        </ListGroup>
    )
}

export default OtcListGroup;
