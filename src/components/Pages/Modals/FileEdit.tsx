import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import React, {useEffect, useRef, useState} from 'reactn';
import {FileRecord} from 'types/RecordTypes';

interface IProps {
    fileInfo: FileRecord;
    show: boolean;
    onHide: () => void;
    onClose: (r: FileRecord | null) => void;
}

const FileEdit = (props: IProps) => {
    const textInput = useRef<HTMLInputElement>(null);
    const {onHide, onClose} = props;

    const [fileInfo, setFileInfo] = useState(props.fileInfo);
    useEffect(() => {
        const fileRecord = {...props.fileInfo};
        if (!fileRecord.Description) {
            fileRecord.Description = '';
        }
        setFileInfo(fileRecord);
    }, [props.fileInfo]);

    const [show, setShow] = useState(props.show);
    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    const handleOnChange = (changeEvent: React.ChangeEvent<HTMLElement>) => {
        const target = changeEvent.target as HTMLInputElement;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        fileInfo[name] = value;
        setFileInfo({...fileInfo});
    };

    /**
     * Fires when the user clicks on Save or Cancel
     * @param {boolean} shouldSave True if the user clicked save, otherwise false
     */
    const handleHide = (shouldSave: boolean) => {
        if (shouldSave) onClose({...fileInfo});
        else onClose(null);
        setShow(false);
    };

    if (!fileInfo) return null;

    return (
        <Modal
            backdrop="static"
            centered
            onEntered={() => textInput?.current?.focus()}
            onHide={() => onHide()}
            show={show}
            size="lg"
        >
            <Modal.Header>Edit File Info</Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="formFileName">
                        <Form.Label column sm="2">
                            File Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                autoComplete="off"
                                type="input"
                                name="FileName"
                                ref={textInput}
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                value={fileInfo.FileName}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Description
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                autoComplete="off"
                                type="input"
                                name="Description"
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                value={fileInfo.Description as string}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => handleHide(false)} variant="secondary">
                    Cancel
                </Button>
                <Button onClick={() => handleHide(true)} variant="primary">
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FileEdit;
