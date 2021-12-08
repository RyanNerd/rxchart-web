import PillPopover from 'components/Pages/Grids/PillPopover';
import {TPillboxMedLog} from 'components/Pages/RxTabs/RxPillbox';
import Table from 'react-bootstrap/Table';
import React from 'reactn';
import {TClient} from 'reactn/default';
import {BsColor, randomString} from 'utility/common';

interface IProps {
    activeClient: TClient;
    pillboxMedLogList: TPillboxMedLog[];
}

/**
 * Table showing Drug Notes/Amount and time of logged pillbox drugs
 * @param {IProps} props The props for this component
 */
const PillboxLogGrid = (props: IProps) => {
    const {activeClient, pillboxMedLogList} = props;
    const {pillboxList, pillboxItemList} = activeClient;

    return (
        <Table style={{wordWrap: 'break-word'}} bordered size="sm" striped>
            <tr>
                <th style={{textAlign: 'center', verticalAlign: 'middle'}} colSpan={3}>
                    Pillbox Log History
                </th>
            </tr>
            <tr>
                <th>Drug</th>
                <th>Notes/Amount</th>
                <th>Time</th>
            </tr>
            <tbody>
                {pillboxMedLogList.map((log) => {
                    const updated = log.Updated
                        ? new Date(log.Updated).toLocaleString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                          })
                        : '';
                    const strikeThrough = log.Active ? undefined : 'line-through';
                    const key = log.PillboxItemId || randomString();

                    return (
                        <tr
                            id={key.toString()}
                            key={`pillbox-log-grid-${key}`}
                            style={{fontWeight: 'bold', color: BsColor.success}}
                        >
                            <td>
                                <span style={{textDecoration: strikeThrough}}>
                                    {log.Drug} {log.Strength}
                                </span>
                            </td>
                            <td>
                                <PillPopover
                                    id={log.PillboxItemId as number}
                                    pillboxItemId={log.PillboxItemId as number}
                                    pillboxItemList={pillboxItemList}
                                    pillboxList={pillboxList}
                                    onPillClick={(n) => n + 1}
                                />{' '}
                                {log.Notes}
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
