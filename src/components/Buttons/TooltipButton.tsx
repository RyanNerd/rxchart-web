import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button, {ButtonProps} from "react-bootstrap/Button";
import React from "reactn";
import {randomString} from "../../utility/common";
import {ReactNode} from "react";
import {Placement} from "react-bootstrap/Overlay";
import {Variant} from "react-bootstrap/types";

interface IProps extends ButtonProps {
    placement?: Placement
    variant?: Variant
    tooltip?: string | ReactNode;
    tooltipId?: string;
    children: JSX.Element[] | JSX.Element | string
    [key: string]: any
}

/**
 * Button with a tooltip overlay
 *
 * @param {IProps} props
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

    const button = (
        <Button
            {...props}
        >
            {children}
        </Button>
    )

    console.log('toolTip', tooltip);

    // If tooltip isn't given then return a regular Button with no overlay
    if (!tooltip) {
        return button;
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
            {button}
        </OverlayTrigger>
    );
}

export default TooltipButton;
