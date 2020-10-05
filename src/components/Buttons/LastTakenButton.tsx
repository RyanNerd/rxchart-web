import React from "reactn";
import Button from "react-bootstrap/Button";
import {ReactChildren} from "react";
import {getLastTakenVariant} from "../../utility/common";

interface IProps {
    lastTaken?: number | null
    children?: ReactChildren
}

const LastTakenButton = (props: IProps) => {
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
