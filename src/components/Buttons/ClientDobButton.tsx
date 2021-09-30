import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';
import React from 'reactn';
import {ResidentRecord} from 'types/RecordTypes';
import {clientDOB} from 'utility/common';

// @ts-ignore Some props are completely incompatible and even the type `any` doesn't make TS happy
interface IProps {
    className?: any
    clientRecord: ResidentRecord
    development: boolean
    onSelect?: (choice: string) => void
    disabled?: boolean
}

/**
 * ClientDobButton is a dropdown button that displays the date of birth of the given client record
 * The dropdown shows the client notes if they have any.
 * @param {IProps} props
 */
const ClientDobButton = (props: IProps) => {
    const {
        clientRecord,
        development = true,
        className,
        disabled
    } = props;

    const clientDobComponent = (
        <span style={{fontStyle: development ? "italic" : "bold"}}>
            {clientRecord.Notes && <Badge variant="light">🔔</Badge>}{" "}{clientDOB(clientRecord)}
        </span>
    );

    /**
     * CSS Style override for getting the Dropdown.ItemText to display correctly
     * @link https://stackoverflow.com/a/17887494/4323201
     * Work-around so React 17 can be used
     * @link https://github.com/react-bootstrap/react-bootstrap/issues/5409#issuecomment-718699584
     */
    return (
        <DropdownButton
            className={className}
            disabled={disabled || clientRecord.Notes == null || clientRecord?.Notes?.trim().length === 0}
            id="client-dob-dropdown-button"
            onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
            title={clientDobComponent}
            variant="outline-secondary"
        >
            <Dropdown.Item
                style={{whiteSpace: "normal", width: "300px"}}
            >
                <Dropdown.Header>
                    <h5>Notes</h5>
                </Dropdown.Header>
                <Dropdown.ItemText>
                    {clientRecord.Notes}
                </Dropdown.ItemText>
            </Dropdown.Item>
        </DropdownButton>
    )
}

export default ClientDobButton;
