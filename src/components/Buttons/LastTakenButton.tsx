import React from "reactn";
import Button from "react-bootstrap/Button";
import {getLastTakenVariant} from "../../utility/common";

interface IProps {
    lastTaken?: number | null
}

/**
 * Colored button that displays Last Taken in hours.
 *
 * @param {IProps} props
 * @return {JSX.Element}
 * @constructor
 */
const LastTakenButton = (props: IProps): JSX.Element | null => {
    const {
        lastTaken = null
    } = props;

    if (lastTaken === null) {
        return null;
    }

    return (
        <Button
            disabled
            style={{cursor: "default"}}
            variant={(lastTaken && lastTaken > 6) ? 'light' : getLastTakenVariant(lastTaken)}
        >
            {/* Display in BOLD if taken 3 or less hours ago */}
            {lastTaken !== null && lastTaken && lastTaken <= 3 ?
                (<b>Last Taken (hours): {lastTaken}</b>)
                :
                (<span>Last Taken (hours): {lastTaken}</span>)
            }
        </Button>
    )
}

export default LastTakenButton;
