import React, {useState} from 'reactn';
import './../../styles/toggle.css';

interface IProps {
    id: string
    defaultValue?: boolean | undefined
    onChange?: (v: boolean) => void
}

const ToggleSwitch = (props: IProps) => {
    const id = props.id;
    const onChange = props.onChange;
    const [checkBoxValue, setCheckBoxValue] = useState(props.defaultValue);

    return (
        <>
            <input type="checkbox"
                   id={id}
                   style={{opacity: 0}}
                   checked={checkBoxValue}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                       setCheckBoxValue(e.target.checked);
                       if (onChange) {
                           onChange(e.target.checked);
                       }
                   }}
            />
            <label htmlFor={id} className="switchx"/>
        </>
    )
}

export default ToggleSwitch;
