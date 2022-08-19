import Table from 'react-bootstrap/Table';
import React from 'reactn';
import {randomString} from 'utility/common';

interface IProps {
    lookupList: {Drug: string; LastName: string; FirstName: string}[];
}

const RxLookupGrid = (props: IProps) => {
    const lookupList = props.lookupList;

    return (
        <Table bordered size="sm" striped>
            <tr>
                <th>Client</th>
                <th>Drug</th>
            </tr>
            <tbody>
                {lookupList.map((rxItem, index) => {
                    const key = index || randomString();

                    return (
                        <tr id={key.toString()} key={`rx-lookup-grid-${key}`}>
                            <td>{rxItem.FirstName.trim() + ' ' + rxItem.LastName.trim()}</td>
                            <td>{rxItem.Drug}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default RxLookupGrid;
