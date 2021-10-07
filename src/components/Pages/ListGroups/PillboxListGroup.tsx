import DisabledSpinner from "components/Pages/ListGroups/DisabledSpinner";
import {ReactChild} from "react";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ListGroup from 'react-bootstrap/ListGroup';
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
    children?: ReactChild
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
     * Pillbox Dropdown Item component
     * @param {PillboxRecord} pillboxRecord
     */
    const PillboxItem = (pillboxRecord: PillboxRecord): JSX.Element => {
        const key = 'pillbox-lg-item-' + pillboxRecord?.Id?.toString();
        return (
            <Dropdown.Item
                key={key}
                active={pillboxRecord.Id === activePillbox?.Id}
                onSelect={() => onSelect(pillboxRecord.Id as number)}
            >
                {pillboxRecord.Name}
            </Dropdown.Item>
        )
    }

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
    const title = (disabled ? <DisabledSpinner>{activePillbox?.Name}</DisabledSpinner> : activePillbox?.Name);
    const logTime = activePillbox?.Id && isPillboxLogToday(activePillbox.Id) ?
        getPillboxLogTime(activePillbox.Id) : null;

    /**
     * Work-around so React 17 can be used
     * @link https://github.com/react-bootstrap/react-bootstrap/issues/5409#issuecomment-718699584
     */
    return (
        <>
            <ListGroup>
                <ListGroup.Item>
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
                                variant="primary"
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
                        </>
                    }
                </ListGroup.Item>

                <ListGroup.Item>
                    {pillboxList.length > 0 ?
                        (
                            <ButtonGroup>
                                <Button
                                    className="mr-2"
                                    variant="secondary"
                                    style={{cursor: "default"}}
                                >
                                    PILLBOX:
                                </Button>
                                <DropdownButton
                                    title={title}
                                    onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
                                    disabled={disabled}
                                >
                                    {pillboxList.map(PillboxItem)}
                                </DropdownButton>

                                {activePillbox?.Id &&
                                <Button
                                    className="ml-5"
                                    disabled={
                                        disabled ||
                                        drugsInThePillbox.length === 0 ||
                                        showAlert
                                    }
                                    variant={drugsInThePillbox.length === 0 || logTime ? "outline-warning" : "info"}
                                    onClick={() => {logPillbox();
                                        setShowAlert(true);
                                    }}
                                >
                                    {disabled && <DisabledSpinner/>}
                                    + Log Pillbox <b>{activePillbox.Name}</b> {logTime &&
                                        <Badge
                                            variant="danger"
                                            className="ml-2"
                                        >
                                            {"Logged: " + logTime}
                                        </Badge>
                                    }
                                </Button>
                                }
                            </ButtonGroup>
                        ) : (
                            <Card className="mt-2">
                                <Card.Body>
                                    There are no Pillboxes. Click on the + Pillbox button to add one.
                                </Card.Body>
                            </Card>
                        )
                    }
                </ListGroup.Item>

                {showAlert &&
                    <ListGroup.Item>
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
                        style={{
                            paddingTop: "0.25rem",
                            paddingRight: "1.25rem",
                            paddingBottom: "0.25rem",
                            paddingLeft: "1.25rem"
                        }}
                    >
                        {activePillbox.Notes}
                    </ListGroup.Item>
                }

                {logTime && children &&
                <ListGroup.Item>
                    {children}
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
