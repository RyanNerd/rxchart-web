import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import React from "reactn";
import {ResidentRecord} from "types/RecordTypes";
import {clientFullName} from "utility/common";

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
            onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
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
                onClick={()=>handleClick('copy')}
            >
                Copy name to clipboard
            </Dropdown.Item>
            <Dropdown.Item
                onClick={()=>handleClick('hmis')}
            >
                Copy name to clipboard and launch HMIS
            </Dropdown.Item>
            <Dropdown.Divider/>
            <Dropdown.Item
                onClick={()=>handleClick('switch')}
            >
                Switch to a different client
            </Dropdown.Item>
        </DropdownButton>
    )
}

export default ClientButton;
