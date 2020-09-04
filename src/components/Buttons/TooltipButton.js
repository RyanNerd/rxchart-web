import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import React from "reactn";
import {randomString} from "../../utility/common";

/**
 * Button with a tooltip overlay
 *
 * @param {object} props .placement, .tooltip, .tooltipId
 * @returns {JSX.Element}
 * @constructor
 */
const TooltipButton = (props) => {
    const placement = props.placement || 'top';
    const tooltip = props.tooltip || null;
    const tooltipId = props.tooltipId || randomString;

    return (
        <OverlayTrigger
            placement={placement}
            overlay={
                <Tooltip id={tooltipId}>
                    {tooltip}
                </Tooltip>
            }
        >
            <Button
                {...props}
            >
                {props.children}
            </Button>
        </OverlayTrigger>
    );
}

export default TooltipButton;