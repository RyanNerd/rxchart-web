import React from 'reactn';
import {Button, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter} from "react-bootstrap";
import {useEffect, useState} from "react";
import ModalHeader from "react-bootstrap/ModalHeader";

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
    const version = process.env.REACT_APP_VERSION; // @see: https://stackoverflow.com/a/50822003/4323201

    /**
     * Handle when the modal closes
     */
    const handleClose = () => {
        setShowModal(false);
        onHide();
    }

    // Observer on the show prop
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
                        <ul>
                            <li>Version: {version}</li>
                            <li>
                                <a
                                    href="https://github.com/RyanNerd/rxchart-web/releases/latest"
                                    target="_blank"
                                >
                                    Release Detail
                                </a>
                            </li>
                        </ul>
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
                    <ListGroupItem>
                        <h6>Attributions</h6>
                        <ul>
                            <li>Icons made by { }
                                <a
                                    href="https://www.freepik.com"
                                    title="Freepik"
                                >
                                    Freepik
                                </a> from { }
                                <a
                                    href="https://www.flaticon.com/"
                                    title="Flaticon"
                                >
                                    www.flaticon.com
                                </a>
                            </li>
                        </ul>
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
