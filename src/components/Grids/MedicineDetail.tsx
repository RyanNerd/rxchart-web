import Button from "react-bootstrap/Button";
import React from "reactn";
import {MedicineRecord} from "../../types/RecordTypes";

/**
 * MedicineDetail table row
 *
 * @param {object} drug
 * @param {function} onDelete
 * @param {function} onEdit
 * @param {boolean} includeNotes
 * @return {JSX.Element}
 */
const MedicineDetail = (
        drug: MedicineRecord,
        onDelete: Function,
        onEdit: Function,
        includeNotes: boolean
    ): JSX.Element => {
    return (
        <tr
            key={'medicine-grid-row-' + drug.Id}
            id={'medicine-grid-row-' + drug.Id}
        >
            <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                <Button
                    size="sm"
                    id={"medicine-edit-btn-" + drug.Id}
                    onClick={(e) => onEdit(e, drug)}
                >
                    Edit
                </Button>
            </td>
            <td>{drug.Drug}</td>
            <td>{drug.Strength}</td>
            <td>{drug.Directions}</td>
            {includeNotes &&
                <td>{drug.Notes}</td>
            }
            <td>{drug.Barcode}</td>
            <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                <Button
                    size="sm"
                    id={"medicine-grid-delete-btn-" + drug.Id}
                    variant="outline-danger"
                    onClick={(e) => onDelete(e, drug)}
                >
                    <span role="img" aria-label="delete">🗑️</span>
                </Button>
            </td>
        </tr>
    )
};

export default MedicineDetail;
