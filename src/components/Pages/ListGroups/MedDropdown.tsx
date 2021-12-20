import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React from 'reactn';
import DisabledSpinner from './DisabledSpinner';

export interface IDropdownItem {
    description: string;
    id: number; // id === 0 divider, id > 0 medicineId, id < 0 pillboxId
    subtext: string | null;
}

interface IProps {
    activeId: number; // Negative indicates the record is a pillbox
    disabled?: boolean;
    itemList: IDropdownItem[];
    onSelect: (s: number) => void;
}

/**
 * Med Dropdown
 * @param {IProps} props The props for the component
 */
const MedDropdown = (props: IProps): JSX.Element | null => {
    const {disabled = false, activeId, itemList, onSelect} = props;

    // Do not render unless we have the required props.
    if (!itemList || itemList.length === 0) return null;

    const title = itemList.find((dropdownItem) => dropdownItem.id === activeId)?.description;

    /**
     * Dropdown Items component
     * @param {IDropdownItem} dropdownItem The DropDownItem object
     */
    const MedDropdownItems = (dropdownItem: IDropdownItem): JSX.Element => {
        if (dropdownItem.id === 0) return <Dropdown.Divider key={0} />;
        const key = dropdownItem.id < 0 ? 'pillbox-' + dropdownItem.id : 'medicine-' + dropdownItem.id;
        return (
            <Dropdown.Item key={key} active={dropdownItem.id === activeId} onSelect={() => onSelect(dropdownItem.id)}>
                <span>
                    <span style={{display: 'block'}}>{dropdownItem.description}</span>
                    {dropdownItem.subtext && (
                        <span style={{fontSize: '12px', display: 'block'}}>{dropdownItem.subtext}</span>
                    )}
                </span>
            </Dropdown.Item>
        );
    };

    /**
     * Work-around so React 17 can be used
     * @param {React.MouseEvent<HTMLElement>} mouseEvent Mouse event object
     * @link https://github.com/react-bootstrap/react-bootstrap/issues/5409#issuecomment-718699584
     */
    return (
        <DropdownButton
            disabled={disabled}
            onClick={(mouseEvent: React.MouseEvent<HTMLElement>) => mouseEvent.stopPropagation()}
            size="sm"
            title={
                disabled ? (
                    <>
                        <DisabledSpinner /> {title}
                    </>
                ) : (
                    title
                )
            }
            variant="primary"
        >
            {itemList.map((element) => MedDropdownItems(element))}
        </DropdownButton>
    );
};

export default MedDropdown;
