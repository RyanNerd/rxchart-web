import {Alert, Button, Card, Dropdown, DropdownButton} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import React, {useEffect, useGlobal, useState} from 'reactn';
import {newPillboxRecord, PillboxItemRecord, PillboxRecord} from "types/RecordTypes";
import {
    getPillboxLogDate,
    getPillboxLogDateString,
    isPillboxLogToday,
    setPillboxLogDate
} from "utility/common";
import TooltipButton from "../../Buttons/TooltipButton";
import ConfirmDialogModal from "../Modals/ConfirmDialogModal";
import PillboxEdit from "../Modals/PillboxEdit";

interface IProps {
    pillboxList: PillboxRecord[]
    activePillbox: PillboxRecord | null
    onSelect: (n: number) => void
    clientId: number
    pillboxItemList: PillboxItemRecord[]
    logPillbox: () => void
}

/**
 * Pillbox ListGroup
 * @param {IProps} props
 * @constructor
 */
const PillboxListGroup = (props: IProps) => {
    const {
        pillboxList,
        activePillbox,
        onSelect,
        clientId,
        pillboxItemList,
        logPillbox
    } = props;

    const [, setPillbox] = useGlobal('__pillbox');
    const [showPillboxDeleteConfirm, setShowPillboxDeleteConfirm] = useState(false);
    const [pillboxInfo, setPillboxInfo] = useState<PillboxRecord | null>(null);
    const [pillboxHistory, setPillboxHistory] =
        useState(activePillbox?.Id ? getPillboxLogDateString(activePillbox.Id) : null);
    const [logDisabled, setLogDisabled] = useState(false);

    useEffect(() => {
        const pillboxSome = pillboxItemList.some(i => i.PillboxId === activePillbox?.Id && i.Quantity > 0);
        if (!pillboxSome) {
            setLogDisabled(true);
        } else {
            setLogDisabled(isPillboxLogToday(activePillbox?.Id || 0));
        }
    }, [pillboxHistory, pillboxItemList, activePillbox]);

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
     * Return the pillboxHistory as a nicely formatted date time string
     * @param {number} n
     */
    const getPillboxLogAsFormattedDateString = (n: number): string => {
        const logDate = getPillboxLogDate(n)
        return logDate ?
            logDate.toLocaleDateString() + ' ' + logDate.toLocaleTimeString() : '';
    }

    const handleLogPillbox = () => {
        const now = setPillboxLogDate(activePillbox?.Id as number);
        setPillboxHistory(now);
        logPillbox();
    }

    /**
     * Work-around so React 17 can be used
     * @link https://github.com/react-bootstrap/react-bootstrap/issues/5409#issuecomment-718699584
     */
    return (
        <>
            <ListGroup>
                <ListGroup.Item>
                    <TooltipButton
                        onClick={(e) => {
                            e.preventDefault();
                            const pillboxRecord = {...newPillboxRecord};
                            pillboxRecord.ResidentId = clientId;
                            setPillboxInfo(pillboxRecord);
                        }}
                        placement="top"
                        size="sm"
                        tooltip="Add new Pillbox"
                        variant="info"
                    >
                        + Pillbox
                    </TooltipButton>

                    {activePillbox &&
                        <>
                            <Button
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
                    {activePillbox ?
                        (<DropdownButton
                            title={activePillbox.Name}
                            onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
                        >
                            {pillboxList.map(PillboxItem)}
                        </DropdownButton>) : (
                            <Card className="mt-2">
                                <Card.Body>
                                    There are no Pillboxes. Click on the + Pillbox button to add one.
                                </Card.Body>
                            </Card>
                        )
                    }
                </ListGroup.Item>

                {activePillbox &&
                    <ListGroup.Item>
                        <Button
                            disabled={logDisabled}
                            variant={logDisabled ? "outline-info" : "info"}
                            onClick={() => handleLogPillbox()}
                        >
                            Log Pillbox {activePillbox.Name}
                        </Button>
                    </ListGroup.Item>
                }

                {logDisabled && activePillbox?.Id &&
                    <ListGroup.Item>
                        <Alert
                            variant="danger"
                        >
                            <Alert.Heading>
                                Pillbox <b>{activePillbox.Name}</b> logged earier today at {" "}
                                {activePillbox.Id ? getPillboxLogAsFormattedDateString(activePillbox.Id) : null}
                            </Alert.Heading>
                            <Button
                                variant="danger"
                                onClick={() => handleLogPillbox()}
                            >
                                Log Pillbox <b>{activePillbox?.Name}</b> Anyway?
                            </Button>
                        </Alert>

                    </ListGroup.Item>
                }
            </ListGroup>


            {pillboxInfo &&
                <PillboxEdit
                    onClose={
                        (r) => {
                            setPillboxInfo(null);
                            if (r) setPillbox({action: "update", payload: r});
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
                            setShowPillboxDeleteConfirm(false)
                            setPillbox({action: 'delete', payload: activePillbox?.Id as number});
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
