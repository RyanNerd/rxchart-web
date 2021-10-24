import React from 'reactn';
import Spinner, {SpinnerProps} from 'react-bootstrap/Spinner';
import {Modify} from 'types/Modify';

interface IProps extends SpinnerProps {
    animation: 'border' | 'grow';
}

// See https://stackoverflow.com/a/55032655/4323201
type TProps = Modify<
    IProps,
    {
        animation?: 'border' | 'grow';
    }
>;

/**
 * Spinner to be shown when in a disabled state with an optional components to the right (typically a button)
 * @param {React.PropsWithChildren<IProps>} props The props for the component
 */
const DisabledSpinner = (props: TProps) => {
    const {animation = 'border', size = 'sm', role = 'status'} = {...props};

    return <Spinner {...props} animation={animation} size={size} role={role} aria-hidden="true" as="span" />;
};

export default DisabledSpinner;
