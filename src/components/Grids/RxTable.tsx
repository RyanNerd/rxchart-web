import React from 'reactn';
import Table from 'react-bootstrap/Table';
import {ReactChildren} from "react";

interface IProps {
    condensed: boolean
    children: ReactChildren
}

/**
 * Subclass of <Table> adding the condensed attribute
 *
 * @param {condensed: boolean, children: ReactChildren} props
 * @constructor
 */
const RxTable = (props: IProps) => {
    const {condensed, children} = props;
    const condensedClass = condensed ? 'w-auto' : '';
    return (
        <Table {...props} className={condensedClass}>
            {children}
        </Table>
    )
}

export default RxTable;
