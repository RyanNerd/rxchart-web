import React from 'reactn';
import Table from 'react-bootstrap/Table';

interface IProps {
    condensed: boolean
    children: JSX.Element[] | JSX.Element
    [key: string]: any
}

/**
 * Subclass of <Table> adding the condensed attribute
 *
 * @param {condensed: boolean, children: ReactChildren} props
 * @constructor
 */
const RxTable = (props: IProps): JSX.Element => {
    const {condensed, children} = props;
    const condensedClass = condensed ? 'w-auto' : '';
    return (
        <Table {...props} className={condensedClass}>
            {children}
        </Table>
    )
}

export default RxTable;
