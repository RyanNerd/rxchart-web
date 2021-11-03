import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ToggleButton from 'react-bootstrap/ToggleButton';
import React from 'reactn';
import {ClientRecord} from 'types/RecordTypes';
import {clientDOB, getFormattedDate, getMDY} from 'utility/common';
import {TClient} from 'reactn/default';

interface IProps {
    activeClient: TClient | null;
    onDelete?: (r: ClientRecord) => void;
    onEdit?: (r: ClientRecord) => void;
    onSelected?: (r: ClientRecord) => void;
    residentList: ClientRecord[];
}

/**
 * ResidentGrid component
 * @param {IProps} props The props for this component
 * @returns {JSX.Element}
 */
const ClientGrid = (props: IProps): JSX.Element => {
    const {activeClient, onDelete, onEdit, onSelected, residentList} = props;

    /**
     * Resident Child Table Component
     *
     * @param {object} clientRecord Resident table record object
     */
    const ResidentRow = (clientRecord: ClientRecord) => {
        // Get formatted DOB
        const dob = clientDOB(clientRecord);
        const clientInfo = activeClient && activeClient.clientInfo;

        // Determine if this row is selected [for radio ToggleButtons]
        const isSelected = onSelected && clientRecord.Id === clientInfo?.Id;
        const mdy = getMDY();
        const created = getFormattedDate(clientRecord.Created || mdy.now);
        const updated = getFormattedDate(clientRecord.Updated || mdy.now);
        const fontWeight = isSelected ? 'bold' : undefined;

        return (
            <tr key={`clientRecord-grid-row-${clientRecord.Id}`} id={`clientRecord-grid-row-${clientRecord.Id}`}>
                {onSelected && (
                    <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                        <ToggleButton
                            id={`clientRecord-grid-select-btn-${clientRecord.Id}`}
                            type="checkbox"
                            name="resident-list"
                            variant="outline-info"
                            checked={isSelected || false}
                            onChange={() => onSelected(clientRecord)}
                            value={clientRecord.Id as number}
                        />
                    </td>
                )}

                <td style={{verticalAlign: 'middle', fontWeight}}>{clientRecord.LastName}</td>
                <td style={{verticalAlign: 'middle', fontWeight}}>{clientRecord.FirstName}</td>
                <td style={{verticalAlign: 'middle', fontWeight}}>{clientRecord.Nickname}</td>
                <td style={{verticalAlign: 'middle', fontWeight}}>{dob}</td>
                <td style={{verticalAlign: 'middle', fontWeight}}>{created}</td>
                <td style={{verticalAlign: 'middle', fontWeight}}>{updated}</td>

                {onEdit && (
                    <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                        <Button
                            size="sm"
                            id={`clientRecord-grid-edit-btn-${clientRecord.Id}`}
                            onClick={() => onEdit(clientRecord)}
                        >
                            Edit
                        </Button>
                    </td>
                )}

                {onDelete && !clientRecord.deleted_at && (
                    <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                        <Button
                            size="sm"
                            id={`clientRecord-grid-delete-btn-${clientRecord.Id}`}
                            variant="outline-danger"
                            onClick={() => onDelete(clientRecord)}
                        >
                            <span role="img" aria-label="delete">
                                🗑️
                            </span>
                        </Button>
                    </td>
                )}
            </tr>
        );
    };

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    {onSelected && <th style={{textAlign: 'center'}}>Selected</th>}
                    <th>
                        <span>Last Name</span>
                    </th>
                    <th>
                        <span>First Name</span>
                    </th>
                    <th>
                        <span>Nickname</span>
                    </th>
                    <th>
                        <span>DOB</span>
                    </th>
                    <th>
                        <span>Created</span>
                    </th>
                    <th>
                        <span>Activated</span>
                    </th>
                    {onEdit && <th />}
                    {onDelete && <th />}
                </tr>
            </thead>
            <tbody>{residentList.length > 0 && residentList.map(ResidentRow)}</tbody>
        </Table>
    );
};

export default ClientGrid;
