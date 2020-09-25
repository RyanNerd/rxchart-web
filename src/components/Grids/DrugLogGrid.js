import React from 'reactn';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import RxTable from "./RxTable";

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
const DrugLogGrid = props => {
    if (!props.drugLog || props.drugLog.length === 0) {
        return <Table
            size="sm"
            style={{tableLayout: "fixed"}}
        >
            <thead>
            <tr>
                <th style={{textAlign: "center"}}>
                    <span>No Medications Logged</span>
                </th>
            </tr>
            </thead>
        </Table>;
    }

    const showDrugColumn = props.showDrugColumn;
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
    const drugColumnLookup = (drugId, columnName) => {
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
    const DrugRow = drug =>
    {
        const drugName = drugColumnLookup(drug.MedicineId, 'Drug');
        const drugStrength = drugColumnLookup(drug.MedicineId, 'Strength');

        return <tr
            key={'druglog-grid-row-' + drug.Id}
            id={'druglog-grid-row-' + drug.Id}
        >
            {props.onEdit &&
                <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <Button
                        size="sm"
                        onClick={e => props.onEdit(e, drug)}
                    >
                        Edit
                    </Button>
                </td>
            }
            {showDrugColumn &&
                <td style={{verticalAlign: "middle"}}>
                    <span><b>{drugName}</b></span> <span>{drugStrength}</span>
                </td>
            }
            <td style={{textAlign: 'center', verticalAlign: "middle"}}>{drug.Created}</td>
            <td style={{textAlign: 'center', verticalAlign: "middle"}}>{drug.Updated}</td>
            <td style={{textAlign: 'center', verticalAlign: "middle"}}>{drug.Notes}</td>
            {props.onDelete &&
                <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <Button
                        size="sm"
                        id={"drug-grid-delete-btn-" + drug.Id}
                        variant="outline-danger"
                        onClick={e => props.onDelete(e, drug)}
                    >
                        <span role="img" aria-label="delete">🗑️</span>
                    </Button>
                </td>
            }
        </tr>;
    };

    return <RxTable
        condensed={props.condensed}
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
            {showDrugColumn &&
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
    </RxTable>;
}

DrugLogGrid.propTypes = {
    drugLog: PropTypes.arrayOf(PropTypes.object),
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    drugId: PropTypes.number,
    condensed: PropTypes.bool,
    medicineList: PropTypes.arrayOf(PropTypes.object),
    otcList: PropTypes.arrayOf(PropTypes.object)
}

export default DrugLogGrid;