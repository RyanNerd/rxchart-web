import {ReactNode} from 'react';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton, {DropdownButtonProps} from 'react-bootstrap/DropdownButton';
import React from 'reactn';
import {Modify} from 'types/Modify';
import {ClientRecord} from 'types/RecordTypes';
import {clientDOB} from 'utility/common';

interface IProps extends DropdownButtonProps {
    [key: string]: unknown;
    title: ReactNode;
}

type TProps = Modify<
    IProps,
    {
        clientRecord: ClientRecord;
        title?: ReactNode | undefined;
        disabled?: boolean;
    }
>;

interface IDropdownProps extends DropdownButtonProps {
    clientRecord: unknown;
}

/**
 * ClientDobButton is a dropdown button that displays the date of birth of the given client record
 * The dropdown shows the client notes if they have any.
 * @param {IProps} props The props for this component
 */
const ClientDobButton = (props: TProps) => {
    const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    const {
        clientRecord,
        disabled = false,
        title = (
            <span style={{fontStyle: isDevelopment ? 'italic' : 'bold'}}>
                {clientRecord.Notes && <Badge variant="light">🔔</Badge>} {clientDOB(clientRecord)}
            </span>
        )
    } = props;

    const dropdownProps = {...(props as IDropdownProps)};
    delete dropdownProps.clientRecord;

    /**
     * CSS Style override for getting the Dropdown.ItemText to display correctly
     * @param {React.MouseEvent<HTMLElement>} mouseEvent Mouse event object
     * @link https://stackoverflow.com/a/17887494/4323201
     * Work-around so React 17 can be used
     * @link https://github.com/react-bootstrap/react-bootstrap/issues/5409#issuecomment-718699584
     */
    return (
        <DropdownButton
            {...dropdownProps}
            disabled={disabled || clientRecord?.Notes == null || clientRecord?.Notes?.trim().length === 0}
            id="client-dob-dropdown-button"
            onClick={(mouseEvent: React.MouseEvent<HTMLElement>) => mouseEvent.stopPropagation()}
            title={title}
            variant={isDevelopment ? 'outline-danger' : 'outline-secondary'}
        >
            <Dropdown.Item style={{whiteSpace: 'normal', width: '300px'}}>
                <Dropdown.Header>
                    <h5>Notes</h5>
                </Dropdown.Header>
                <Dropdown.ItemText>{clientRecord?.Notes}</Dropdown.ItemText>
            </Dropdown.Item>
        </DropdownButton>
    );
};

export default ClientDobButton;
