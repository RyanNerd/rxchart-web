import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalHeader from "react-bootstrap/ModalHeader";
import React from "reactn";

interface IProps {
    show: boolean
    onClose: () => void
}

const About = (props: IProps) => {
    const {
        show,
        onClose
    } = props;

    const version = process.env.REACT_APP_VERSION; // @see: https://stackoverflow.com/a/50822003/4323201

    return (
        <Modal
            show={show}
            onClose={() => onClose()}
            onHide={() => onClose()}
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
                                    rel="noreferrer"
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
                            Report a problem or request a feature
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
                    onClick={() => onClose()}
                >
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default About;
