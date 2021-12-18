import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ToggleButton from 'react-bootstrap/ToggleButton';
import React from 'reactn';
import {TClient} from 'reactn/default';
import {ClientRecord} from 'types/RecordTypes';
import {clientDOB, getFormattedDate, getMDY} from 'utility/common';

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
 */
const ClientGrid = (props: IProps): JSX.Element => {
    const {activeClient, onDelete, onEdit, onSelected, residentList} = props;

    /**
     * Resident Child Table Component
     * @param {object} clientRecord Resident table record object
     */
    const ResidentRow = (clientRecord: ClientRecord) => {
        const mdy = getMDY();
        const created = getFormattedDate(clientRecord.Created || mdy.now);
        const dob = clientDOB(clientRecord);
        const isSelected = onSelected && clientRecord.Id === activeClient?.clientInfo?.Id;
        const fontWeight = isSelected ? 'bold' : undefined;
        const updated = getFormattedDate(clientRecord.Updated || mdy.now);

        return (
            <tr key={`clientRecord-grid-row-${clientRecord.Id}`} id={`clientRecord-grid-row-${clientRecord.Id}`}>
                {onSelected && (
                    <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                        <ToggleButton
                            checked={isSelected || false}
                            id={`clientRecord-grid-select-btn-${clientRecord.Id}`}
                            name="resident-list"
                            onChange={() => onSelected(clientRecord)}
                            type="checkbox"
                            value={clientRecord.Id as number}
                            variant="outline-info"
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
                            id={`clientRecord-grid-edit-btn-${clientRecord.Id}`}
                            onClick={() => onEdit(clientRecord)}
                            size="sm"
                        >
                            Edit
                        </Button>
                    </td>
                )}
                {onDelete && !clientRecord.deleted_at && (
                    <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                        <Button
                            id={`clientRecord-grid-delete-btn-${clientRecord.Id}`}
                            onClick={() => onDelete(clientRecord)}
                            size="sm"
                            variant="outline-danger"
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
            <tbody>{residentList.length > 0 && residentList.map((element) => ResidentRow(element))}</tbody>
        </Table>
    );
};

export default ClientGrid;
