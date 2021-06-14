import React from "reactn";

import {Badge, Dropdown, DropdownButton} from "react-bootstrap";

import {clientDOB} from "../../utility/common";
import {ResidentRecord} from "../../types/RecordTypes";

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

    // @see https://stackoverflow.com/a/17887494/4323201 for getting the Dropdown.ItemText to display correctly
    return (
        <DropdownButton
            className={className}
            disabled={disabled || clientRecord.Notes == null || clientRecord?.Notes?.trim().length === 0}
            id="client-dob-dropdown-button"
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
