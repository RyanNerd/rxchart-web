import {InputHTMLAttributes} from 'react';
import React, {useEffect, useState} from 'reactn';
import '../../../styles/neumorphism/toggle.css';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    isChecked: boolean;
    onToggle: (isChecked: boolean) => void;
    leftText?: string;
    rightText?: string;
}

/**
 * Toggle "button" checkbox in Neu-morphism style
 * Shamelessly stolen from
 * @link https://codepen.io/halvves/pen/ExjxaKj
 * @param {IProps} props The props for this component
 */
const ToggleSwitch = (props: IProps) => {
    const {className = '', disabled, isChecked, onToggle, leftText, rightText} = props;

    const [toggleChecked, setToggleChecked] = useState(isChecked);
    useEffect(() => {
        setToggleChecked(isChecked);
    }, [isChecked]);

    return (
        <label className="neu-label neu-font" style={{cursor: disabled ? 'not-allowed' : 'pointer'}}>
            {leftText && <div className={'neu-label-text-left'}>{leftText}</div>}
            <div className="neu-toggle">
                <input
                    disabled={disabled}
                    className={className + ' neu-toggle-state'}
                    type="checkbox"
                    name="neu-check"
                    checked={toggleChecked}
                    onChange={(e) => onToggle(e.target.checked)}
                />
                <div className="neu-indicator"></div>
            </div>
            {rightText && <div className="neu-label-text-right">{rightText}</div>}
        </label>
    );
};

export default ToggleSwitch;
