import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import React from "reactn";
import {MedicineRecord} from "types/RecordTypes";

interface IProps {
    columns?: string[]
    drug: MedicineRecord
    onDelete?: (e: React.MouseEvent<HTMLElement>, r: MedicineRecord) => void
    onEdit?: (e: React.MouseEvent<HTMLElement>, r: MedicineRecord) => void
    onSelect?: (e: React.MouseEvent<HTMLElement>, r: MedicineRecord) => void
    onLogDrug?: (e: React.MouseEvent<HTMLElement>, r: MedicineRecord) => void
    activeDrug?: MedicineRecord | null
}

/**
 * MedicineDetail table row
 * @param {IProps} props
 * @return {JSX.Element}
 */
const MedicineDetail = (props: IProps): JSX.Element => {
    const {
        columns = ['Drug', 'Strength', 'Directions', 'Notes', 'Barcode'],
        drug,
        onDelete,
        onEdit,
        onSelect,
        onLogDrug,
        activeDrug
    } = props;

    const isSelected = onSelect && activeDrug && activeDrug.Id === drug.Id;

    return (
        <tr
            id={'med-detail-grid-row-' + drug.Id}
        >
            {onEdit &&
            <td style={{textAlign: "center", verticalAlign: "middle"}}>
                < Button
                    size="sm"
                    id={"medicine-edit-btn-row" + drug.Id}
                    onClick={(e) => onEdit(e, drug)}
                >
                    Edit
                </Button>
            </td>
            }
            {onLogDrug &&
                <td style={{textAlign: "center", verticalAlign: "middle"}}>
                    <Button
                        disabled={!drug.Active}
                        variant="info"
                        size="sm"
                        id={"med-checkout-btn-row" + drug.Id}
                        onClick={(e) => onLogDrug(e, drug)}
                        >
                        + Log Drug
                    </Button>
                </td>
            }
            {onSelect &&
            <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                <ToggleButton
                    id={"drug-otc-grid-select-btn-" + drug.Id}
                    type="radio"
                    name="resident-list"
                    variant="outline-info"
                    checked={isSelected || false}
                    onClick={(e) => onSelect(e, drug)}
                    value={drug.Id as number}
                />
            </td>
            }
            {columns.includes('Drug') &&
            <td style={{verticalAlign: "middle"}}>{drug.Drug}</td>
            }
            {columns.includes('Strength') &&
            <td style={{verticalAlign: "middle"}}>{drug.Strength}</td>
            }
            {columns.includes('Directions') &&
            <td style={{verticalAlign: "middle"}}>{drug.Directions}</td>
            }
            {columns.includes('Notes') &&
            <td style={{verticalAlign: "middle"}}>{drug.Notes}</td>
            }
            {columns.includes('Barcode') &&
            <td style={{verticalAlign: "middle"}}>{drug.Barcode}</td>
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
