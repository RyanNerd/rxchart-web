import Button from 'react-bootstrap/Button';
import React from 'reactn';
import {getLastTakenVariant} from 'utility/common';

interface IProps {
    lastTaken?: number | null;
}

/**
 * Colored button that displays Last Taken in hours.
 * @param {IProps} props The props for this component
 */
const LastTakenButton = (props: IProps): JSX.Element | null => {
    const {lastTaken = null} = props;
    if (lastTaken === null) return null;

    return (
        <Button size="sm" disabled style={{cursor: 'default'}} variant={getLastTakenVariant(lastTaken)}>
            <span style={{fontWeight: lastTaken && lastTaken <= 3 ? 'bold' : undefined}}>
                Last Taken (hours): {lastTaken}
            </span>
        </Button>
    );
};

export default LastTakenButton;
