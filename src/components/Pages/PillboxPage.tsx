import React, {useEffect, useGlobal, useState} from 'reactn';

import {Alert, Button, Card, Col, Nav, Row, Tab} from "react-bootstrap";

import PillboxEdit from "./Modals/PillboxEdit";
import PillboxItemGrid from "./Grids/PillboxItemGrid";
import TooltipButton from "../Buttons/TooltipButton";
import {newPillboxRecord, PillboxItemRecord, PillboxRecord, ResidentRecord} from "../../types/RecordTypes";
import ConfirmDialogModal from "./Modals/ConfirmDialogModal";
import {BsColors} from "../../utility/common";

interface IProps {
    pillboxList: PillboxRecord[]
    pillboxItemList: PillboxItemRecord[]
    activeResident: ResidentRecord|null
    activeTabKey: string
}

const PillboxPage = (props: IProps) => {
    const [, setPillboxItemObserver] = useGlobal('__pillboxItem');
    const [, setPillbox] = useGlobal('__pillbox');
    const [activePillbox, setActivePillbox] = useState<PillboxRecord|null>(null);
    const [activeResident, setActiveResident] = useState(props.activeResident);
    const [activeTabKey, setActiveTabKey] = useState(props.activeTabKey);
    const [medicineList] = useGlobal('medicineList');
    const [filteredMedicineList, setFilteredMedicineList] = useState(medicineList.filter(m => m.Active));
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
        const pillboxItemCount = (pillboxItems.filter(pbi => pbi.Quantity > 0)).length;

        return (
            <Tab.Pane
                eventKey={id as number}
                key={"pillbox-tab-pane-" + id}
                active={active}
            >
                <Card>
                    <Card.Title>
                        <h5 className="mt-3 ml-2 user-select-none">
                            <span style={{
                                color: BsColors.white,
                                backgroundColor: BsColors.primary,
                                padding: ".5rem 1rem",
                                boxSizing: "border-box",
                                borderRadius: ".25rem"
                            }}
                            >
                                {pillboxName}
                            </span>
                            <span style={{color: BsColors.success, fontWeight: "bold"}}> Drugs</span>
                            {" in the pillbox: "}
                            <span style={{
                                color: pillboxItemCount > 0 ? BsColors.success : BsColors.gray,
                                fontWeight: pillboxItemCount > 0 ? "bold" : undefined
                            }}>
                                {pillboxItemCount}
                            </span>
                        </h5>
                    </Card.Title>
                    <Card.Body>
                        <PillboxItemGrid
                            medicineList={filteredMedicineList}
                            onEdit={r => setPillboxItemObserver({action: "update", payload: r})}
                            pillboxId={id as number}
                            pillboxItemList={pillboxItems}
                            residentId={activeResident?.Id as number}
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
                    onClick={(e) => {
                        e.preventDefault();
                        const pillboxRecord = {...newPillboxRecord};
                        pillboxRecord.ResidentId = activeResident?.Id as number;
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
                        onClick={() => {
                            const pillboxRecord = {...activePillbox};
                            pillboxRecord.ResidentId = activeResident?.Id as number;
                            setPillboxInfo(pillboxRecord);
                        }}
                        size="sm"
                        variant="primary"
                    >
                        Edit {activePillbox.Name}
                    </Button>
                    <Button
                        className="ml-2"
                        onClick={() => {
                            setShowPillboxDeleteConfirm(true);
                        }}
                        size="sm"
                        variant="danger"
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
                                className="flex-column"
                                id={"main-pillbox-nav-" + activeResident.Id}
                                onSelect={(id) => {
                                    setActivePillbox(id ?
                                        pillboxList.find((pb) => pb.Id === parseInt(id)) || null : null);
                                }}
                                variant="pills"
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
                    onClose={
                        (r) => {
                            setPillboxInfo(null);
                            if (r) {
                                setPillbox({action: "update", payload: r});
                            }
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

export default PillboxPage;
