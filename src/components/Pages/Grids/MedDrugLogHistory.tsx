import DrugLogHistoryGrid from 'components/Pages/Grids/DrugLogHistoryGrid';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, {useEffect, useState} from 'reactn';
import {DrugLogRecord, MedicineRecord, PillboxItemRecord, PillboxRecord, ResidentRecord} from 'types/RecordTypes';
import {clientDOB, clientFullName} from 'utility/common';

interface IProps {
    activeClient: ResidentRecord;
    drugLogList: DrugLogRecord[];
    medicineList: MedicineRecord[];
    pillboxList: PillboxRecord[];
    pillboxItemList: PillboxItemRecord[];
    onPillClick: (n: number) => void;
    onEdit: (d: DrugLogRecord) => void;
    onDelete: (d: DrugLogRecord) => void;
}

/**
 * Drug Log History Table
 * @param  {IProps} props
 */
const MedDrugLogHistory = (props: IProps) => {
    const {activeClient, drugLogList, medicineList, onDelete, onEdit, pillboxList, pillboxItemList, onPillClick} =
        props;

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

    const hasPillboxItems = drugLogList.some((d) => d.PillboxItemId);

    return (
        <>
            <ButtonGroup className="d-print-none mr-3 mb-1">
                <Button onClick={() => setPrinting(true)} variant="primary" size="sm">
                    Print
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
                        {clientFullName(activeClient) + ' DOB: ' + clientDOB(activeClient)}
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
                    drugLog={drugLogList}
                    medicineList={medicineList}
                    pillboxList={pillboxList}
                    pillboxItemList={pillboxItemList}
                    onPillClick={(n) => onPillClick(n)}
                    onDelete={(d) => onDelete(d)}
                    onEdit={(d) => onEdit(d)}
                />
            </div>
        </>
    );
};

export default MedDrugLogHistory;
