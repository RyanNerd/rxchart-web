import DisabledSpinner from "components/Pages/ListGroups/DisabledSpinner";
import {ReactChild} from "reactn/default";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Button from 'react-bootstrap/Button'
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup';
import ToggleButton from "react-bootstrap/ToggleButton";
import React, {useEffect, useState} from 'reactn';
import {newPillboxRecord, PillboxItemRecord, PillboxRecord} from 'types/RecordTypes';
import {getDrugsInThePillbox, getPillboxLogDate, isPillboxLogToday} from 'utility/common';
import ConfirmDialogModal from '../Modals/ConfirmDialogModal';
import PillboxEdit from '../Modals/PillboxEdit';

interface IProps {
    activePillbox: PillboxRecord | null
    disabled?: boolean
    onSelect: (n: number) => void
    onEdit: (pb: PillboxRecord) => void
    onDelete: (id: number) => void
    clientId: number
    pillboxList: PillboxRecord[]
    pillboxItemList: PillboxItemRecord[]
    logPillbox: () => void
    children?: ReactChild | boolean
}

/**
 * Pillbox ListGroup
 * @param {IProps} props
 * @constructor
 */
const PillboxListGroup = (props: IProps) => {
    const {
        activePillbox,
        disabled = false,
        onSelect,
        onEdit,
        onDelete,
        clientId,
        pillboxList,
        pillboxItemList,
        logPillbox,
        children
    } = props;

    if (pillboxList.length > 0 && !activePillbox) {
        onSelect(pillboxList[0].Id as number);
    }

    const [showAlert, setShowAlert] = useState(false);
    const [showPillboxDeleteConfirm, setShowPillboxDeleteConfirm] = useState(false);
    const [pillboxInfo, setPillboxInfo] = useState<PillboxRecord | null>(null);

    /**
     * Return the pillbox Log Date as a nicely formatted time string
     * @param {number} pillboxId
     */
    const getPillboxLogTime = (pillboxId: number): string => {
        const logDate = getPillboxLogDate(pillboxId);
        return logDate ? logDate.toLocaleTimeString() : '';
    }

    useEffect(() => {
        setShowAlert((activePillbox?.Id && isPillboxLogToday(activePillbox.Id)) || false);
    }, [activePillbox]);

    const drugsInThePillbox = activePillbox?.Id ? getDrugsInThePillbox(activePillbox.Id, pillboxItemList) : [];
    const logTime = activePillbox?.Id && isPillboxLogToday(activePillbox.Id) ?
        getPillboxLogTime(activePillbox.Id) : null;

    const listboxItemStyle={
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
                className="mr-2"
                disabled={disabled}
                key={pb.Id}
                id={`pb-list-group-radio-btn-${pb.Id}`}
                type="radio"
                name="radio-pb-list-group"
                variant="outline-primary"
                size="sm"
                value={pb.Id as number}
                checked={activePillbox?.Id === pb.Id}
                onChange={() => onSelect(pb.Id as number)}
            >
                {disabled && <DisabledSpinner/>}
                <span className="ml-2">PILLBOX: <b>{pb.Name}</b></span>
            </ToggleButton>
        )
    }

    return (
        <>
            <ListGroup>
                <ListGroup.Item
                    style={listboxItemStyle}
                >
                    <ButtonGroup>
                    <Button
                        disabled={disabled}
                        onClick={(e) => {
                            e.preventDefault();
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
                                Edit {activePillbox.Name}
                            </Button>
                            <Button
                                disabled={disabled}
                                className="ml-2"
                                onClick={() => setShowPillboxDeleteConfirm(true)}
                                size="sm"
                                variant="danger"
                            >
                                <span role="img" aria-label="delete">🗑️</span>{" "}Delete {activePillbox.Name}
                            </Button>
                            <Button
                                className="ml-5"
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
                                {disabled && <DisabledSpinner/>}
                                + Log Pillbox <b>{activePillbox.Name}</b>
                                {logTime &&
                                    <Badge
                                        variant="danger"
                                        className="ml-2"
                                    >
                                        {"Logged: " + logTime}
                                    </Badge>
                                }
                            </Button>
                        </>
                    }
                    </ButtonGroup>
                </ListGroup.Item>

                {pillboxList.length > 0 ? (
                    <ListGroup.Item>
                        <ButtonGroup vertical>
                            {pillboxList.map(PillboxRadioButton)}
                        </ButtonGroup>
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
                                Pillbox <b>{activePillbox?.Name}</b> logged today at {" "} {logTime}
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

            {/*Add/Edit Pillbox Modal*/}
            {pillboxInfo &&
                <PillboxEdit
                    onClose={
                        (r) => {
                            setPillboxInfo(null);
                            if (r) onEdit(r);
                        }
                    }
                    pillboxInfo={pillboxInfo}
                    show={true}
                />
            }

            {/*Delete Pillbox Modal*/}
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
