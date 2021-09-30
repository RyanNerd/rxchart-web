import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import ListGroup from 'react-bootstrap/ListGroup';
import React, {useGlobal, useState} from 'reactn';
import {newPillboxRecord, PillboxItemRecord, PillboxRecord} from 'types/RecordTypes';
import {getDrugsInThePillbox, getPillboxLogDate, isPillboxLogToday} from 'utility/common';
import TooltipButton from '../../Buttons/TooltipButton';
import ConfirmDialogModal from '../Modals/ConfirmDialogModal';
import PillboxEdit from '../Modals/PillboxEdit';

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
                                title={activePillbox.Name}
                                onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
                            >
                                {pillboxList.map(PillboxItem)}
                            </DropdownButton>
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

                {activePillbox?.Id &&
                    <ListGroup.Item>
                        <Button
                            className="float-right"
                            disabled={getDrugsInThePillbox(activePillbox.Id, pillboxItemList).length === 0 ||
                                isPillboxLogToday(activePillbox.Id)}
                            variant={getDrugsInThePillbox(activePillbox.Id, pillboxItemList).length === 0 ||
                                isPillboxLogToday(activePillbox.Id) ? "outline-info" : "info"}
                            onClick={() => logPillbox()}
                        >
                            + Log Pillbox {activePillbox.Name}
                        </Button>
                    </ListGroup.Item>
                }

                {activePillbox?.Id &&
                    getDrugsInThePillbox(activePillbox.Id, pillboxItemList).length > 0 &&
                    isPillboxLogToday(activePillbox.Id) &&
                    <ListGroup.Item>
                        <Alert
                            variant="danger"
                        >
                            <Alert.Heading>
                                Pillbox <b>{activePillbox.Name}</b> logged earier today at {" "}
                                {activePillbox.Id ? getPillboxLogTime(activePillbox.Id) : null}
                            </Alert.Heading>
                            <Button
                                variant="danger"
                                onClick={() => logPillbox()}
                            >
                                Log Pillbox <b>{activePillbox?.Name}</b> Anyway?
                            </Button>
                        </Alert>

                    </ListGroup.Item>
                }
            </ListGroup>

            {/*Add/Edit Pillbox Modal*/}
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
