import React from "reactn";
import {clientFullName} from "../../utility/common";
import {ResidentRecord} from "../../types/RecordTypes";
import {Dropdown, DropdownButton} from "react-bootstrap";

// @ts-ignore Some props are completely incompatible and even the type `any` doesn't make TS happy
interface IProps {
    className?: any
    clientRecord: ResidentRecord
    development: boolean
    onSelect?: (choice: string) => void
    disabled?: boolean
    [key: string]: any
}

const ClientButton = (props: IProps) => {
    const {
        clientRecord,
        development = true,
        onSelect,
        className,
        disabled
    } = props;

    const handleClick = (choice: string) => {
        if (onSelect) {
            onSelect(choice);
        }
    }

    const clientName = (
        <span style={{fontStyle: development ? "italic" : "bold"}}>
            {clientFullName(clientRecord)}
        </span>
    );

    return (
        <DropdownButton
            variant="success"
            title={clientName}
            id="client-dropdown-button"
            className={className}
            disabled={disabled}
        >
            <Dropdown.Item
                onClick={()=>handleClick('edit')}
            >
                Edit Client
            </Dropdown.Item>
            <Dropdown.Item
                onClick={()=>handleClick('print')}
            >
                Print Medbox Labels
            </Dropdown.Item>
            <Dropdown.Item
                onClick={()=>handleClick('hmis')}
            >
                Copy name to clipboard and launch HMIS
            </Dropdown.Item>
        </DropdownButton>
    )
}

export default ClientButton;
