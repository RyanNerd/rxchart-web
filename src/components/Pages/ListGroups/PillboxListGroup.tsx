import {IGridLists} from 'components/Pages/Grids/DrugLogGrid';
import PillboxLogGrid from 'components/Pages/Grids/PillboxLogGrid';
import DisabledSpinner from 'components/Pages/ListGroups/DisabledSpinner';
import {TPillboxMedLog} from 'components/Pages/MedicinePage';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import ToggleButton from 'react-bootstrap/ToggleButton';
import React, {useEffect, useState} from 'reactn';
import {MedicineRecord, newPillboxRecord, PillboxItemRecord, PillboxRecord} from 'types/RecordTypes';
import {BsColor, getDrugName, getMedicineRecord, multiSort, SortDirection} from 'utility/common';
import ConfirmDialogModal from '../Modals/ConfirmDialogModal';
import PillboxEdit from '../Modals/PillboxEdit';

interface IProps {
    activePillbox: PillboxRecord | null;
    disabled?: boolean;
    logPillbox: () => void;
    onDelete: (id: number) => void;
    onEdit: (pb: PillboxRecord) => void;
    onSelect: (n: number) => void;
    gridLists: IGridLists;
    pillboxMedLogList: TPillboxMedLog[];
}

interface IPillboxLineItem {
    Id: number | null;
    Drug: string;
    Strength: string;
    Qty: number;
}

/**
 * Pillbox ListGroup
 * @param {IProps} props The props for the component
 */
const PillboxListGroup = (props: IProps) => {
    const {
        activePillbox,
        disabled = false,
        logPillbox,
        onDelete,
        onEdit,
        onSelect,
        gridLists,
        pillboxMedLogList
    } = props;
    const clientId = activePillbox?.ResidentId;
    const pillboxList = gridLists.pillboxList || ([] as PillboxRecord[]);
    const pillboxItemList = gridLists.pillboxItemList || ([] as PillboxItemRecord[]);
    const medicineList = gridLists.medicineList || ([] as MedicineRecord[]);

    // If there is at least one pillbox (but no active pillbox) then force the first pillbox as the active pillbox
    if (pillboxList.length > 0 && !activePillbox) onSelect(pillboxList[0].Id as number);

    const [showAlert, setShowAlert] = useState(false);
    const [showPillboxDeleteConfirm, setShowPillboxDeleteConfirm] = useState(false);
    const [pillboxInfo, setPillboxInfo] = useState<PillboxRecord | null>(null);

    const firstLoggedPillbox = pillboxMedLogList.find((p) => p.Updated)?.Updated;
    const logTime = firstLoggedPillbox
        ? new Date(firstLoggedPillbox).toLocaleString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
          } as Intl.DateTimeFormatOptions)
        : null;

    // When the activePillbox has already been logged today then setShowAlert to true
    useEffect(() => {
        setShowAlert(logTime !== null);
    }, [activePillbox, logTime]);

    /**
     * Return an array of PillboxItemRecord[] where the Quantity is > 0
     */
    const getDrugsInThePillbox = () => {
        return pillboxItemList.filter((p) => {
            return (
                p.PillboxId === activePillbox?.Id && pillboxItemList.some((pbi) => p.Id === pbi.Id && pbi.Quantity > 0)
            );
        });
    };

    // Build out the pillbox line items content
    const drugsInThePillbox = activePillbox?.Id ? getDrugsInThePillbox() : [];
    const pillboxLineItems: IPillboxLineItem[] = [];
    drugsInThePillbox.forEach((d) => {
        const drugName = getDrugName(d.MedicineId, medicineList);
        if (drugName) {
            const qty = d.Quantity;
            const medicine = getMedicineRecord(d.MedicineId, medicineList);
            const strength = medicine?.Strength || '';
            pillboxLineItems.push({Id: d.Id, Drug: drugName, Strength: strength, Qty: qty});
        }
    });

    const listboxItemStyle = {
        paddingTop: '0.25rem',
        paddingRight: '1.25rem',
        paddingBottom: '0.20rem',
        paddingLeft: '1.25rem'
    };

    if (!clientId) return null;

    /**
     * Pillbox RadioButton component
     * @param {PillboxRecord} pb The pillbox record object
     */
    const PillboxRadioButton = (pb: PillboxRecord) => {
        return (
            <ToggleButton
                disabled={disabled}
                key={pb.Id}
                id={`pb-list-group-radio-btn-${pb.Id}`}
                type="radio"
                name="radio-pb-list-group"
                variant="outline-primary"
                size="lg"
                value={pb.Id as number}
                checked={activePillbox?.Id === pb.Id}
                onChange={() => onSelect(pb.Id as number)}
                style={{textAlign: 'justify'}}
            >
                <span className="ml-2">
                    {disabled && (
                        <>
                            <DisabledSpinner />{' '}
                        </>
                    )}
                    Pillbox: <b style={{textTransform: 'uppercase'}}>{pb.Name}</b>
                </span>
            </ToggleButton>
        );
    };

    /**
     * Line Item component for pills in the pillbox
     * @param {IPillboxLineItem} i The pillbox line item
     */
    const PillboxLineItem = (i: IPillboxLineItem) => {
        return (
            <li key={i.Id} id={`pillbox-line-item-${i.Id}`} className="rx-icon">
                {'('} {i.Qty} {') '} {i.Drug} {i.Strength}
            </li>
        );
    };

    /**
     * PillboxContentCard component
     */
    const PillboxContentCard = () => {
        return (
            <Card>
                <Card.Title className="mb-0">
                    <h3 className="ml-2 mt-1" style={{color: BsColor.blue, textTransform: 'uppercase'}}>
                        <b>{activePillbox?.Name}</b>
                    </h3>
                </Card.Title>
                <Card.Body
                    style={{
                        color: BsColor.white,
                        backgroundColor: pillboxLineItems.length > 0 ? BsColor.success : BsColor.warning
                    }}
                >
                    <ul>
                        {pillboxLineItems.length > 0 ? (
                            <>{multiSort(pillboxLineItems, {Drug: SortDirection.desc}).map(PillboxLineItem)}</>
                        ) : (
                            <>
                                <li style={{listStyleType: 'none'}}>
                                    <b>
                                        {'The '}
                                        <span style={{color: BsColor.blue, textTransform: 'uppercase'}}>
                                            {activePillbox?.Name}
                                        </span>{' '}
                                        {' Pillbox is empty'}
                                    </b>
                                </li>
                                <li style={{listStyleType: 'none', color: BsColor.blue}}>
                                    <hr />
                                </li>
                                <li style={{listStyleType: 'none'}}>
                                    {'Select the number of pills in the pillbox for each medicine ===>'}
                                </li>
                            </>
                        )}
                    </ul>
                </Card.Body>
            </Card>
        );
    };

    /**
     * The + Log Pillbox button component
     */
    const LogPillboxButton = () => {
        return (
            <Button
                disabled={disabled || drugsInThePillbox.length === 0 || showAlert}
                variant={drugsInThePillbox.length === 0 || logTime ? 'outline-warning' : 'primary'}
                size="sm"
                onClick={() => {
                    logPillbox();
                    setShowAlert(true);
                }}
            >
                {disabled && (
                    <>
                        <DisabledSpinner />{' '}
                    </>
                )}
                + Log Pillbox <b style={{textTransform: 'uppercase'}}>{activePillbox?.Name}</b>
                {logTime && (
                    <Badge variant="danger" className="ml-2">
                        {'Logged: ' + logTime}
                    </Badge>
                )}
            </Button>
        );
    };

    return (
        <>
            <ListGroup>
                <ListGroup.Item>
                    <ButtonGroup>
                        <Button
                            disabled={disabled}
                            onClick={() => {
                                const pillboxRecord = {...newPillboxRecord};
                                pillboxRecord.ResidentId = clientId;
                                setPillboxInfo(pillboxRecord);
                            }}
                            size="sm"
                            variant="info"
                        >
                            + Pillbox
                        </Button>

                        {activePillbox && (
                            <>
                                <Button
                                    disabled={disabled}
                                    className="ml-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const pillboxRecord = {...activePillbox};
                                        pillboxRecord.ResidentId = clientId;
                                        setPillboxInfo(pillboxRecord);
                                    }}
                                    size="sm"
                                    variant="info"
                                >
                                    Edit <span style={{textTransform: 'uppercase'}}>{activePillbox.Name}</span>
                                </Button>
                                <Button
                                    disabled={disabled}
                                    className="ml-2 mr-5"
                                    onClick={() => setShowPillboxDeleteConfirm(true)}
                                    size="sm"
                                    variant="danger"
                                >
                                    <span role="img" aria-label="delete" style={{textTransform: 'uppercase'}}>
                                        🗑️
                                    </span>{' '}
                                    Delete <span style={{textTransform: 'uppercase'}}>{activePillbox.Name}</span>
                                </Button>
                                {drugsInThePillbox.length > 0 && <LogPillboxButton />}
                            </>
                        )}
                    </ButtonGroup>
                </ListGroup.Item>

                {pillboxList.length > 0 ? (
                    <ListGroup.Item>
                        <Row noGutters>
                            <Col xl={5}>
                                <ButtonGroup vertical>{pillboxList.map(PillboxRadioButton)}</ButtonGroup>
                            </Col>

                            <Col xl={7}>
                                <PillboxContentCard />
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ) : (
                    <Card className="mt-2">
                        <Card.Body>
                            There are no Pillboxes. Click on the <b>+ Pillbox</b> button to add one.
                        </Card.Body>
                    </Card>
                )}

                {pillboxMedLogList.length > 0 && (
                    <ListGroup.Item style={listboxItemStyle}>
                        <PillboxLogGrid gridLists={gridLists} pillboxMedLogList={pillboxMedLogList} />
                    </ListGroup.Item>
                )}

                {showAlert && (
                    <ListGroup.Item style={listboxItemStyle}>
                        <Alert className="mb-0" variant="danger" dismissible onClose={() => setShowAlert(false)}>
                            <Alert.Heading className="mb-0">
                                Pillbox <b style={{textTransform: 'uppercase'}}>{activePillbox?.Name}</b> logged today
                                at {logTime}
                            </Alert.Heading>
                        </Alert>
                    </ListGroup.Item>
                )}

                {activePillbox?.Notes && (
                    <ListGroup.Item style={listboxItemStyle}>{activePillbox.Notes}</ListGroup.Item>
                )}
            </ListGroup>

            {pillboxInfo && (
                <PillboxEdit
                    onClose={(r) => {
                        setPillboxInfo(null);
                        if (r) onEdit(r);
                    }}
                    pillboxInfo={pillboxInfo}
                    show={true}
                />
            )}

            <ConfirmDialogModal
                centered
                show={showPillboxDeleteConfirm}
                title={<h3>Delete Pillbox {activePillbox?.Name}</h3>}
                body={<Alert variant="danger">{'Delete Pillbox: ' + activePillbox?.Name}</Alert>}
                yesButton={
                    <Button
                        variant="danger"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowPillboxDeleteConfirm(false);
                            onDelete(activePillbox?.Id as number);
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
    );
};

export default PillboxListGroup;
