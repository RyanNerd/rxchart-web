import DrugLogHistoryGrid from 'components/Pages/Grids/DrugLogHistoryGrid';
import DisabledSpinner from 'components/Pages/ListGroups/DisabledSpinner';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, {useEffect, useState} from 'reactn';
import {TClient} from 'reactn/default';
import {DrugLogRecord, MedicineRecord} from 'types/RecordTypes';
import {clientDOB, clientFullName} from 'utility/common';

interface IProps {
    activeClient: TClient;
    onDelete: (drugLogRecord: DrugLogRecord) => void;
    onEdit: (drugLogRecord: DrugLogRecord) => void;
    onPillClick: (pillboxId: number) => void;
    otcList: MedicineRecord[];
    disabled: boolean;
}

/**
 * Drug Log History Table
 * @param {IProps} props The props for this component
 */
const MedDrugLogHistory = (props: IProps) => {
    const {activeClient, onDelete, onEdit, onPillClick, disabled} = props;
    const [printing, setPrinting] = useState(false);

    useEffect(() => {
        if (printing) {
            window.print();

            // Kludge to block JS events until the print dialog goes away (only works in Chrome)
            // see: https://stackoverflow.com/a/24325151/4323201
            setTimeout(() => {
                setPrinting(false);
            }, 100);
        }
    }, [printing]);

    const hasPillboxItems = activeClient.drugLogList.some((d) => d.PillboxItemId);

    return (
        <>
            <ButtonGroup className="d-print-none mr-3 mb-1">
                <Button disabled={disabled} onClick={() => setPrinting(true)} variant="primary" size="sm">
                    {disabled && <DisabledSpinner />} Print
                </Button>
                {hasPillboxItems && <span className="ml-3">💊 indicates drug logged from a Pillbox</span>}
            </ButtonGroup>

            {activeClient && printing && (
                <ul style={{listStyleType: 'none'}}>
                    <li
                        style={{
                            fontSize: '20px',
                            fontWeight: 'bold'
                        }}
                    >
                        {clientFullName(activeClient.clientInfo) + ' DOB: ' + clientDOB(activeClient.clientInfo)}
                    </li>

                    <span style={{fontSize: '12px'}}>
                        <li>
                            <b>LEGEND:</b>{' '}
                            {hasPillboxItems && (
                                <>
                                    <span>💊: </span> <i>Pillbox</i>
                                </>
                            )}
                            <span> Out:</span> <i>Taken out of shelter</i>
                            <span> In:</span> <i>Returned to shelter</i>
                        </li>
                    </span>
                </ul>
            )}

            <div className="mt-3">
                <DrugLogHistoryGrid
                    activeClient={activeClient}
                    onDelete={(drugLogRecord) => onDelete(drugLogRecord)}
                    onEdit={(drugLogRecord) => onEdit(drugLogRecord)}
                    onPillClick={(pillboxId) => onPillClick(pillboxId)}
                />
            </div>
        </>
    );
};

export default MedDrugLogHistory;
