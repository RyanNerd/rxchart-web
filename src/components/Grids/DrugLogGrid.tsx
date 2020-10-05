import React from 'reactn';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import RxTable from "./RxTable";
import {DrugLogRecord, MedicineRecord} from "../../types/RecordTypes";
import {getFormattedDate, isToday} from "../../utility/common";

interface IProps {
    drugLog?: DrugLogRecord[] | null,
    onEdit?: (e: React.MouseEvent<HTMLElement>, r: DrugLogRecord)=>void,
    onDelete?: (e: React.MouseEvent<HTMLElement>, r: DrugLogRecord)=>void,
    drugId?: number | null,
    medicineList?: MedicineRecord[] | null,
    otcList?: MedicineRecord[] | null,
    condensed?: string,
    showDrugColumn: boolean,
}

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
const DrugLogGrid = (props: IProps): JSX.Element => {
    const {
        drugLog,
        onEdit,
        onDelete,
        drugId,
        medicineList,
        otcList,
        condensed = "false",
        showDrugColumn,
    } = props;

    if (!drugLog || drugLog.length === 0) {
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

    const filteredDrugs = drugId && drugLog ? drugLog.filter(drug => drug && drug.MedicineId === drugId) : drugLog;

    /**
     * Returns the value of the drug column for the given drugId
     *
     * @param {number} drugId
     * @param {string} columnName
     * @returns {null|*}
     */
    const drugColumnLookup = (drugId?: number, columnName?: string) => {
        if (medicineList && drugId && columnName) {
            const medicine = medicineList.filter(drug => drug.Id === drugId);
            if (medicine.length === 1) {
                const drug = medicine[0];
                return drug[columnName];
            }
        }

        if (otcList && columnName) {
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
    const DrugRow = (drug: DrugLogRecord): JSX.Element | null =>
    {
        if (drug === null) {
            return null;
        }

        let drugName = drugColumnLookup(drug.MedicineId, 'Drug');
        if (!drugName || drugName.length === 0) {
            drugName = 'UNKNOWN - Medicine removed!';
        }
        const drugStrength = drugColumnLookup(drug.MedicineId, 'Strength');
        const createdDate = new Date(drug.Created || '');
        const updatedDate = new Date(drug.Updated || '');


        return <tr
            key={'druglog-grid-row-' + drug.Id}
            id={'druglog-grid-row-' + drug.Id}
            style={{color: (isToday(updatedDate)) ? 'blue' : ''}}
        >
            {onEdit &&
                <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <Button
                        size="sm"
                        onClick={e => onEdit(e, drug)}
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
            <td style={{textAlign: 'center', verticalAlign: "middle"}}>{getFormattedDate(createdDate)}</td>
            <td style={{textAlign: 'center', verticalAlign: "middle"}}>{getFormattedDate(updatedDate)}</td>
            <td style={{textAlign: 'center', verticalAlign: "middle"}}>{drug.Notes}</td>
            {onDelete &&
                <td style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <Button
                        size="sm"
                        id={"drug-grid-delete-btn-" + drug.Id}
                        variant="outline-danger"
                        onClick={e => onDelete(e, drug)}
                    >
                        <span role="img" aria-label="delete">🗑️</span>
                    </Button>
                </td>
            }
        </tr>;
    };

    return (
        <RxTable
            condensed={condensed}
            striped
            bordered
            hover
            size="sm"
            style={{tableLayout: "fixed", wordWrap: "break-word"}}
        >
            <thead>
            <tr>
                {onEdit &&
                    <th> </th>
                }
                {showDrugColumn &&
                    <th>
                        Drug
                    </th>
                }
                <th style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <span>Created</span>
                </th>
                <th style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <span>Updated</span>
                </th>
                <th style={{textAlign: 'center', verticalAlign: "middle"}}>
                    <span>Amount</span>
                </th>
                {onDelete &&
                    <th> </th>
                }
            </tr>
            </thead>
            <tbody>
                {drugLog && drugLog.length && filteredDrugs.map(DrugRow)}
            </tbody>
        </RxTable>
    )
}

export default DrugLogGrid;
