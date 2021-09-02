import React, {useEffect, useGlobal, useState} from 'reactn';

import {Button, Row, Col, Tab, Nav, Card} from "react-bootstrap";

import PillboxEdit from "./Modals/PillboxEdit";
import PillboxItemGrid from "./Grids/PillboxItemGrid";
import TooltipButton from "../Buttons/TooltipButton";
import {newPillboxRecord, PillboxItemRecord, PillboxRecord, ResidentRecord} from "../../types/RecordTypes";

interface IProps {
    pillboxList: PillboxRecord[]
    pillboxItemList: PillboxItemRecord[]
    activeResident: ResidentRecord|null
    activeTabKey: string
}

const PillboxPage = (props: IProps) => {
    const [activeResident, setActiveResident] = useState(props.activeResident);
    const [pillboxList, setPillboxList] = useState(props.pillboxList);
    const [pillboxItemList, setPillboxItemList] = useState(props.pillboxItemList);
    const [activeTabKey, setActiveTabKey] = useState(props.activeTabKey);
    const [medicineList] = useGlobal('medicineList');
    const [, setPillbox] = useGlobal('__pillbox');
    const [pillboxInfo, setPillboxInfo] = useState<PillboxRecord | null>(null);
    const [activePillbox, setActivePillbox] = useState<PillboxRecord|null>(null);

    /**
     * Fires when the user clicks on a Pillbox selection on the left side
     * @param {string | null} id
     */
    const handleSelect = (id: string | null) => {
        setActivePillbox(id ? pillboxList.find((pb) => pb.Id === parseInt(id)) || null : null);
    }

    // Refresh when props change
    useEffect(() => {
        setActiveResident(props.activeResident);
        setPillboxList(props.pillboxList);
        setPillboxItemList(props.pillboxItemList);
        setActiveTabKey(props.activeTabKey);
        setActivePillbox(props.pillboxList?.length > 0 ? props.pillboxList[0] : null);
    }, [props]);

    // Do not render if the pillbox tab is not the active tab
    if (activeTabKey !== 'pillbox') {
        return null;
    }

    /**
     * Left side Pill Buttons one for each Pillbox record
     * @param {PillboxRecord} pillboxRecord
     */
    const NavItem = (pillboxRecord: PillboxRecord) => {
        const name = pillboxRecord.Name;
        const id = pillboxRecord.Id;
        const active = activePillbox?.Id===id;

        return (
            <Nav.Item
                key={"pillbox-nav-item-" + id}
            >
                <Nav.Link
                    eventKey={id as number}
                    key={"pillbox-nav-link-" + id}
                    active={active}
                >
                    {name}
                </Nav.Link>
            </Nav.Item>
        )
    }

    /**
     * Display of medications for the currentPillbox
     * @param {PillboxRecord} pillboxRecord
     */
    const TabPane = (pillboxRecord: PillboxRecord) => {
        const id = pillboxRecord.Id;
        const pillboxName = pillboxRecord.Name;
        const pillboxNotes = pillboxRecord.Notes;
        const active = activePillbox?.Id === id;

        return (
            <Tab.Pane
                eventKey={id as number}
                key={"pillbox-tab-pane-" + id}
                active={active}
            >
                <Card>
                    <Card.Title>
                        <h4 style={{margin: "5px 5px"}}>
                            {pillboxName}
                        </h4>
                    </Card.Title>
                    <Card.Body>
                        <PillboxItemGrid
                            onEdit={(e, r) => {
                                e.preventDefault();
                                alert('todo: Launch PillboxItemModal. For PillboxItem.Id = ' + r.Id);
                            }}
                            onDelete={(e, r) => {
                                alert('todo: Delete');
                            }}
                            pillboxId={id as number}
                            residentId={activeResident?.Id as number}
                            medicineList={medicineList}
                            pillboxItemList={pillboxItemList}/>
                        <p>
                            currentPillboxId: {activePillbox?.Id}
                            <br/>
                            pillboxId: {id}
                            <br/>
                        </p>
                    </Card.Body>
                    <Card.Footer>
                        <p>
                            {pillboxNotes}
                        </p>
                    </Card.Footer>
                </Card>
            </Tab.Pane>
        )
    }

    return (
        <>
            <Row>
                <TooltipButton
                    placement="top"
                    tooltip="Add new Pillbox"
                    size="sm"
                    variant="info"
                    onClick={(e) => {
                        e.preventDefault();
                        const pillboxRecord = {...newPillboxRecord};
                        pillboxRecord.ResidentId = activeResident?.Id as number;
                        setPillboxInfo(pillboxRecord);
                    }}
                >
                    + Pillbox
                </TooltipButton>
                <Button
                    className="ml-3"
                    variant="success"
                    size="sm"
                    onClick={() => alert('todo: Logic to add pills to the current pillbox')}
                >
                    + Add medication to pillbox
                </Button>
                <Button
                    className="ml-4"
                    variant="primary"
                    size="sm"
                    onClick={() => alert('todo: Logic to add pills to the current pillbox')}
                >
                   Edit {activePillbox?.Name}
                </Button>
                <Button
                    className="ml-3"
                    variant="danger"
                    size="sm"
                    onClick={() => alert('todo: Logic to add pills to the current pillbox')}
                >
                    <span role="img" aria-label="delete">🗑️</span>{" "}Delete {activePillbox?.Name}
                </Button>

            </Row>

            <Row className="mt-3">
                {activeResident && pillboxList && pillboxList.length > 0 ?
                (
                    <Tab.Container
                        id={"tab-container-pillbox" + activeResident.Id}
                    >
                        <Col sm={2} style={{paddingLeft: "0"}}>
                            <Nav
                                id={"main-pillbox-nav-" + activeResident.Id}
                                variant="pills"
                                className="flex-column"
                                onSelect={handleSelect}
                            >
                                {pillboxList.map(NavItem)}
                            </Nav>
                        </Col>
                        <Col sm={10} style={{padding: "5px"}}>
                            <Tab.Content>
                                {pillboxList.map(TabPane)}
                            </Tab.Content>
                        </Col>
                    </Tab.Container>
                ) : (
                    <Card>
                        <Card.Body>
                            There are no Pillboxes. Click on the + Pillbox button to add one.
                        </Card.Body>
                    </Card>
                )
                }
            </Row>

            {pillboxInfo &&
                <PillboxEdit
                    pillboxInfo={pillboxInfo}
                    onClose={
                        (r) => {
                            setPillboxInfo(null);
                            if (r) {
                                setPillbox({action: "update", payload: r});
                            }
                        }
                    }
                show={true}/>
            }
        </>
    )
}

export default PillboxPage;
