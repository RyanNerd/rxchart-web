/* eslint-disable jsdoc/require-param */
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React from 'reactn';
import {ClientRecord} from 'types/RecordTypes';
import {clientFullName} from 'utility/common';

interface IProps {
    [key: string]: unknown;
    className?: string;
    clientRecord: ClientRecord;
    onSelect: (choice: string) => void;
}

const ClientButton = (props: IProps) => {
    const {clientRecord, onSelect, className} = props;
    const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    const clientName = (
        <span style={{fontStyle: development ? 'italic' : 'bold'}}>{clientFullName(clientRecord, true)}</span>
    );

    /**
     * Work-around so React 17 can be used
     * @link https://github.com/react-bootstrap/react-bootstrap/issues/5409#issuecomment-718699584
     */
    return (
        <DropdownButton
            variant="success"
            title={clientName}
            id="client-dropdown-button"
            className={className}
            onClick={(mouseEvent: React.MouseEvent<HTMLElement>) => mouseEvent.stopPropagation()}
        >
            <Dropdown.Item onClick={() => onSelect('edit')}>Edit Client</Dropdown.Item>
            <Dropdown.Item onClick={() => onSelect('print')}>Print Medbox Labels</Dropdown.Item>
            <Dropdown.Item onClick={() => onSelect('copy')}>Copy name to clipboard</Dropdown.Item>
            <Dropdown.Item onClick={() => onSelect('hmis')}>Copy name to clipboard and launch HMIS</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => onSelect('switch')}>Switch to a different client</Dropdown.Item>
        </DropdownButton>
    );
};

export default ClientButton;
