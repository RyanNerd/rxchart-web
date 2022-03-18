/* eslint-disable complexity */
import DrugNameDropdown from 'components/Pages/Buttons/DrugNameDropdown';
import TooltipContainer from 'components/Pages/Containters/TooltipContainer';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import React, {useEffect, useRef, useState} from 'reactn';
import {MedicineRecord} from 'types/RecordTypes';
import {BsColor, isDateFuture, isDayValid, isMonthValid, isYearValid} from 'utility/common';

interface IProps {
    allowDelete?: boolean;
    drugInfo: MedicineRecord;
    existingDrugs?: string[];
    fullName?: string;
    onClose: (r: MedicineRecord | null) => void;
    show: boolean;
}

type ValidStatus = '' | 'is-invalid';

/**
 * Edit Modal for Medicine
 * @param {IProps} props Props for the component
 */
const MedicineEdit = (props: IProps) => {
    const {allowDelete = false, onClose, fullName, existingDrugs = []} = props;

    const [drugInfo, setDrugInfo] = useState<MedicineRecord>(props.drugInfo);
    useEffect(() => {
        if (props.drugInfo) {
            const info = {...props.drugInfo};
            for (const field of [
                'Directions',
                'Notes',
                'OtherNames',
                'Strength',
                'Barcode',
                'FillDateMonth',
                'FillDateDay',
                'FillDateYear'
            ]) {
                if (info[field] === null) info[field] = '';
            }
            setDrugInfo(info);
        }
    }, [props.drugInfo]);

    const [show, setShow] = useState(props.show);
    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    const [fillDateValidStatus, setFillDateValidStatus] = useState<ValidStatus>('');
    const [fillDateMonthValidStatus, setFillDateMonthValidStatus] = useState<ValidStatus>('');
    const [fillDateDayValidStatus, setDateDayValidStatus] = useState<ValidStatus>('');
    const [fillDateYearValidStatus, setFillDateYearValidStatus] = useState<ValidStatus>('');
    useEffect(() => {
        // Check if any of the FillDate fields are populated then all need to be populated or all blank
        let cnt = 0;
        const {FillDateMonth = '', FillDateYear = '', FillDateDay = ''} = {...drugInfo};
        if (FillDateMonth) cnt++;
        if (FillDateDay) cnt++;
        if (FillDateYear) cnt++;

        // Fill date can't be in the future
        if (cnt === 3) {
            const fillDate = new Date(
                Number.parseInt(FillDateYear as string),
                Number.parseInt(FillDateMonth as string) - 1,
                Number.parseInt(FillDateDay as string)
            );
            if (isDateFuture(fillDate)) cnt = 4;
        }
        setFillDateValidStatus(cnt === 0 || cnt === 3 ? '' : 'is-invalid');

        // prettier-ignore
        setFillDateMonthValidStatus(
            FillDateMonth === '' || FillDateMonth === null ? '' : (isMonthValid(FillDateMonth) ? '' : 'is-invalid')
        );

        // prettier-ignore
        setDateDayValidStatus(
            FillDateDay === '' || FillDateDay === null
                ? ''
                : (isDayValid(FillDateDay as string, FillDateMonth)
                    ? ''
                    : 'is-invalid')
        );

        // prettier-ignore
        setFillDateYearValidStatus(
            FillDateYear === '' || FillDateYear === null
                ? ''
                : (isYearValid(FillDateYear as string, false)
                    ? ''
                    : 'is-invalid')
        );
    }, [drugInfo]);

    const [canSave, setCanSave] = useState(false);
    useEffect(() => {
        // Kludge to give JS time to examine the DOM for changes
        setTimeout(() => {
            setCanSave(document.querySelectorAll('.is-invalid')?.length === 0 && drugInfo?.Drug?.length > 0);
        }, 100);
    }, [drugInfo, setCanSave]);

    const [showExistingDrugAlert, setShowExistingDrugAlert] = useState(false);
    useEffect(() => {
        const drugText = drugInfo?.Drug.split(' ')[0].trim().toLowerCase() || '';
        const existingDrugs = props?.existingDrugs || [];
        if (existingDrugs.some((string_) => drugText === string_.split(' ')[0].trim().split(' ')[0].toLowerCase()))
            setShowExistingDrugAlert(true);
        else setShowExistingDrugAlert(false);
    }, [drugInfo?.Drug, props?.existingDrugs]);

    const drugInput = useRef<HTMLInputElement>(null);
    const strengthInput = useRef<HTMLInputElement>(null);

    /**
     * Fires when a text field or checkbox is changing.
     * @param {React.ChangeEvent<HTMLElement>} changeEvent Change event object
     */
    const handleOnChange = (changeEvent: React.ChangeEvent<HTMLElement>) => {
        const target = changeEvent.target as HTMLInputElement;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        drugInfo[name] = value;
        setDrugInfo({...drugInfo});
    };

    /**
     * Fires when the user clicks on the Save or Cancel, or Delete button
     * @param {string} action "save", "cancel", or "delete"
     */
    const handleHide = (action: 'cancel' | 'save' | 'delete') => {
        if (action === 'save') onClose(drugInfo);
        if (action === 'cancel') onClose(null);
        if (action === 'delete') {
            const medInfo = {...drugInfo};
            medInfo.Id = -(medInfo.Id as number); // Set the Id as negative to indicate a delete operation
            onClose(medInfo);
        }
        setShow(false);
    };

    // Short circuit render if there is no drugInfo record or the drugInfo object is empty
    if (drugInfo === null || Object.keys(drugInfo).length === 0) return null;

    const otc = drugInfo.OTC;
    const drugTitleType = drugInfo.Id ? 'Edit ' : ('Add ' as string);
    const drugName = drugInfo.Id || drugInfo?.Drug.length > 0 ? drugInfo.Drug : 'new drug';

    const modalTitle = otc ? (
        <Modal.Title>
            {drugTitleType} OTC{' '}
            <b style={{color: 'blue'}}>
                <i>{drugName}</i>
            </b>
        </Modal.Title>
    ) : (
        <Modal.Title>
            {drugTitleType}{' '}
            <b style={{color: 'blue'}}>
                <i>{drugName}</i>
            </b>
            <span> for </span>
            <b style={{backgroundColor: 'yellow'}}>{fullName}</b>
        </Modal.Title>
    );

    const otcAlert = (
        <Form.Group as={Row} controlId="otc-alert">
            <Form.Label column sm="2" style={{userSelect: 'none'}}>
                <span style={{color: 'red'}}>
                    <b>OTC Warning</b>
                </span>
            </Form.Label>

            <Col sm="9">
                <Alert variant="danger">
                    <span style={{color: 'red'}}>
                        <b>CAUTION:</b>
                    </span>{' '}
                    Changes to this OTC medicine will affect <b>ALL</b> clients!
                </Alert>
            </Col>
        </Form.Group>
    );

    // noinspection RequiredAttributes TS/Inspector thinks <Typeahead> requires ALL attributes when this is NOT so
    return (
        <Modal
            backdrop="static"
            centered
            onEntered={() => {
                drugInput?.current?.focus();
            }}
            show={show}
            size="lg"
        >
            <Modal.Header onHide={() => onClose(null)} closeButton>
                {modalTitle}
            </Modal.Header>

            <Modal.Body>
                <Form>
                    {otc && drugInfo?.Id && !allowDelete ? otcAlert : null}
                    <Form.Group as={Row}>
                        <Form.Label column sm="2" style={{userSelect: 'none'}}>
                            Drug Name
                        </Form.Label>
                        <Col sm="6">
                            {showExistingDrugAlert && (
                                <Alert variant="warning" style={{textAlign: 'center'}}>
                                    <b>Warning: </b>
                                    <b style={{textTransform: 'capitalize'}}>{drugInfo.Drug}</b>
                                    <span> may already exist</span>
                                </Alert>
                            )}

                            <div className={drugInfo.Drug !== '' ? '' : 'is-invalid'}>
                                {otc ? (
                                    <Form.Control
                                        autoComplete="off"
                                        id="otc-drug-textbox"
                                        name="Drug"
                                        onChange={(changeEvent) => handleOnChange(changeEvent)}
                                        placeholder="OTC Drug Name"
                                        tabIndex={1}
                                        type="text"
                                        value={drugInfo.Drug ? drugInfo.Drug : ''}
                                        ref={drugInput}
                                    />
                                ) : (
                                    <DrugNameDropdown
                                        onChange={(changeEvent) =>
                                            setDrugInfo({...drugInfo, Drug: changeEvent.target.value})
                                        }
                                        onSelect={(s) => {
                                            setDrugInfo({...drugInfo, Drug: s});
                                            // Kludge for JS stupidity focusing on wrong input
                                            setTimeout(() => {
                                                strengthInput?.current?.focus();
                                            }, 300);
                                        }}
                                        initialValue={drugInfo.Drug}
                                        drugInputRef={drugInput}
                                        style={{
                                            backgroundColor: showExistingDrugAlert ? BsColor.warningSoft : undefined
                                        }}
                                        existingDrugs={existingDrugs}
                                    />
                                )}
                            </div>
                            <Form.Control.Feedback type="invalid">Drug Name cannot be blank.</Form.Control.Feedback>
                        </Col>

                        <Form.Label column sm="1" style={{userSelect: 'none'}}>
                            Strength
                        </Form.Label>
                        <Col sm="2">
                            <Form.Control
                                autoComplete="off"
                                name="Strength"
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                placeholder="e.g. 100 MG TABS"
                                ref={strengthInput}
                                tabIndex={2}
                                type="text"
                                value={drugInfo.Strength ? drugInfo.Strength : ''}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2" style={{userSelect: 'none'}}>
                            Other Names
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                name="OtherNames"
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                placeholder="Other names for the drug"
                                tabIndex={-1}
                                type="text"
                                value={drugInfo.OtherNames}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="2" style={{userSelect: 'none'}}>
                            Active
                        </Form.Label>
                        <Col sm="1">
                            <Button size="sm" id={`medicine-active-checkbox-${drugInfo.Id}`} variant="outline-light">
                                <span role="img" aria-label="active">
                                    <Form.Check
                                        checked={drugInfo.Active}
                                        name="Active"
                                        onChange={(changeEvent) => handleOnChange(changeEvent)}
                                        style={{transform: 'scale(2)'}}
                                        tabIndex={-1}
                                    />
                                </span>
                            </Button>
                        </Col>
                        <Col sm="9">
                            {!drugInfo.Active && (
                                <>
                                    <span style={{fontWeight: 'bold'}}>{drugInfo.Drug}</span> will not show in the
                                    medicine dropdown
                                </>
                            )}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="drug-Directions">
                        <Form.Label column sm="2" style={{userSelect: 'none'}}>
                            Directions
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                as="textarea"
                                name="Directions"
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                placeholder="e.g. Take 1 tablet at bedtime"
                                rows={2}
                                tabIndex={3}
                                value={drugInfo.Directions ? drugInfo.Directions : ''}
                            />
                        </Col>
                    </Form.Group>

                    {!otc && (
                        <Form.Group as={Row} controlId="otc-drug-Notes">
                            <Form.Label column sm="2" style={{userSelect: 'none'}}>
                                Notes
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    as="textarea"
                                    name="Notes"
                                    onChange={(changeEvent) => handleOnChange(changeEvent)}
                                    rows={3}
                                    tabIndex={4}
                                    value={(drugInfo && drugInfo.Notes) || ''}
                                />
                            </Col>
                        </Form.Group>
                    )}

                    <Form.Group as={Row} controlId="drug-barcode">
                        <Form.Label column sm="2" style={{userSelect: 'none'}}>
                            Barcode
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                name="Barcode"
                                onChange={(changeEvent) => handleOnChange(changeEvent)}
                                tabIndex={5}
                                type="text"
                                value={drugInfo.Barcode ? drugInfo.Barcode : ''}
                            />
                        </Col>
                    </Form.Group>

                    {!otc && drugInfo && (
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" style={{userSelect: 'none'}}>
                                <span className={fillDateValidStatus}>Fill Date</span>
                                <div className="invalid-feedback">Invalid Fill Date</div>
                            </Form.Label>
                            <Form.Label column sm="1" style={{userSelect: 'none'}}>
                                Month
                            </Form.Label>
                            <Col sm="2">
                                <Form.Control
                                    className={fillDateMonthValidStatus}
                                    name="FillDateMonth"
                                    onChange={(changeEvent) => handleOnChange(changeEvent)}
                                    tabIndex={6}
                                    type="text"
                                    value={drugInfo.FillDateMonth}
                                ></Form.Control>
                                <div className="invalid-feedback">Invalid Month</div>
                            </Col>
                            <Form.Label column sm="1" style={{userSelect: 'none'}}>
                                Day
                            </Form.Label>
                            <Col sm="2">
                                <Form.Control
                                    className={fillDateDayValidStatus}
                                    name="FillDateDay"
                                    onChange={(changeEvent) => handleOnChange(changeEvent)}
                                    tabIndex={7}
                                    type="text"
                                    value={drugInfo.FillDateDay}
                                />
                                <div className="invalid-feedback">Invalid Day</div>
                            </Col>
                            <Form.Label column sm="1" style={{userSelect: 'none'}}>
                                Year
                            </Form.Label>
                            <Col sm={2}>
                                <Form.Control
                                    className={fillDateYearValidStatus}
                                    name="FillDateYear"
                                    onChange={(changeEvent) => handleOnChange(changeEvent)}
                                    tabIndex={8}
                                    type="text"
                                    value={drugInfo.FillDateYear}
                                />
                                <div className="invalid-feedback">Invalid Year</div>
                            </Col>
                        </Form.Group>
                    )}
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => handleHide('cancel')} variant="secondary">
                    Cancel
                </Button>
                <Button
                    disabled={!canSave}
                    onClick={() => handleHide('save')}
                    variant={otc && drugTitleType === 'Edit ' ? 'danger' : 'primary'}
                >
                    Save changes
                </Button>
                {allowDelete && drugInfo.Id && !drugInfo.Active && (
                    <TooltipContainer tooltip={'Permanently Delete Medicine'} placement="right">
                        <Button onClick={() => handleHide('delete')} variant="danger">
                            Delete
                        </Button>
                    </TooltipContainer>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default MedicineEdit;
