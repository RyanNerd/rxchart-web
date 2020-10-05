import Button from "react-bootstrap/Button";
import React from "reactn";
import {MedicineRecord} from "../../types/RecordTypes";

/**
 * MedicineDetail table row
 *
 * @param {MedicineRecord} drug
 * @param {string[]} columns
 * @param {React.MouseEvent<HTMLElement>, MedicineRecord} onDelete
 * @param {React.MouseEvent<HTMLElement>, MedicineRecord} onEdit
 * @return {JSX.Element}
 */
const MedicineDetail = (
        drug: MedicineRecord,
        columns: string[],
        onDelete?: (e: React.MouseEvent<HTMLElement>, r: MedicineRecord) => void,
        onEdit?: (e: React.MouseEvent<HTMLElement>, r: MedicineRecord) => void,
    ): JSX.Element => {
    return (
        <tr
            key={'medicine-grid-row-' + drug.Id}
            id={'medicine-grid-row-' + drug.Id}
        >
            {onEdit &&
            <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                < Button
                    size="sm"
                    id={"medicine-edit-btn-" + drug.Id}
                    onClick={(e) => onEdit(e, drug)}
                >
                    Edit
                </Button>
            </td>
            }
            {columns.includes('Drug') &&
                <td>{drug.Drug}</td>
            }
            {columns.includes('Strength') &&
            <td>{drug.Strength}</td>
            }
            {columns.includes('Directions') &&
            <td>{drug.Directions}</td>
            }
            {columns.includes('Notes') &&
                <td>{drug.Notes}</td>
            }
            {columns.includes('Barcode') &&
            <td>{drug.Barcode}</td>
            }
            {onDelete &&
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
            }
        </tr>
    )
};

export default MedicineDetail;
