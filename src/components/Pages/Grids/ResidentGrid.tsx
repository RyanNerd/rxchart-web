import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ToggleButton from 'react-bootstrap/ToggleButton';
import React from 'reactn';
import {ResidentRecord} from "types/RecordTypes";
import {clientDOB, getFormattedDate, getMDY} from "utility/common";

interface IProps {
    activeResident: ResidentRecord | null
    onDelete?: (e: React.MouseEvent<HTMLElement>, r: ResidentRecord) => void
    onEdit?: (e: React.MouseEvent<HTMLElement>, r: ResidentRecord) => void
    onSelected?: (e: React.MouseEvent<HTMLElement>, r: ResidentRecord) => void
    residentList: ResidentRecord[]
}

/**
 * ResidentGrid component
 * @param {IProps} props
 * @returns {JSX.Element}
 */
const ResidentGrid = (props: IProps): JSX.Element => {
    const {
        activeResident,
        onDelete,
        onEdit,
        onSelected,
        residentList
    } = props;

    /**
     * Resident Child Table Component
     *
     * @param {object} resident Resident record object
     * @returns {null | ResidentRow}
     */
    const ResidentRow = (resident: ResidentRecord) => {
        // Get formatted DOB
        const dob = clientDOB(resident);

        // Determine if this row is selected [for radio ToggleButtons]
        const isSelected = onSelected && activeResident && resident.Id === activeResident.Id;
        const mdy = getMDY();
        const created = getFormattedDate(resident.Created || mdy.now);
        const updated = getFormattedDate(resident.Updated || mdy.now);
        const fontWeight = isSelected ? 'bold' : undefined;

        return (
            <tr
                key={'resident-grid-row-' + resident.Id}
                id={'resident-grid-row-' + resident.Id}
            >
                {onSelected &&
                <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <ToggleButton
                        id={"resident-grid-select-btn-" + resident.Id}
                        type="radio"
                        name="resident-list"
                        variant="outline-info"
                        checked={isSelected || false}
                        onClick={(e) => onSelected(e, resident)}
                        value={resident.Id as number}
                    />
                </td>
                }

                <td style={{verticalAlign: "middle", fontWeight}}>{resident.LastName}</td>
                <td style={{verticalAlign: "middle", fontWeight}}>{resident.FirstName}</td>
                <td style={{verticalAlign: "middle", fontWeight}}>{resident.Nickname}</td>
                <td style={{verticalAlign: "middle", fontWeight}}>{dob}</td>
                <td style={{verticalAlign: "middle", fontWeight}}>{created}</td>
                <td style={{verticalAlign: "middle", fontWeight}}>{updated}</td>

                {onEdit &&
                <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <Button
                        size="sm"
                        id={"resident-grid-edit-btn-" + resident.Id}
                        onClick={(e) => onEdit(e, resident)}
                    >
                        Edit
                    </Button>
                </td>
                }

                {onDelete && !resident.deleted_at &&
                <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <Button
                        size="sm"
                        id={"resident-grid-delete-btn-" + resident.Id}
                        variant="outline-danger"
                        onClick={(e) => onDelete(e, resident)}
                    >
                        <span role="img" aria-label="delete">🗑️</span>
                    </Button>
                </td>
                }
            </tr>
        );
    };

    return (
        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                {onSelected &&
                <th style={{textAlign: "center"}}>
                    Selected
                </th>
                }
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
                {onEdit &&
                <th/>
                }
                {onDelete &&
                <th/>
                }
            </tr>
            </thead>
            <tbody>
            {residentList.length > 0 && residentList.map(ResidentRow)}
            </tbody>
        </Table>
    );
}

export default ResidentGrid;
