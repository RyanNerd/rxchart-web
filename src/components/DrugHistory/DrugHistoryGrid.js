import React from 'reactn';
import DrugLogGrid from "../DrugLog/DrugLogGrid";

/**
 * @param props
 * @returns {null|*}
 */
export default function DrugHistoryGrid(props)
{
    if (!props.drugLogList) {
        return null;
    }

    return (
        <>
            <DrugLogGrid
                drugLog={props.drugLogList}
                medicineList={props.medicineList}
                drugId={null}
            />
        </>
    );
}