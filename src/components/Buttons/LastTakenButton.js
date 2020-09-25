import React from "reactn";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';

const LastTakenButton = (props) => {
    const lastTaken = props.lastTaken;
    const content = props.children || (
        <>
            {/* Display in BOLD if taken 3 or less hours ago */}
            {lastTaken !== null && lastTaken <= 3 ? <b>Last Taken (hours): {lastTaken}</b> :
            <span>Last Taken (hours): {lastTaken}</span>}
        </>
    );

    let warningColor;
    switch (lastTaken) {
        case 0: warningColor = 'danger';
            break;
        case 1: warningColor = 'danger';
            break;
        case 2: warningColor = 'danger';
            break;
        case 3: warningColor = 'outline-warning';
            break;
        case 4: warningColor = 'outline-warning';
            break;
        case 5: warningColor = 'outline-warning';
            break;
        case 6: warningColor = 'outline-info';
            break;
        case 7: warningColor = 'outline-info';
            break;
        case 8: warningColor = 'outline-info';
            break;
        default: warningColor = 'light';
    }

    return (
    <Button
        disabled
        variant={warningColor}
    >
        {content}
    </Button>
    )
}

LastTakenButton.propTypes = {
    lastTaken: PropTypes.number,
    children: PropTypes.element
}

export default LastTakenButton;