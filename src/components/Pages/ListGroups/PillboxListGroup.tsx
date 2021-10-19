import DisabledSpinner from "components/Pages/ListGroups/DisabledSpinner";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Button from 'react-bootstrap/Button'
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from 'react-bootstrap/Card'
import Col from "react-bootstrap/Col";
import ListGroup from 'react-bootstrap/ListGroup';
import Row from "react-bootstrap/Row";
import ToggleButton from "react-bootstrap/ToggleButton";
import React, {useEffect, useState} from 'reactn';
import {ReactChild} from "reactn/default";
import {MedicineRecord, newPillboxRecord, PillboxItemRecord, PillboxRecord} from 'types/RecordTypes';
import {
    BsColor,
    getDrugName,
    getDrugsInThePillbox, getMedicineRecord,
    getPillboxLogDate,
    isPillboxLogToday,
    multiSort,
    SortDirection
} from 'utility/common';
import ConfirmDialogModal from '../Modals/ConfirmDialogModal';
import PillboxEdit from '../Modals/PillboxEdit';

interface IProps {
    activePillbox: PillboxRecord | null
    children?: ReactChild | boolean
    clientId: number
    disabled?: boolean
    logPillbox: () => void
    medicineList: MedicineRecord[]
    onDelete: (id: number) => void
    onEdit: (pb: PillboxRecord) => void
    onSelect: (n: number) => void
    pillboxItemList: PillboxItemRecord[]
    pillboxList: PillboxRecord[]
}

interface IPillboxLineItem {
    Drug: string
    Strength: string
    Qty: number
}

/**
 * Pillbox ListGroup
 * @param {IProps} props
 */
const PillboxListGroup = (props: IProps) => {
    const {
        activePillbox,
        children,
        clientId,
        disabled = false,
        logPillbox,
        medicineList = [],
        onDelete,
        onEdit,
        onSelect,
        pillboxItemList,
        pillboxList
    } = props;

    // If there is at least one pillbox (but no active pillbox) then force the first pillbox as the active pillbox
    if (pillboxList.length > 0 && !activePillbox) onSelect(pillboxList[0].Id as number);

    const [showAlert, setShowAlert] = useState(false);
    const [showPillboxDeleteConfirm, setShowPillboxDeleteConfirm] = useState(false);
    const [pillboxInfo, setPillboxInfo] = useState<PillboxRecord | null>(null);

    /**
     * Return the pillbox Log Date as a nicely formatted time string
     * @param {number} pillboxId
     * @return {string}
     */
    const getPillboxLogTime = (pillboxId: number): string => {
        const logDate = getPillboxLogDate(pillboxId);
        return logDate ? logDate.toLocaleTimeString() : '';
    }

    // When the activePillbox has already been logged today then setShowAlert to true
    useEffect(() => {
        setShowAlert((activePillbox?.Id && isPillboxLogToday(activePillbox.Id)) || false);
    }, [activePillbox]);

    // Build out the pillbox line items content
    const drugsInThePillbox = activePillbox?.Id ? getDrugsInThePillbox(activePillbox.Id, pillboxItemList) : [];
    const pillboxLineItems: IPillboxLineItem[] = [];
    drugsInThePillbox.forEach(d => {
        const drugName = getDrugName(d.MedicineId, medicineList);
        if (drugName) {
            const qty = d.Quantity;
            const medicine = getMedicineRecord(d.MedicineId, medicineList);
            const strength = medicine?.Strength || '';
            pillboxLineItems.push(
                {Drug: drugName, Strength: strength, Qty: qty}
            );
        }
    })

    // logTime will be the date/time that the activePillbox was logged today, otherwise null if not logged
    const logTime = activePillbox?.Id && isPillboxLogToday(activePillbox.Id) ?
        getPillboxLogTime(activePillbox.Id) : null;

    const listboxItemStyle = {
        paddingTop: "0.25rem",
        paddingRight: "1.25rem",
        paddingBottom: "0.20rem",
        paddingLeft: "1.25rem"
    }

    /**
     * Pillbox RadioButton component
     * @param {PillboxRecord} pb
     */
    const PillboxRadioButton = (pb: PillboxRecord) => {
        return (
            <ToggleButton
                disabled={disabled}
                key={pb.Id}
                id={`pb-list-group-radio-btn-${pb.Id}`}
                type="radio"
                name="radio-pb-list-group"
                variant="outline-primary"
                size="lg"
                value={pb.Id as number}
                checked={activePillbox?.Id === pb.Id}
                onChange={() => onSelect(pb.Id as number)}
                style={{textAlign: "justify"}}
            >
                <span className="ml-2">
                    {disabled && <><DisabledSpinner/>{" "}</>}
                    Pillbox: <b style={{textTransform: "uppercase"}}>{pb.Name}</b>
                </span>
            </ToggleButton>
        )
    }

    /**
     * Line Item component for pills in the pillbox
     * @param {Drug: string; Qty: number; } i
     */
    const PillboxLineItem = (i: IPillboxLineItem) => {
        return (
            <li className="rx-icon">
                {"("} {i.Qty} {") "} {i.Drug} {" "} {i.Strength}
            </li>
        )
    }

    /**
     * PillboxContentCard component
     */
    const PillboxContentCard = () => {
        return (
            <Card>
                <Card.Title
                    className="mb-0"
                >
                    <h3
                        className="ml-2 mt-1"
                        style={{color: BsColor.blue, textTransform: "uppercase"}}
                    >
                        <b>
                            {activePillbox?.Name}
                        </b>
                    </h3>
                </Card.Title>
                <Card.Body
                    style={{
                        color: BsColor.white,
                        backgroundColor: pillboxLineItems.length > 0 ? BsColor.success : BsColor.warning
                    }}
                >
                    <ul>
                        {pillboxLineItems.length > 0 ?
                            (<>
                                    {multiSort(pillboxLineItems, {Drug: SortDirection.desc}).map(PillboxLineItem)}
                                </>
                            ) : (
                                <>
                                    <li
                                        style={{listStyleType: "none"}}
                                    >
                                        <b>{"The "}
                                            <span
                                                style={{color: BsColor.blue, textTransform: "uppercase"}}
                                            >
                                            {activePillbox?.Name}
                                        </span> {" Pillbox is empty"}
                                        </b>
                                    </li>
                                    <li
                                        style={{listStyleType: "none", color: BsColor.blue}}
                                    >
                                        <hr/>
                                    </li>
                                    <li
                                        style={{listStyleType: "none"}}
                                    >
                                        {"Select the number of pills in the pillbox for each medicine ===>"}
                                    </li>
                                </>
                            )}
                    </ul>
                </Card.Body>
            </Card>
        )
    }

    /**
     * The + Log Pillbox button component
     */
    const LogPillboxButton = () => {
        return (
            <Button
                disabled={
                    disabled ||
                    drugsInThePillbox.length === 0 ||
                    showAlert
                }
                variant={drugsInThePillbox.length === 0 || logTime ? "outline-warning" : "primary"}
                size="sm"
                onClick={() => {
                    logPillbox();
                    setShowAlert(true);
                }}
            >
                {disabled && <><DisabledSpinner/>{" "}</>}
                + Log Pillbox <b style={{textTransform: "uppercase"}}>{activePillbox?.Name}</b>
                {logTime &&
                    <Badge
                        variant="danger"
                        className="ml-2"
                    >
                        {"Logged: " + logTime}
                    </Badge>
                }
            </Button>
        )
    }

    return (
        <>
            <ListGroup>
                <ListGroup.Item>
                    <ButtonGroup>
                        <Button
                            disabled={disabled}
                            onClick={() => {
                                const pillboxRecord = {...newPillboxRecord};
                                pillboxRecord.ResidentId = clientId;
                                setPillboxInfo(pillboxRecord);
                            }}
                            size="sm"
                            variant="info"
                        >
                            + Pillbox
                        </Button>

                        {activePillbox &&
                            <>
                                <Button
                                    disabled={disabled}
                                    className="ml-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const pillboxRecord = {...activePillbox};
                                        pillboxRecord.ResidentId = clientId;
                                        setPillboxInfo(pillboxRecord);
                                    }}
                                    size="sm"
                                    variant="info"
                                >
                                    Edit <span style={{textTransform: "uppercase"}}>{activePillbox.Name}</span>
                                </Button>
                                <Button
                                    disabled={disabled}
                                    className="ml-2 mr-5"
                                    onClick={() => setShowPillboxDeleteConfirm(true)}
                                    size="sm"
                                    variant="danger"
                                >
                                    <span
                                        role="img"
                                        aria-label="delete"
                                        style={{textTransform: "uppercase"}}
                                    >
                                        🗑️
                                    </span>{" "}Delete{" "}
                                    <span
                                        style={{textTransform: "uppercase"}}
                                    >
                                        {activePillbox.Name}
                                    </span>
                                </Button>
                                {drugsInThePillbox.length > 0 && <LogPillboxButton/>}
                            </>
                        }
                    </ButtonGroup>
                </ListGroup.Item>

                {pillboxList.length > 0 ?
                    (
                        <ListGroup.Item>
                            <Row noGutters>
                                <Col xl={5}>
                                    <ButtonGroup vertical>
                                        {pillboxList.map(PillboxRadioButton)}
                                    </ButtonGroup>
                                </Col>

                                <Col xl={7}>
                                    <PillboxContentCard/>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ) : (
                        <Card
                            className="mt-2"
                        >
                            <Card.Body>
                                There are no Pillboxes. Click on the <b>+ Pillbox</b> button to add one.
                            </Card.Body>
                        </Card>
                    )
                }

                {children && logTime &&
                    <ListGroup.Item
                        style={listboxItemStyle}
                    >
                        {children}
                    </ListGroup.Item>
                }

                {showAlert &&
                    <ListGroup.Item
                        style={listboxItemStyle}
                    >
                        <Alert
                            className="mb-0"
                            variant="danger"
                            dismissible
                            onClose={() => setShowAlert(false)}
                        >
                            <Alert.Heading
                                className="mb-0"
                            >
                                Pillbox <b
                                style={{textTransform: "uppercase"}}
                            >
                                {activePillbox?.Name}
                            </b> logged today at {" "} {logTime}
                            </Alert.Heading>
                        </Alert>
                    </ListGroup.Item>
                }

                {activePillbox?.Notes &&
                    <ListGroup.Item
                        style={listboxItemStyle}
                    >
                        {activePillbox.Notes}
                    </ListGroup.Item>
                }
            </ListGroup>

            {pillboxInfo &&
                <PillboxEdit
                    onClose={
                        r => {
                            setPillboxInfo(null);
                            if (r) onEdit(r);
                        }
                    }
                    pillboxInfo={pillboxInfo}
                    show={true}
                />
            }

            <ConfirmDialogModal
                centered
                show={showPillboxDeleteConfirm}
                title={<h3>Delete Pillbox {activePillbox?.Name}</h3>}
                body={
                    <Alert variant="danger">
                        {"Delete Pillbox: " + activePillbox?.Name}
                    </Alert>
                }
                yesButton={
                    <Button
                        variant="danger"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowPillboxDeleteConfirm(false);
                            onDelete(activePillbox?.Id as number);
                        }}
                    >
                        Delete
                    </Button>
                }
                noButton={
                    <Button
                        variant="secondary"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowPillboxDeleteConfirm(false);
                        }}
                    >
                        Cancel
                    </Button>
                }
            />
        </>
    )
}

export default PillboxListGroup;
