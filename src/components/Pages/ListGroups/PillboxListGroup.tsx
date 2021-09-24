import {Alert, Button, Card, Dropdown, DropdownButton} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import React, {useEffect, useGlobal, useState} from 'reactn';
import {newPillboxRecord, PillboxItemRecord, PillboxRecord} from "types/RecordTypes";
import {isToday} from "utility/common";
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
        useState(window.localStorage.getItem('pillbox-history-' + activePillbox?.Id));
    const [logDisabled, setLogDisabled] = useState(false);

    useEffect(() => {
        const pbh = window.localStorage.getItem('pillbox-history-' + activePillbox?.Id);
        setPillboxHistory(pbh);
    }, [activePillbox, pillboxHistory]);

    useEffect(() => {
        const pillboxSome = pillboxItemList.some(i => i.PillboxId === activePillbox?.Id && i.Quantity > 0);
        if (!pillboxSome) {
            setLogDisabled(true);
        } else {
            if (pillboxHistory) {
                const pd = JSON.parse(pillboxHistory);
                const dt = new Date(pd);
                const today = isToday(dt);
                setLogDisabled(today);
            } else {
                setLogDisabled(false);
            }
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
     * @param {string} h
     */
    const getPillboxHistoryAsDate = (h: string): string => {
        const ph = JSON.parse(h);
        if (ph) {
            return new Date(ph).toLocaleDateString() + ' ' + new Date(ph).toLocaleTimeString();
        }
        return '';
    }

    const handleLogPillbox = () => {
        const now = JSON.stringify(new Date());
        window.localStorage.setItem('pillbox-history-' + activePillbox?.Id, now);
        setPillboxHistory(now);
        logPillbox()
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

            {logDisabled && pillboxHistory &&
            <ListGroup.Item>
                <Alert
                    variant="danger"
                >
                    <Alert.Heading>
                        Pillbox {activePillbox?.Name} logged earier today at {getPillboxHistoryAsDate(pillboxHistory)}
                    </Alert.Heading>
                    <Button
                        variant="danger"
                        onClick={() => handleLogPillbox()}
                    >
                        Log Pillbox {activePillbox?.Name} Anyway?
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
                        onClick={(e) =>
                        {
                            e.preventDefault();
                            setShowPillboxDeleteConfirm(false)
                            setPillbox({action:'delete', payload: activePillbox?.Id as number});
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
