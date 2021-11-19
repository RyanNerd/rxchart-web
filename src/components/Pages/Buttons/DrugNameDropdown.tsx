//  eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck -- TS is very cross about CustomMenu, but since this is such an exotic component TS is off for everything
import {FormControl} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import React, {forwardRef, useEffect, useState} from 'reactn';
import {ChangeEvent} from 'react';
import drugNameList from 'utility/drugNameList';

/**
 * Custom Menu item
 * forwardRef -- Dropdown needs access to the DOM of the Menu to measure it
 * @link https://react-bootstrap-v4.netlify.app/components/dropdowns/#custom-dropdown-components
 */
const CustomMenu = forwardRef(
    ({children, style, className, 'aria-labelledby': labeledBy, value, onChange, onKeyDown, inputRef}, ref) => {
        return (
            <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
                <FormControl
                    autoFocus
                    className="mx-1 my-2 w-3"
                    placeholder="Drug name"
                    onChange={(e) => onChange(e)}
                    onKeyDown={(e) => onKeyDown(e)}
                    type="text"
                    value={value}
                    ref={inputRef}
                />
                <ul
                    className="list-unstyled"
                    style={{
                        height: '110px',
                        overflowY: 'scroll'
                    }}
                >
                    {React.Children.toArray(children).filter((child) => child.props.children)}
                </ul>
            </div>
        );
    }
);

interface IProps {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onSelect?: (s: string) => void;
    drugInputRef: React.RefObject<HTMLInputElement>;
    initalValue: string;
}

/**
 * Textbox with dropdown suggestions for common drug names
 * @param {IProps} props The props for this component
 */
const DrugNameDropdown = (props: IProps) => {
    const [drugNameInput, setDrugNameInput] = useState(props.initalValue);
    useEffect(() => {
        setDrugNameInput(props.initalValue);
    }, [props.initalValue]);

    const [filteredDrugNames, setFilteredDrugNames] = useState([]);
    useEffect(() => {
        setFilteredDrugNames([]);
        if (drugNameInput.length > 1) {
            const drugNames = drugNameList.filter((d) => d.toLowerCase().startsWith(drugNameInput.toLowerCase()));
            setFilteredDrugNames(drugNames);
        }
    }, [drugNameInput, drugNameInput.length]);

    const inputRef = props.drugInputRef;

    /**
     * Handler for when the value in the textbox changes
     * @param {ChangeEvent<HTMLInputElement>} e Change event for the textbox
     */
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDrugNameInput(e.target.value);
        if (props.onChange) props.onChange(e);
    };

    /**
     * Handler for when the user has made a selection for the drug name
     * @param {string} s The text of the selection
     */
    const handleOnSelect = (s: string) => {
        setDrugNameInput(s);
        inputRef?.current?.blur();
        if (props.onSelect) props.onSelect(s);
    };

    /**
     * Handler for when the keypress event is invoked on the textbox
     * @param {KeyboardEvent} e The keyboard event
     */
    const handleOnKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleOnSelect(drugNameInput);
        }
    };

    /**
     * The Drug name drop down item
     * @param {string} drugName The name of the drug
     * @param {boolean} disabled true if the Dropdown.Item should be disabled
     */
    const DrugNameItems = (drugName: string, disabled: boolean) => {
        return (
            <Dropdown.Item
                active={drugNameInput === drugName}
                id={`drug-name-item-${drugName}`}
                key={`drug-name-item-${drugName}`}
                eventKey={drugName}
                disabled={disabled}
            >
                {drugName}
            </Dropdown.Item>
        );
    };

    return (
        <Dropdown show id="dropdown-med-select" onSelect={(s) => handleOnSelect(s || '')}>
            <CustomMenu
                value={drugNameInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
                onKeyDown={(e: KeyboardEvent) => handleOnKeyDown(e)}
                inputRef={inputRef}
            >
                {filteredDrugNames.length > 0
                    ? filteredDrugNames.map((d) => DrugNameItems(d, false))
                    : DrugNameItems('no suggestions..', true)}
            </CustomMenu>
        </Dropdown>
    );
};

export default DrugNameDropdown;
