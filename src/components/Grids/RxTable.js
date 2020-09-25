import React from 'reactn';
import Table from 'react-bootstrap/Table';

const RxTable = (props) => {
    return (
        <Table {...props} className={props.condensed && "w-auto"}>
            {props.children}
        </Table>
    )
}

export default RxTable;