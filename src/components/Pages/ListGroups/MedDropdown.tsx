import React, {useState} from 'reactn';

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import {MedicineRecord, PillboxRecord} from "../../../types/RecordTypes";
import DisabledSpinner from "./DisabledSpinner";
import {forEach} from "react-bootstrap/ElementChildren";

interface IDropdownItem {
    id: number, // zero indicated a divider
    description: string
}

interface IProps {
    disabled?: boolean
    activeId: number // Negative indicates the record is a pillbox
    itemList: IDropdownItem[]
    onSelect: (s: number) => void
}

/**
 * Med Dropdown
 * @param {IProps} props
 * @returns {JSX.Element | null}
 */
const MedDropdown = (props: IProps): JSX.Element | null => {
    const {
        disabled = false,
        activeId,
        itemList,
        onSelect
    } = props;

    // Do not render unless we have the required props.
    if (!itemList || itemList.length === 0) {
        return null;
    }

    const title = itemList.find(i => i.id === activeId)?.description;

    /**
     * Dropdown Items component
     *
     * @param {IDropdownItem} i
     * @returns {JSX.Element}
     */
    const MedDropdownItems = (i: IDropdownItem): JSX.Element => {
        if (i.id === 0) {
            return (
                <Dropdown.Divider/>
            )
        }

        return (
            <Dropdown.Item
                key={i.id.toString()}
                active={i.id === activeId}
                onSelect={(s) => {
                    onSelect(i.id);
                }}>
                {i.description}
            </Dropdown.Item>
        );
    };

    /**
     * Work-around so React 17 can be used
     * @link https://github.com/react-bootstrap/react-bootstrap/issues/5409#issuecomment-718699584
     */
    return (
        <DropdownButton
            disabled={disabled}
            onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
            size="sm"
            title={disabled ? <DisabledSpinner>{title}</DisabledSpinner> : title}
            variant="primary"
        >
            {itemList.map(MedDropdownItems)}
        </DropdownButton>
    )
}

export default MedDropdown;
