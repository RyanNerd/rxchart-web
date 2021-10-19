import {TPillboxLog} from "components/Pages/MedicinePage";
import Table from "react-bootstrap/Table";
import React from 'reactn';
import {BsColor} from "utility/common";

interface IProps {
    pillboxLogList: TPillboxLog[];
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
            <th style={{textAlign: 'center', verticalAlign: "middle"}} colSpan={3}>Pillbox Log History</th>
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
                    <tr style={{fontWeight: "bold", color: BsColor.success}}>
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
