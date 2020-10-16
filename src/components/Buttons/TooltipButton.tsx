import React from "reactn";
import {ReactNode} from "react";
import Button, {ButtonProps} from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {Placement} from "react-bootstrap/Overlay";
import {Variant} from "react-bootstrap/types";
import Tooltip from "react-bootstrap/Tooltip";
import {randomString} from "../../utility/common";

interface IProps extends ButtonProps {
    children: JSX.Element[] | JSX.Element | string
    placement?: Placement
    tooltip?: string | ReactNode
    tooltipId?: string
    variant?: Variant
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
