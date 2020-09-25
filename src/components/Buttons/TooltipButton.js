import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import React from "reactn";
import {randomString} from "../../utility/common";
import PropTypes from 'prop-types';

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
    const tooltipId = props.tooltipId || randomString();

    if (tooltip === null) {
        return (
            <Button
                {...props}
            >
                {props.children}
            </Button>)
    }

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

TooltipButton.propTypes = {
    placement: PropTypes.string,
    tooltip: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.string.isRequired]),
    toolTipId: PropTypes.string
}

export default TooltipButton;