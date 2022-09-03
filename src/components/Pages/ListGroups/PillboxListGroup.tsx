import PillboxLogGrid from 'components/Pages/Grids/PillboxLogGrid';
import DisabledSpinner from 'components/Pages/ListGroups/DisabledSpinner';
import CheckoutAllModal from 'components/Pages/Modals/CheckoutAllModal';
import Confirm from 'components/Pages/Modals/Confirm';
import MedicineCheckoutModal from 'components/Pages/Modals/MedicineCheckoutModal';
import {TPillboxMedLog} from 'components/Pages/RxTabs/RxPillbox';
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
import {TClient} from 'reactn/default';
import {DrugLogRecord, newDrugLogRecord, newPillboxRecord, PillboxRecord} from 'types/RecordTypes';
import {BsColor, getMedicineRecord, multiSort, SortDirection, getCheckoutList} from 'utility/common';
import '../../../styles/pillbox-list-group.css';
import PillboxEdit from '../Modals/PillboxEdit';

interface IProps {
    activeClient: TClient;
    activePillbox: PillboxRecord | null;
    disabled?: boolean;
    logPillbox: () => void;
    onDelete: (pillboxId: number) => void;
    onEdit: (pillboxRecord: PillboxRecord) => void;
    onSelect: (pillboxId: number) => void;
    pillboxMedLogList: TPillboxMedLog[];
}

interface IPillboxLineItem {
    Drug: string;
    Id: number | null;
    Qty: number;
    Strength: string;
}

/**
 * Pillbox ListGroup
 * @param {IProps} props The props for the component
 */
const PillboxListGroup = (props: IProps) => {
    const {
        activeClient,
        activePillbox,
        disabled = false,
        logPillbox,
        onDelete,
        onEdit,
        onSelect,
        pillboxMedLogList
    } = props;

    const {pillboxList, pillboxItemList, medicineList, clientInfo, drugLogList} = activeClient;

    const firstLoggedPillbox = pillboxMedLogList.find((p) => p.Updated)?.Updated;
    const logTime = firstLoggedPillbox
        ? new Date(firstLoggedPillbox).toLocaleString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
          } as Intl.DateTimeFormatOptions)
        : null;
    const [showPillboxDeleteConfirm, setShowPillboxDeleteConfirm] = useState(false);
    const [pillboxInfo, setPillboxInfo] = useState<PillboxRecord | null>(null);
    const [showPillboxCheckout, setShowPillboxCheckout] = useState(false);
    const clientId = clientInfo.Id;

    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        setShowAlert(logTime !== null);
    }, [activePillbox, logTime]);

    // If there are pillboxes but not an activePillbox then set the activePillbox via the onSelect cb
    useEffect(() => {
        if (pillboxList.length > 0 && !activePillbox) onSelect(pillboxList[0].Id as number);
    }, [pillboxList, activePillbox, onSelect]);

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

    /**
     * Checks out all medicine and brings up the checkout print dialog
     */
    const logAllDrugsCheckedOut = () => {
        const clientId = clientInfo.Id as number;
        const toastQ = [] as DrugLogRecord[];
        for (const m of medicineList) {
            if (m.Active) {
                const drugLog = {...newDrugLogRecord};
                drugLog.Out = 1;
                drugLog.Notes = '** ALL **';
                drugLog.MedicineId = m.Id as number;
                drugLog.ResidentId = clientId;
                toastQ.push(drugLog);
            }
        }

        // if (toastQ.length > 0) {
        //    saveDrugLog(toastQ, clientId)
        //        .then((t) => setToast(t))
        //        .then(() => setShowCheckoutPrint(true));
        // }
    };

    // Build out the pillbox line items content
    const drugsInThePillbox = activePillbox?.Id ? getDrugsInThePillbox() : [];
    const pillboxLineItems: IPillboxLineItem[] = [];
    for (const d of drugsInThePillbox) {
        const medicineRecord = getMedicineRecord(
            d.MedicineId,
            medicineList.filter((m) => m.Active)
        );
        if (medicineRecord) {
            const drugName = medicineRecord.Drug;
            const strength = medicineRecord?.Strength || '';
            const qty = d.Quantity;
            pillboxLineItems.push({Id: d.Id, Drug: drugName, Strength: strength, Qty: qty});
        }
    }

    // const [checkoutList, setCheckoutList] = useState<DrugLogRecord[]>([]);
    // useEffect(() => {
    //    const pillboxCheckoutItems = drugLogList.filter((drugLogItem) =>
    //        drugsInThePillbox.some((inTheBox) => inTheBox.Id === drugLogItem.Id)
    //    );
    //    setCheckoutList(getCheckoutList(pillboxCheckoutItems));
    // }, [drugLogList, drugsInThePillbox]);

    /**
     * Pillbox RadioButton component
     * @param {PillboxRecord} pillboxRecord The pillbox record object
     */
    const PillboxRadioButton = (pillboxRecord: PillboxRecord) => {
        return (
            <ToggleButton
                checked={activePillbox?.Id === pillboxRecord.Id}
                disabled={disabled}
                id={`pb-list-group-radio-btn-${pillboxRecord.Id}`}
                key={pillboxRecord.Id}
                name="radio-pb-list-group"
                onChange={() => onSelect(pillboxRecord.Id as number)}
                size="lg"
                style={{textAlign: 'justify'}}
                type="radio"
                value={pillboxRecord.Id as number}
                variant="outline-primary"
            >
                <span className="ml-2">
                    {disabled && (
                        <>
                            <DisabledSpinner />{' '}
                        </>
                    )}
                    Pillbox: <b style={{textTransform: 'uppercase'}}>{pillboxRecord.Name}</b>
                </span>
            </ToggleButton>
        );
    };

    /**
     * Line Item component for pills in the pillbox
     * @param {IPillboxLineItem} indexPillboxLineItem The pillbox line item
     */
    const PillboxLineItem = (indexPillboxLineItem: IPillboxLineItem) => {
        return (
            <li key={indexPillboxLineItem.Id} id={`pillbox-line-item-${indexPillboxLineItem.Id}`} className="rx-icon">
                {'('} {indexPillboxLineItem.Qty} {') '} {indexPillboxLineItem.Drug} {indexPillboxLineItem.Strength}
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
                            <>
                                {multiSort(pillboxLineItems, {Drug: SortDirection.desc}).map((element) =>
                                    PillboxLineItem(element)
                                )}
                            </>
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
                onClick={() => {
                    logPillbox();
                    setShowAlert(true);
                }}
                size="sm"
                variant={drugsInThePillbox.length === 0 || logTime ? 'outline-warning' : 'primary'}
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

    const CheckoutPillboxButton = () => {
        return (
            <Button
                className="ml-3"
                size="sm"
                variant="outline-secondary"
                disabled={disabled || drugsInThePillbox.length === 0 || showAlert}
                onClick={() => setShowPillboxCheckout(true)}
            >
                Checkout Pillbox
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
                                    className="ml-2"
                                    disabled={disabled}
                                    onClick={() => {
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
                                    className="ml-2 mr-5"
                                    disabled={disabled}
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
                                {drugsInThePillbox.length > 0 && <CheckoutPillboxButton />}
                            </>
                        )}
                    </ButtonGroup>
                </ListGroup.Item>

                {pillboxList.length > 0 ? (
                    <ListGroup.Item>
                        <Row noGutters>
                            <Col xl={5}>
                                <ButtonGroup vertical>
                                    {pillboxList.map((element) => PillboxRadioButton(element))}
                                </ButtonGroup>
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
                    <ListGroup.Item className="pb-group-item">
                        <PillboxLogGrid activeClient={activeClient} pillboxMedLogList={pillboxMedLogList} />
                    </ListGroup.Item>
                )}

                {showAlert && (
                    <ListGroup.Item className="pb-group-item">
                        <Alert className="mb-0" variant="danger" dismissible onClose={() => setShowAlert(false)}>
                            <Alert.Heading className="mb-0">
                                Pillbox <b style={{textTransform: 'uppercase'}}>{activePillbox?.Name}</b> logged today
                                at {logTime}
                            </Alert.Heading>
                        </Alert>
                    </ListGroup.Item>
                )}

                {activePillbox?.Notes && (
                    <ListGroup.Item className="pb-group-item">{activePillbox.Notes}</ListGroup.Item>
                )}
            </ListGroup>

            <PillboxEdit
                clientRecord={clientInfo}
                onClose={(r) => {
                    setPillboxInfo(null);
                    if (r) onEdit(r);
                }}
                pillboxInfo={pillboxInfo as PillboxRecord}
                show={pillboxInfo !== null}
            />

            <Confirm.Modal
                centered
                onSelect={(isAccepted) => {
                    setShowPillboxDeleteConfirm(false);
                    if (isAccepted) onDelete(activePillbox?.Id as number);
                }}
                show={showPillboxDeleteConfirm}
                yesButtonProps={{variant: 'danger'}}
            >
                <Confirm.Header>
                    <Confirm.Title>
                        <h3>Delete Pillbox {activePillbox?.Name}</h3>
                    </Confirm.Title>
                </Confirm.Header>
                <Confirm.Body>
                    <Alert variant="danger">{'Delete Pillbox: ' + activePillbox?.Name}</Alert>
                </Confirm.Body>
            </Confirm.Modal>

            <MedicineCheckoutModal show={showPillboxCheckout} activeClient={activeClient} medsToCheckout={[]} />
        </>
    );
};

export default PillboxListGroup;
