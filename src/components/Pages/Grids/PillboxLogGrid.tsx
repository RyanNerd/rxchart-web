import Table from "react-bootstrap/Table";
import React from 'reactn';

export type TPillboxLogItem = {
    Notes: string;
    Updated: Date | null | undefined;
    Drug: string; Id: number | null;
    MedicineId: number;
    PillboxId: number;
    Quantity: number | null;
    ResidentId: number;
    Strength: string | null;
}

interface IProps {
    pillboxLogList: TPillboxLogItem[]
}

/**
 * Table showing Drug Notes/Amount and time of logged pillbox drugs
 * @param {IProps} props
 */
const PillboxLogGrid = (props: IProps) => {
    const pillboxLogList = props.pillboxLogList;

    return (
        <Table
            style={{wordWrap: "break-word"}}
            bordered
            size="sm"
            striped
        >
            <tr>
                <th>Drug</th>
                <th>Notes/Amount</th>
                <th>Time</th>
            </tr>
            <tbody>
            {pillboxLogList.map(tpbl => {
                const updated = tpbl.Updated ?
                    new Date(tpbl.Updated).toLocaleString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                    }) : '';
                return (
                    <tr>
                        <td>
                            {tpbl.Drug} {" "} {tpbl.Strength}
                        </td>
                        <td>
                            {tpbl.Notes}
                        </td>
                        <td>
                            {updated}
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
    )
}

export default PillboxLogGrid;
