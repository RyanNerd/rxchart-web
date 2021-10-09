import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import React from "reactn";
import {MedicineRecord} from "types/RecordTypes";

interface IProps {
    onDelete: (r: MedicineRecord) => void
    onEdit: (r: MedicineRecord) => void
    otcList: MedicineRecord[]
}

/**
 * ManageOtc Table
 * @param {IProps} props
 * @return {JSX.Element}
 */
const ManageOtcGrid = (props: IProps): JSX.Element => {
    const {
        onDelete,
        onEdit,
        otcList
    } = props;


    const OtcRow = (drug: MedicineRecord) => {
        return (
            <tr
                id={'med-detail-grid-row-' + drug.Id}
            >
                    <td style={{textAlign: "center", verticalAlign: "middle"}}>
                        < Button
                            size="sm"
                            id={"medicine-edit-btn-row" + drug.Id}
                            onClick={() => onEdit(drug)}
                        >
                            Edit
                        </Button>
                    </td>



                    <td style={{verticalAlign: "middle"}}>{drug.Drug}</td>


                    <td style={{verticalAlign: "middle"}}>{drug.OtherNames}</td>


                    <td style={{verticalAlign: "middle"}}>{drug.Strength}</td>


                    <td style={{verticalAlign: "middle"}}>{drug.Directions}</td>


                    <td style={{verticalAlign: "middle"}}>{drug.Barcode}</td>


                    <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                        <Button
                            size="sm"
                            id={"medicine-grid-delete-btn-" + drug.Id}
                            variant="outline-danger"
                            onClick={ ()=> onDelete(drug)}
                            disabled={!drug.Active}
                        >
                            <span role="img" aria-label="delete">🗑</span>
                        </Button>
                    </td>
            </tr>
        )
    }

    return (
    <Table
        style={{height: "730px", overflowY: "scroll", display: "inline-block"}}
        striped
        bordered
        hover
        size="lg"
    >
        <thead>
        <tr>
            <th></th>
            <th>
                Drug
            </th>
            <th>
                Other Names
            </th>
            <th>
                Strength
            </th>
            <th>
                Directions
            </th>
            <th>
                Barcode
            </th>
            <th style={{textAlign: 'center', verticalAlign: "middle"}}>Delete</th>
        </tr>
        </thead>
        <tbody>
            {otcList.map(OtcRow)}
        </tbody>
    </Table>
    )
};

export default ManageOtcGrid;
