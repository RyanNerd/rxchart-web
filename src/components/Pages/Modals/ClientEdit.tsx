import {IClientProvider} from 'providers/ClientProvider';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import React, {useEffect, useRef, useState} from 'reactn';
import {ClientRecord} from 'types/RecordTypes';
import {clientFullName, getFormattedDate, isDateFuture, isDayValid, isMonthValid, isYearValid} from 'utility/common';

interface IProps {
    clientInfo: ClientRecord;
    clientProvider: IClientProvider;
    onClose: (r: ClientRecord | null) => void;
    show: boolean;
}

/**
 * Edit Modal for Client
 * @param {IProps} props Props for the component
 */
const ClientEdit = (props: IProps): JSX.Element | null => {
    const clientProvider = props.clientProvider;
    const [isDupe, setIsDupe] = useState(false);

    const [clientInfo, setClientInfo] = useState<ClientRecord>(props.clientInfo);
    useEffect(() => {
        if (props.clientInfo) {
            const info = {...props.clientInfo};
            if (info.Notes === null) info.Notes = '';
            if (info.Nickname === null) info.Nickname = '';
            if (info.HMIS === null) info.HMIS = 0;
            if (info.EnrollmentId === null) info.EnrollmentId = 0;
            setClientInfo(info);
        }
    }, [props.clientInfo]);

    const [show, setShow] = useState(props.show);
    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    const [canSave, setCanSave] = useState(true);
    useEffect(() => {
        setCanSave(document.querySelectorAll('.is-invalid')?.length === 0);
    }, [clientInfo, setClientInfo]);

    const onClose = props.onClose;
    const focusReference = useRef<HTMLInputElement>(null);

    /**
     * Fires when a text field or checkbox is changing.
     * @param {React.KeyboardEvent<HTMLElement>} changeEvent Keyboard event object
     */
    const handleOnChange = (changeEvent: React.ChangeEvent<HTMLElement>) => {
        const target = changeEvent.target as HTMLInputElement;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        clientInfo[name] = value;
        setClientInfo({...clientInfo});
    };

    /**
     * Called each time focus is changed on fields that could be a duplicate
     */
    const checkForDuplicates = async () => {
        const searchCriteria = {
            where: [
                ['FirstName', '=', clientInfo.FirstName],
                ['LastName', '=', clientInfo.LastName],
                ['DOB_YEAR', '=', clientInfo.DOB_YEAR],
                ['DOB_MONTH', '=', clientInfo.DOB_MONTH],
                ['DOB_DAY', '=', clientInfo.DOB_DAY],
                ['Id', '<>', clientInfo.Id]
            ],
            withTrashed: true
        };
        const dupe = await clientProvider.search(searchCriteria);
        setIsDupe(dupe.length > 0);
        return dupe;
    };

    /**
     * Fires when the user clicks on save or cancel
     * @param {boolean} shouldSave Set to true if the user clicked the save button, otherwise false
     */
    const handleHide = async (shouldSave: boolean) => {
        if (shouldSave) {
            if (isDupe) {
                const dupes = await checkForDuplicates();
                // Sanity check
                if (dupes.length > 0) {
                    const activatedClient = await clientProvider.restore(dupes[0].Id as number);
                    onClose({...activatedClient});
                } else {
                    // Something is seriously wrong here. Should never get here.
                }
            } else {
                onClose({...clientInfo});
            }
        } else {
            onClose(null);
        }
        setShow(false);
    };

    /**
     * Verify the DOB
     * @returns {boolean} true if valid, otherwise false
     */
    const isDobValid = (): boolean => {
        const dobYear = clientInfo.DOB_YEAR.toString();
        const dobMonth = clientInfo.DOB_MONTH.toString();
        const dobDay = clientInfo.DOB_DAY.toString();
        const dob = new Date(
            clientInfo.DOB_YEAR as number,
            clientInfo.DOB_MONTH as number,
            clientInfo.DOB_DAY as number
        );

        return dobYear !== '' && dobMonth !== '' && dobDay !== ''
            ? isYearValid(dobYear, true) && isMonthValid(dobMonth) && isDayValid(dobDay, dobMonth) && !isDateFuture(dob)
            : false;
    };

    // Prevent render if there is no data.
    if (!clientInfo) return null;

    return (
        <Modal backdrop="static" centered onEntered={() => focusReference?.current?.focus()} show={show} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {clientInfo.Id ? 'Edit ' : 'Add '}
                    <span style={{backgroundColor: 'yellow'}}>{clientFullName(clientInfo)}</span>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form noValidate>
                    <Form.Group as={Row} controlId="resident-first_name">
                        <Form.Label column sm="2">
                            First Name
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control
                                autoComplete="off"
                                className={clientInfo.FirstName !== '' ? '' : 'is-invalid'}
                                name="FirstName"
                                onBlur={() => {
                                    if (props.clientInfo.FirstName !== clientInfo.FirstName) {
                                        checkForDuplicates();
                                    }
                                }}
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                ref={focusReference}
                                required
                                type="text"
                                value={clientInfo.FirstName}
                            />
                            <Form.Control.Feedback type="invalid">First name can not be blank.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="resident-last_name">
                        <Form.Label column sm="2">
                            Last Name
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control
                                autoComplete="off"
                                className={clientInfo.LastName !== '' ? '' : 'is-invalid'}
                                name="LastName"
                                onBlur={() => {
                                    if (props.clientInfo.LastName !== clientInfo.LastName) {
                                        checkForDuplicates();
                                    }
                                }}
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                required
                                type="text"
                                value={clientInfo.LastName}
                            />
                            <Form.Control.Feedback type="invalid">Last name can not be blank.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="client-nickname">
                        <Form.Label column sm="2">
                            Nickname
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control
                                autoComplete="off"
                                name="Nickname"
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                required
                                type="text"
                                value={clientInfo.Nickname}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            <span className={isDobValid() ? '' : 'is-invalid'}>DOB</span> <span>Month</span>
                            <Form.Control.Feedback type="invalid">Invalid Date of Birth</Form.Control.Feedback>
                        </Form.Label>
                        <Col sm="2">
                            <Form.Control
                                autoComplete="off"
                                className={isMonthValid(clientInfo.DOB_MONTH.toString()) ? '' : 'is-invalid'}
                                name="DOB_MONTH"
                                onBlur={() => {
                                    if (props.clientInfo.DOB_MONTH !== clientInfo.DOB_MONTH) {
                                        checkForDuplicates();
                                    }
                                }}
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                required
                                type="text"
                                value={clientInfo.DOB_MONTH}
                            />
                            <Form.Control.Feedback>Enter the month (1-12).</Form.Control.Feedback>
                        </Col>

                        <Form.Label column sm={1}>
                            Day
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Control
                                autoComplete="off"
                                className={
                                    isDayValid(clientInfo.DOB_DAY.toString(), clientInfo.DOB_MONTH.toString())
                                        ? ''
                                        : 'is-invalid'
                                }
                                name="DOB_DAY"
                                onBlur={() => {
                                    if (props.clientInfo.DOB_DAY !== clientInfo.DOB_DAY) {
                                        checkForDuplicates();
                                    }
                                }}
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                required
                                type="text"
                                value={clientInfo.DOB_DAY}
                            />
                            <Form.Control.Feedback type="invalid">Enter a valid day.</Form.Control.Feedback>
                        </Col>
                        <Form.Label column sm={1}>
                            Year
                        </Form.Label>
                        <Col sm={3}>
                            <Form.Control
                                autoComplete="off"
                                className={isYearValid(clientInfo.DOB_YEAR.toString(), true) ? '' : 'is-invalid'}
                                name="DOB_YEAR"
                                onBlur={() => {
                                    if (props.clientInfo.DOB_YEAR !== clientInfo.DOB_YEAR) {
                                        checkForDuplicates();
                                    }
                                }}
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                required
                                type="text"
                                value={clientInfo.DOB_YEAR}
                            />
                            <Form.Control.Feedback type="invalid">Enter a valid birth year.</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            HMIS #
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control
                                autoComplete="off"
                                type="number"
                                name="HMIS"
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                value={clientInfo.HMIS}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            EnrollmentId
                        </Form.Label>
                        <Col sm="4">
                            <Form.Control
                                autoComplete="off"
                                type="number"
                                name="EnrollmentId"
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                value={clientInfo.EnrollmentId}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Notes
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                as="textarea"
                                className={clientInfo?.Notes?.trim().length > 500 ? 'is-invalid' : ''}
                                name="Notes"
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                rows={4}
                                value={clientInfo.Notes}
                            />
                            <Form.Control.Feedback type="invalid">
                                Notes can only be 500 characters long. length={clientInfo?.Notes?.trim().length}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <span style={{paddingRight: '40%'}}>
                    Updated: {clientInfo.Updated ? getFormattedDate(clientInfo.Updated) : null}
                </span>

                <Button onClick={() => handleHide(false)} variant="secondary">
                    Cancel
                </Button>

                {clientInfo.Id !== null ? (
                    <>
                        <Button
                            className={isDupe ? 'is-invalid' : ''}
                            disabled={!canSave}
                            onClick={() => handleHide(true)}
                            style={{cursor: canSave ? 'pointer' : 'not-allowed'}}
                            variant="primary"
                        >
                            Save changes
                        </Button>
                        <Form.Control.Feedback type="invalid" style={{textAlign: 'right'}}>
                            This client already exists
                        </Form.Control.Feedback>
                    </>
                ) : (
                    <Button
                        disabled={!canSave}
                        onClick={() => handleHide(true)}
                        style={{cursor: canSave ? 'pointer' : 'not-allowed'}}
                        variant="primary"
                    >
                        {isDupe ? <span style={{fontStyle: 'bold'}}>Reactivate Client</span> : <span>Add Client</span>}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default ClientEdit;
