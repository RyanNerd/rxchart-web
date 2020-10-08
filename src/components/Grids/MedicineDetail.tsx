import Button from "react-bootstrap/Button";
import React from "reactn";
import {MedicineRecord} from "../../types/RecordTypes";

interface IProps {
    drug: MedicineRecord,
    columns?: string[],
    onDelete?: (e: React.MouseEvent<HTMLElement>, r: MedicineRecord) => void,
    onEdit?: (e: React.MouseEvent<HTMLElement>, r: MedicineRecord) => void
}

/**
 * MedicineDetail table row
 *
 * @param {IProps} props
 * @return {JSX.Element}
 */
const MedicineDetail = (props: IProps): JSX.Element => {
    const {
        drug,
        columns = ['Drug', 'Strength', 'Directions', 'Notes', 'Barcode'],
        onDelete,
        onEdit
    } = props;

    return (
        <tr
            // key={keyed + '-grid-row-' + drug.Id}
            id={'med-detail-grid-row-' + drug.Id}
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
