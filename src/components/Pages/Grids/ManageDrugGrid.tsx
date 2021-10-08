import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import React from "reactn";
import {MedicineRecord} from "types/RecordTypes";

interface IProps {
    onDelete: (r: MedicineRecord) => void
    onEdit: (r: MedicineRecord) => void
    onLogDrug: (r: MedicineRecord) => void
    medicineList: MedicineRecord[]
    checkoutMeds: MedicineRecord[]
}

/**
 * ManageDrug Table
 * @param {IProps} props
 * @return {JSX.Element}
 */
const ManageDrugGrid = (props: IProps): JSX.Element => {
    const {
        checkoutMeds,
        onDelete,
        onEdit,
        onLogDrug,
        medicineList
    } = props;

    /**
     * Table row component for each medicine record
     * @param {MedicineRecord} drug
     */
    const TableRow = (drug: MedicineRecord) => {
        const hasCheckout = checkoutMeds.find(m => m.Id === drug.Id);

        return (
            <tr
                id={'manaage-drug-grid-row-' + drug.Id}
                style={{fontStyle: !drug.Active ? 'italic' : 'normal'}}
            >
                <td style={{textAlign: "center", verticalAlign: "middle"}}>
                    < Button
                        size="sm"
                        id={"manage-drug-grid-edit-btn-" + drug.Id}
                        onClick={() => onEdit(drug)}
                    >
                        Edit {hasCheckout && <Badge> ❎</Badge>}
                    </Button>
                </td>

                <td style={{textAlign: "center", verticalAlign: "middle"}}>
                    <Button
                        disabled={!drug.Active}
                        variant="info"
                        size="sm"
                        id={"manage-drug-grid-checkout-btn-" + drug.Id}
                        onClick={() => onLogDrug(drug)}
                    >
                        + Log Drug {!drug.Active && <Badge>🚫</Badge>}
                    </Button>
                </td>

                <td
                    style={{verticalAlign: "middle"}}
                >
                    {drug.Drug}
                </td>

                <td
                    style={{verticalAlign: "middle"}}
                >
                    {drug.Strength}
                </td>

                <td
                    style={{verticalAlign: "middle"}}
                >
                    {drug.Directions}
                </td>

                <td
                    style={{verticalAlign: "middle"}}>
                    {drug.Notes}
                </td>

                <td
                    style={{verticalAlign: "middle"}}
                >
                    {drug.Barcode}
                </td>

                <td
                    style={{textAlign: 'center', verticalAlign: "middle"}}
                >
                    <Button
                        size="sm"
                        id={"manage-drug-grid-delete-btn" + drug.Id}
                        variant={"outline-warning"}
                        onClick={() => onDelete(drug)}
                        disabled={!drug.Active}
                    >
                        <span role="img" aria-label="delete">{"🚫"}</span>
                    </Button>
                </td>
            </tr>
        )
    }

    return (
        <Table
            striped
            bordered
            hover
            size="sm"
        >
            <thead>
            <tr>
                <th></th>
                {/* Edit */}
                <th></th>
                {/* Checkout */}
                <th>
                    Drug
                </th>
                <th>
                    Strength
                </th>
                <th>
                    Directions
                </th>
                <th>
                    Notes
                </th>
                <th>
                    Barcode
                </th>
                <th style={{textAlign: 'center', verticalAlign: "middle"}}>
                    Deactivate
                </th>
            </tr>
            </thead>
            <tbody>
                {medicineList.map(TableRow)}
            </tbody>
        </Table>
    )
}

export default ManageDrugGrid;
