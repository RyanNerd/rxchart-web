import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import React from "reactn";
import {randomString} from "../../utility/common";
import {ReactChildren, ReactNode} from "react";
import {Placement} from "react-bootstrap/Overlay";

interface IProps {
    placement: Placement
    tooltip?: string | ReactNode;
    tooltipId?: string;
    children: ReactChildren;
}

/**
 * Button with a tooltip overlay
 *
 * @param {placement = 'top', tooltip, tooltipId = randomString(), children} props
 * @returns {JSX.Element}
 * @constructor
 */
const TooltipButton = (props: IProps): JSX.Element => {
    const {
        placement = 'top',
        tooltip,
        tooltipId = randomString(),
        children
    } = props;

    // If tooltip isn't given then return a regular Button with no overlay
    if (!tooltip) {
        return (
            <Button
                {...props}
            >
                {children}
            </Button>
        )
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

export default TooltipButton;
