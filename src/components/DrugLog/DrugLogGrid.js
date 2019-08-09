import React from 'reactn';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

/**
 * DrugLogGrid
 * @param {object} props -- props.drugLog & props.onEdit
 * @returns {null|*}
 */
export default function DrugLogGrid(props)
{
    if (!props.drugLog) {
        return null;
    }

    const drugList = props.drugLog;

    const DrugRow = (drug) => {
        return (
            <tr
                key={'druglog-grid-row-' + drug.Id}
                id={'druglog-grid-row-' + drug.Id}
            >
                {props.onEdit &&
                    <td>
                        <Button
                            size="sm"
                            id={"druglog-grid-edit-btn-" + drug.Id}
                            onClick={(e) => props.onEdit(e, drug)}
                        >
                            Edit
                        </Button>
                    </td>
                }
                <td>{drug.Created}</td>
                <td>{drug.Updated}</td>
                <td>{drug.Notes}</td>
            </tr>
        );
    };

    return (
        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                {props.onEdit &&
                    <th> </th>
                }
                <th>
                    <span>Created</span>
                </th>
                <th>
                    <span>Updated</span>
                </th>
                <th>
                    <span>Amount Taken/Notes</span>
                </th>
            </tr>
            </thead>
            <tbody>
                {drugList && drugList.length && drugList.map(DrugRow)}
            </tbody>
        </Table>
    );
}