import React from 'reactn';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

/**
 * DrugLogGrid
 *
 * @param {object} props
 *                 props.drugLog {array<object>}
 *                 props.onEdit {cb}
 *                 props.onDelete {cb}
 *                 props.drugId {number}
 *                 props.medicineList {array<object>}
 * @returns {null|*}
 */
export default function DrugLogGrid(props)
{
    if (!props.drugLog) {
        return null;
    }

    const drugList = props.drugLog;
    const drugId = props.drugId;
    const filteredDrugs = drugId && drugList ? drugList.filter(drug => drug.MedicineId === drugId) : drugList;
    const medicineList = props.medicineList;

    /**
     * Return the name of the drug given the Id of the drug
     *
     * @param drugId
     * @returns {string|null}
     */
    function drugNameLookup(drugId)
    {
        const medicine =  medicineList.filter(drug => drug.Id === drugId);
        if (medicine.length === 1) {
            return medicine[0].Drug;
        }
        return null;
    }

    function drugStrengthLookup(drugId)
    {
        const medicine =  medicineList.filter(drug => drug.Id === drugId);
        if (medicine.length === 1) {
            return medicine[0].Strength;
        }
        return null;
    }

    /**
     * Child component for the table for each drug that has been logged.
     *
     * @param {object} drug
     * @returns {*}
     */
    const DrugRow = (drug) =>
    {
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
                {medicineList &&
                    <td>
                        <span>{drugNameLookup(drug.MedicineId)}</span>
                        <p style={{lineHeight: "1.5em"}}>{drugStrengthLookup(drug.MedicineId)}</p>
                    </td>
                }
                <td>{drug.Created}</td>
                <td>{drug.Updated}</td>
                <td>{drug.Notes}</td>
                {props.onDelete &&
                <td>
                    <Button
                        size="sm"
                        id={"resident-grid-delete-btn-" + drug.Id}
                        variant="outline-danger"
                        onClick={(e) => props.onDelete(e, drug)}
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
                {props.onEdit &&
                    <th> </th>
                }
                {medicineList &&
                    <th>
                        Drug
                    </th>
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
                {props.onDelete &&
                    <th> </th>
                }
            </tr>
            </thead>
            <tbody>
                {drugList && drugList.length && filteredDrugs.map(DrugRow)}
            </tbody>
        </Table>
    );
}