import React, {useEffect, useGlobal, useState} from 'reactn';

import {Button, Row, Col, Tab, Nav, Card, Alert} from "react-bootstrap";

import PillboxEdit from "./Modals/PillboxEdit";
import PillboxItemGrid from "./Grids/PillboxItemGrid";
import TooltipButton from "../Buttons/TooltipButton";
import {
    newPillboxRecord,
    PillboxItemRecord,
    PillboxRecord,
    ResidentRecord
} from "../../types/RecordTypes";
import ConfirmDialogModal from "./Modals/ConfirmDialogModal";

interface IProps {
    pillboxList: PillboxRecord[]
    pillboxItemList: PillboxItemRecord[]
    activeResident: ResidentRecord|null
    activeTabKey: string
}

const PillboxPage = (props: IProps) => {
    const [, setPillbox] = useGlobal('__pillbox');
    const [activePillbox, setActivePillbox] = useState<PillboxRecord|null>(null);
    const [activeResident, setActiveResident] = useState(props.activeResident);
    const [activeTabKey, setActiveTabKey] = useState(props.activeTabKey);
    const [medicineList] = useGlobal('medicineList');
    const [filteredMedicineList, setFilteredMedicineList] = useState(medicineList.filter((m) => m.Active));
    const [pillboxInfo, setPillboxInfo] = useState<PillboxRecord | null>(null);
    const [pillboxItemList, setPillboxItemList] = useState(props.pillboxItemList);
    const [pillboxList, setPillboxList] = useState(props.pillboxList);
    const [showPillboxDeleteConfirm, setShowPillboxDeleteConfirm] = useState(false);

    // Refresh when props change
    useEffect(() => {
        setActiveResident(props.activeResident);
        setPillboxList(props.pillboxList);
        setPillboxItemList(props.pillboxItemList);
        setActiveTabKey(props.activeTabKey);
        setFilteredMedicineList(medicineList.filter((m) => m.Active));
        setActivePillbox(props.pillboxList?.length > 0 ? props.pillboxList[0] : null);
    }, [props, medicineList]);

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
        const pillboxNotes = pillboxRecord.Notes || '';
        const active = activePillbox?.Id === id;
        const pillboxItems = pillboxItemList.filter(pbi => pbi.PillboxId === id);

        // @ts-ignore
        // @ts-ignore
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
                                // TODO: Create and launch PillboxItemModal
                                alert('todo: Launch PillboxItemModal. For PillboxItem.Id = ' + r.Id);
                            }}
                            pillboxId={id as number}
                            residentId={activeResident?.Id as number}
                            medicineList={filteredMedicineList}
                            pillboxItemList={pillboxItems}
                        />
                    </Card.Body>
                    {pillboxNotes.length > 0 &&
                    <Card.Footer>
                        <p>
                            {pillboxNotes}
                        </p>
                    </Card.Footer>
                    }
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

                {activePillbox &&
                <>
                    <Button
                        className="ml-2"
                        variant="primary"
                        size="sm"
                        onClick={() => {
                            const pillboxRecord = {...activePillbox};
                            pillboxRecord.ResidentId = activeResident?.Id as number;
                            setPillboxInfo(pillboxRecord);
                        }}
                    >
                        Edit {activePillbox.Name}
                    </Button>
                    <Button
                        className="ml-2"
                        variant="danger"
                        size="sm"
                        onClick={() => {
                            setShowPillboxDeleteConfirm(true);
                        }}
                    >
                        <span role="img" aria-label="delete">🗑️</span>{" "}Delete {activePillbox.Name}
                    </Button>
                </>
                }
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
                                onSelect={(id) => {
                                    setActivePillbox(id ?
                                        pillboxList.find((pb) => pb.Id === parseInt(id)) || null : null);
                                }}
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
                )}
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

export default PillboxPage;
