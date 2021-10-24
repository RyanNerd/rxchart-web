import {TPillboxLog} from 'components/Pages/MedicinePage';
import Table from 'react-bootstrap/Table';
import React from 'reactn';
import {BsColor, randomString} from 'utility/common';

interface IProps {
    pillboxLogList: TPillboxLog[];
}

/**
 * Table showing Drug Notes/Amount and time of logged pillbox drugs
 * @param {IProps} props The props for this component
 */
const PillboxLogGrid = (props: IProps) => {
    const pillboxLogList = props.pillboxLogList;
    const key = randomString();

    return (
        <Table style={{wordWrap: 'break-word'}} bordered size="sm" striped>
            <th style={{textAlign: 'center', verticalAlign: 'middle'}} colSpan={3}>
                Pillbox Log History
            </th>
            <tr>
                <th>Drug</th>
                <th>Notes/Amount</th>
                <th>Time</th>
            </tr>
            <tbody>
                {pillboxLogList.map((log) => {
                    const updated = log.Updated
                        ? new Date(log.Updated).toLocaleString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                          })
                        : '';
                    const strikeThrough = log.Active ? undefined : 'line-through';
                    return (
                        <tr key={`pillbox-log-grid-${key}`} style={{fontWeight: 'bold', color: BsColor.success}}>
                            <td>
                                <span style={{textDecoration: strikeThrough}}>
                                    {log.Drug} {log.Strength}
                                </span>
                            </td>
                            <td>
                                {'💊 '} {log.Notes}
                            </td>
                            <td>{updated}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default PillboxLogGrid;
