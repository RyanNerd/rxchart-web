import React, {useEffect, useGlobal, useRef, useState} from 'reactn';

import {Alert, Button, Form, Row, Col, Tab, Nav, Card} from "react-bootstrap";
import TooltipButton from "../Buttons/TooltipButton";
import PillboxEdit from "./Modals/PillboxEdit";
import {newPillboxRecord, PillboxRecord} from "../../types/RecordTypes";

const PillboxPage = () => {
    const [pillboxList] = useGlobal('pillboxList');
    const [pillboxItemList] = useGlobal('pillboxItemList');
    const [activeResident] = useGlobal('activeResident');
    const [, setPillbox] = useGlobal('__pillbox');

    const [pillboxInfo, setPillboxInfo] = useState<PillboxRecord | null>(null);

    const Sonnet = (props: any) => {
        return (
            <Card style={{ width: '18rem' }}>
                {props.type === 1 &&
                <Card.Body>
                    FIRST kakdsfkasdl;kfmjasl;dkfjkl;asdjfl;kasdjfl;kasdjfl;kasdjfl; adsfasfasfasdfasdf
                </Card.Body>
                }
                {props.type === 2 &&
                <Card.Body>
                    SECOND
                    asdkf;asdkl;fk;lasdfj;asdl
                    asdkfas;dkkfj;asldfj
                    askdf;lasdkjf;lasdkj;lkasdj;
                    asdfsadfsadfasdasdfsfadsfadasfd
                </Card.Body>
                }
            </Card>
            );
    }

    const NavItems = (props: any) => {
        return (
            <Nav.Item>
                <Nav.Link eventKey={props.eventKey}>
                    {props.eventText}
                </Nav.Link>
            </Nav.Item>
        )
    }

    const navs =                 [
        {eventKey: "first", eventText: "First"},
        {eventKey: "second", eventText: "second"},
        {eventKey: "third", eventText: "third"}
    ];

    return (
        <>
            <Row>
                <TooltipButton
                    placement="top"
                    tooltip="Add new Pillbox"
                    size="sm"
                    variant="info"
                    onClick={(e) => {
                        const pillboxRecord = {...newPillboxRecord};
                        pillboxRecord.ResidentId = activeResident?.Id as number;
                        setPillboxInfo(pillboxRecord);
                    }}
                >
                    + Pillbox
                </TooltipButton>
            </Row>

            <Row className="mt-3">
                {pillboxList && pillboxList.length > 0 ? (
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Col sm={2}>
                        <Nav variant="pills" className="flex-column">
                            {navs.map(NavItems)}
                        </Nav>
                    </Col>
                    <Col lg={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <Sonnet type={1}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Sonnet type={2}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <span>
                                    Third
                                </span>
                            </Tab.Pane>
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
