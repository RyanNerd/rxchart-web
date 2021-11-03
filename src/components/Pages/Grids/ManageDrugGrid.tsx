import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import React from 'reactn';
import {MedicineRecord} from 'types/RecordTypes';

interface IProps {
    onDelete: (r: MedicineRecord) => void;
    onEdit: (r: MedicineRecord) => void;
    onLogDrug: (r: MedicineRecord) => void;
    medicineList: MedicineRecord[];
    checkoutList: MedicineRecord[];
}

/**
 * ManageDrug Table
 * @param {IProps} props The props for this component
 * @returns {JSX.Element}
 */
const ManageDrugGrid = (props: IProps): JSX.Element => {
    const {checkoutList, onDelete, onEdit, onLogDrug, medicineList} = props;

    /**
     * Table row component for each medicine record
     * @param {MedicineRecord} drug Medicine record object
     */
    const TableRow = (drug: MedicineRecord) => {
        const hasCheckout = checkoutList.find((m) => m.Id === drug.Id);

        return (
            <tr
                id={`manage-drug-grid-row-${drug.Id}`}
                key={drug.Id}
                style={{textDecoration: !drug.Active ? 'line-through' : undefined}}
            >
                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                    <Button size="sm" id={`manage-drug-grid-edit-btn-${drug.Id}`} onClick={() => onEdit(drug)}>
                        Edit
                    </Button>
                </td>

                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                    <Button
                        disabled={!drug.Active}
                        variant="info"
                        size="sm"
                        id={`manage-drug-grid-checkout-btn-${drug.Id}`}
                        onClick={() => onLogDrug(drug)}
                    >
                        + Log Drug {!drug.Active && <Badge>🚫</Badge>}
                    </Button>
                </td>

                <td style={{verticalAlign: 'middle'}}>
                    <span>
                        {hasCheckout && <Badge>❎</Badge>} {drug.Drug}
                    </span>
                </td>

                <td style={{verticalAlign: 'middle'}}>{drug.Strength}</td>

                <td style={{verticalAlign: 'middle'}}>{drug.Directions}</td>

                <td style={{verticalAlign: 'middle'}}>{drug.Notes}</td>

                <td style={{verticalAlign: 'middle'}}>{drug.Barcode}</td>

                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                    <Button size="sm" id={`manage-drug-grid-delete-btn-${drug.Id}`} variant={'outline-light'}>
                        <span role="img" aria-label="delete">
                            <Form.Check
                                style={{transform: 'scale(2)'}}
                                checked={drug.Active}
                                onChange={() => onDelete(drug)}
                                name="Active"
                            />
                        </span>
                    </Button>
                </td>
            </tr>
        );
    };

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>{/* Edit */}</th>
                    <th>{/* Checkout */}</th>
                    <th>Drug</th>
                    <th>Strength</th>
                    <th>Directions</th>
                    <th>Notes</th>
                    <th>Barcode</th>
                    <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Active</th>
                </tr>
            </thead>
            <tbody>{medicineList.map(TableRow)}</tbody>
        </Table>
    );
};

export default ManageDrugGrid;
