import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import React from 'reactn';
import {MedicineRecord} from 'types/RecordTypes';

interface IProps {
    onDelete: (r: MedicineRecord) => void;
    onEdit: (r: MedicineRecord) => void;
    otcList: MedicineRecord[];
}

/**
 * ManageOtc Table
 * @param {IProps} props The props for this component
 * @returns {JSX.Element}
 */
const ManageOtcGrid = (props: IProps): JSX.Element => {
    const {onDelete, onEdit, otcList} = props;

    const OtcRow = (medicineRecord: MedicineRecord) => {
        return (
            <tr
                key={medicineRecord.Id}
                id={'otc-detail-grid-row-' + medicineRecord.Id}
                style={{textDecoration: !medicineRecord.Active ? 'line-through' : undefined}}
            >
                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                    <Button
                        size="sm"
                        id={'otc-edit-btn-row' + medicineRecord.Id}
                        onClick={() => onEdit(medicineRecord)}
                    >
                        Edit
                    </Button>
                </td>

                <td style={{verticalAlign: 'middle'}}>{medicineRecord.Drug}</td>

                <td style={{verticalAlign: 'middle'}}>{medicineRecord.OtherNames}</td>

                <td style={{verticalAlign: 'middle'}}>{medicineRecord.Strength}</td>

                <td style={{verticalAlign: 'middle'}}>{medicineRecord.Directions}</td>

                <td style={{verticalAlign: 'middle'}}>{medicineRecord.Barcode}</td>

                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                    <Button
                        size="sm"
                        id={'otc-grid-delete-btn-' + medicineRecord.Id}
                        variant="outline-light"
                        onClick={() => onDelete(medicineRecord)}
                    >
                        <span role="img" aria-label="delete">
                            <Form.Check style={{transform: 'scale(2)'}} checked={medicineRecord.Active} name="Active" />
                        </span>
                    </Button>
                </td>
            </tr>
        );
    };

    return (
        <Table style={{height: '730px', overflowY: 'scroll', display: 'inline-block'}} striped bordered hover size="lg">
            <thead>
                <tr>
                    <th></th>
                    <th>Drug</th>
                    <th>Other Names</th>
                    <th>Strength</th>
                    <th>Directions</th>
                    <th>Barcode</th>
                    <th style={{textAlign: 'center', verticalAlign: 'middle'}}>Active</th>
                </tr>
            </thead>
            <tbody>{otcList.map(OtcRow)}</tbody>
        </Table>
    );
};

export default ManageOtcGrid;
