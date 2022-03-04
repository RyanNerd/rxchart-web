import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import React, {useEffect, useRef, useState} from 'reactn';
import {FileRecord} from 'types/RecordTypes';
import {getFormattedDate} from 'utility/common';

interface IProps {
    fileInfo: FileRecord;
    show: boolean;
    onHide: () => void;
    onClose: (r: FileRecord | null) => void;
}

const FileEdit = (props: IProps) => {
    const textInput = useRef<HTMLInputElement>(null);
    const {onHide, onClose} = props;
    const [showFileExtensionWarning, setShowFileExtensionWarning] = useState(false);

    const getFileExtension = (fileName: string) => {
        return fileName ? fileName.split('.').pop() : '';
    };

    const [fileInfo, setFileInfo] = useState(props.fileInfo);
    useEffect(() => {
        const fileRecord = {...props.fileInfo};
        if (!fileRecord.Description) {
            fileRecord.Description = '';
        }
        setFileInfo(fileRecord);
    }, [props.fileInfo]);

    const [canSave, setCanSave] = useState(false);
    useEffect(() => {
        if (!fileInfo || fileInfo.FileName?.length === 0) {
            setCanSave(false);
        } else {
            setShowFileExtensionWarning(
                getFileExtension(fileInfo.FileName) !== getFileExtension(props?.fileInfo?.FileName || '')
            );
            setCanSave(true);
        }
    }, [fileInfo, props?.fileInfo?.FileName]);

    const [show, setShow] = useState(props.show);
    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    /**
     * Handle user keyboard changes
     * @param {React.ChangeEvent<HTMLElement>} changeEvent The change event object
     */
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
            <Modal.Header>
                <h2>Edit File/Document Info</h2>
            </Modal.Header>

            <Modal.Body>
                <Form noValidate>
                    <Form.Group as={Row} controlId="formFileName">
                        <Form.Label column sm="2">
                            File Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                autoComplete="off"
                                className={fileInfo.FileName?.length > 0 ? '' : 'is-invalid'}
                                type="input"
                                name="FileName"
                                ref={textInput}
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                value={fileInfo.FileName}
                            />
                            <Form.Control.Feedback type="invalid">File Name can not be blank</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formDescription">
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

                    <Form.Group as={Row} controlId="formSize">
                        <Form.Label column sm="1">
                            Size
                        </Form.Label>
                        <Col sm="3">
                            <Form.Control readOnly={true} value={fileInfo.Size?.toString()} />
                        </Col>
                        <Form.Label column sm="1">
                            Modified
                        </Form.Label>
                        <Col sm="3">
                            <Form.Control
                                readOnly={true}
                                value={fileInfo ? getFormattedDate(fileInfo.Updated || '') : ''}
                            />
                        </Col>
                        <Form.Label column sm="1">
                            Type
                        </Form.Label>
                        <Col sm="3">
                            <Form.Control readOnly={true} value={fileInfo?.MediaType || ''} />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Alert variant="warning" show={showFileExtensionWarning}>
                    WARNING: The file extension changed. This may cause problems.
                </Alert>
                <ButtonGroup>
                    <Button onClick={() => handleHide(false)} variant="secondary">
                        Cancel
                    </Button>
                    <Button disabled={!canSave} onClick={() => handleHide(true)} variant="primary">
                        Save changes
                    </Button>
                </ButtonGroup>
            </Modal.Footer>
        </Modal>
    );
};

export default FileEdit;
