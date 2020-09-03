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
 *                 props.otcList {array<object>}
 * @returns {null|*}
 */
const DrugLogGrid = (props) => {
    if (!props.drugLog || props.drugLog.length === 0) {
        return null;
    }

    const drugList = props.drugLog;
    const drugId = props.drugId;
    const filteredDrugs = drugId && drugList ? drugList.filter(drug => drug.MedicineId === drugId) : drugList;
    const medicineList = props.medicineList;
    const otcList = props.otcList || [];

    /**
     * Returns the value of the drug column for the given drugId
     *
     * @param {number} drugId
     * @param {string} columnName
     * @returns {null|*}
     */
    function drugColumnLookup(drugId, columnName)
    {
        if (medicineList) {
            const medicine = medicineList.filter(drug => drug.Id === drugId);
            if (medicine.length === 1) {
                const drug = medicine[0];
                return drug[columnName];
            }
        }

        if (otcList) {
            const otc = otcList.filter(drug => drug.Id === drugId);
            if (otc.length === 1) {
                const otcDrug = otc[0];
                return otcDrug[columnName];
            }
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
                            onClick={(e) => props.onEdit(e, drug)}
                        >
                            Edit
                        </Button>
                    </td>
                }
                {(medicineList || otcList) &&
                    <td>
                        <span><b>{drugColumnLookup(drug.MedicineId, 'Drug')}</b></span> <span>{drugColumnLookup(drug.MedicineId, 'Strength')}</span>
                        <p>{drugColumnLookup(drug.MedicineId, 'Notes')}</p>
                    </td>
                }
                <td>{drug.Created}</td>
                <td>{drug.Updated}</td>
                <td>{drug.Notes}</td>
                {props.onDelete &&
                <td>
                    <Button
                        size="sm"
                        id={"drug-grid-delete-btn-" + drug.Id}
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
        <Table
            striped
            bordered
            hover
            size="sm"
            style={{tableLayout: "fixed", wordWrap: "break-word"}}
        >
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
                    <span>Amount</span>
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

export default DrugLogGrid;