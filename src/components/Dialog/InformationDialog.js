import React, {useEffect, useState} from 'reactn';
import Modal from 'react-bootstrap/Modal';

export default function InformationDialog(props)
{
    const [ show, setShow ] = useState(props.show);
    const body = props.body ? props.body : '';
    const title = props.title ? props.title : 'Information';
    const size = props.size ? props.size : 'sm';
    
    // Observer for show
    useEffect(() => {setShow(props.show)}, [props.show]);

    return (
        <Modal
            size={size}
            show={show}
            backdrop="static"
            centered
            onHide={() => props.onHide()}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {body}
            </Modal.Body>
        </Modal>
    );
}