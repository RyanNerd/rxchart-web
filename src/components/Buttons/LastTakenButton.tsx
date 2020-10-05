import React from "reactn";
import Button from "react-bootstrap/Button";
import {ReactChildren} from "react";
import {getLastTakenVariant} from "../../utility/common";

interface IProps {
    lastTaken?: number | null
    children?: ReactChildren
}

/**
 * Colored button that displays Last Taken in hours.
 *
 * @param {IProps} props
 * @return {JSX.Element}
 * @constructor
 */
const LastTakenButton = (props: IProps): JSX.Element => {
    const {
        lastTaken = null,
        children
    } = props;

    const content = children || (
        <>
            {/* Display in BOLD if taken 3 or less hours ago */}
            {lastTaken !== null && lastTaken && lastTaken <= 3 ?
                (<b>Last Taken (hours): {lastTaken}</b>)
                :
                (<span>Last Taken (hours): {lastTaken}</span>)
            }
        </>
    );

    return (
    <Button
        disabled
        variant={(lastTaken && lastTaken > 8) ? 'light' : getLastTakenVariant(lastTaken)}
    >
        {content}
    </Button>
    )
}

export default LastTakenButton;
