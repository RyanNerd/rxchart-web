import React from 'reactn';
import {Button, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter} from "react-bootstrap";
import {useEffect, useState} from "react";
import ModalHeader from "react-bootstrap/ModalHeader";
import {version} from './../../../../package.json';

interface IProps {
    show: boolean
    onHide: () => void
}

const About = (props: IProps) => {
    const {
        show,
        onHide
    } = props;

    const [showModal, setShowModal] = useState(show);

    const handleClose = () => {
        setShowModal(false);
        onHide();
    }

    useEffect(() => {
        setShowModal(show);
    }, [show]);

    return (
        <Modal
            show={showModal}
            onHide={() => handleClose()}
            centered
            backdrop="static"
        >
            <ModalHeader
                closeButton
            >
                <h3>About RxChart</h3>
            </ModalHeader>
            <ModalBody>
                <ListGroup>
                    <ListGroupItem>
                        Version: {version}
                    </ListGroupItem>
                    <ListGroupItem>
                        Support:
                        <Button
                            variant="link"
                            target="_blank"
                            href="https://github.com/RyanNerd/rxchart-web/issues"
                        >
                            Report a problem
                        </Button>
                    </ListGroupItem>
                    <ListGroupItem>
                        Developer:
                        <Button
                            variant="link"
                            target="_blank"
                            href="https://github.com/RyanNerd"
                        >
                            Ryan Jentzsch
                        </Button>
                    </ListGroupItem>
                </ListGroup>
            </ModalBody>

            <ModalFooter>
                <Button
                    onClick={()=>handleClose()}
                >
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default About;
