import {FormControl} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import React, {forwardRef, useEffect, useState} from 'reactn';
import {ChangeEvent, KeyboardEvent} from 'reactn/default';
import drugNameList from 'utility/drugNameList';

// TS Formatting for ForwardRef
// @link https://stackoverflow.com/a/64778925/4323201
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type CustomMenuProps = {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    labeledBy?: string;
    onChange: (e: React.ChangeEvent<FormControlElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<FormControlElement>) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    value?: string | string[] | number;
};

/**
 * Custom Menu item
 * forwardRef -- Dropdown needs access to the DOM of the Menu to measure it
 * @link https://react-bootstrap-v4.netlify.app/components/dropdowns/#custom-dropdown-components
 */
const CustomMenu = forwardRef((props: CustomMenuProps, ref: React.Ref<HTMLDivElement>) => {
    const {children, style, className, labeledBy, onChange, onKeyDown, inputRef, value} = props;

    return (
        <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
            <FormControl
                autoFocus
                className="mx-1 my-2 w-3"
                placeholder="Drug name"
                onChange={(e) => onChange(e)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => onKeyDown(e)}
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
                {/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */}
                {React.Children.toArray(children).filter((child: any) => child.props.children)}
            </ul>
        </div>
    );
});

interface IProps {
    onChange?: (e: React.ChangeEvent<FormControlElement>) => void;
    onSelect?: (s: string) => void;
    drugInputRef: React.RefObject<HTMLInputElement>;
    initialValue: string;
}

/**
 * Textbox with dropdown suggestions for common drug names
 * @param {IProps} props The props for this component
 */
const DrugNameDropdown = (props: IProps) => {
    // The only reason drugNameInput ref is given is so that the parent component can force focus
    const [drugNameInput, setDrugNameInput] = useState(props.initialValue);
    useEffect(() => {
        setDrugNameInput(props.initialValue);
    }, [props.initialValue]);

    const [filteredDrugNames, setFilteredDrugNames] = useState<string[]>([]);
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
    const handleOnChange = (e: React.ChangeEvent<FormControlElement>) => {
        setDrugNameInput(e.target.value);
        if (props.onChange) props.onChange(e);
    };

    /**
     * Handler for when the user has made a selection for the drug name
     * @param {string} s The text of the selection
     */
    const handleOnSelect = (s: string) => {
        setDrugNameInput(s);
        if (props.onSelect) props.onSelect(s);
    };

    /**
     * Handler for when the keypress event is invoked on the textbox
     * @param {KeyboardEvent} e The keyboard event
     */
    const handleOnKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (drugNameInput.length > 0) {
                handleOnSelect(drugNameInput);
            } else {
                e.preventDefault();
            }
        }

        if (filteredDrugNames.length === 0) {
            if (e.key === 'Tab') {
                if (drugNameInput.length > 0) {
                    handleOnSelect(drugNameInput);
                } else {
                    e.preventDefault();
                }
            }
        }
    };

    /**
     * The Drug name dropdown item
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
                onChange={(e) => handleOnChange(e)}
                onKeyDown={(e: KeyboardEvent) => handleOnKeyDown(e)}
                inputRef={inputRef}
            >
                {filteredDrugNames.length > 0
                    ? filteredDrugNames.map((d) => DrugNameItems(d, false))
                    : ['no suggestions..'].map((s) => DrugNameItems(s, true))}
            </CustomMenu>
        </Dropdown>
    );
};

export default DrugNameDropdown;
