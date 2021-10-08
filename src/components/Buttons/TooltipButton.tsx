import {ReactNode} from "react";
import Button, {ButtonProps} from "react-bootstrap/Button";
import {Placement} from "react-bootstrap/Overlay";
import OverlayTrigger, {OverlayTriggerProps} from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {Variant} from "react-bootstrap/types";
import React from "reactn";
import {randomString} from "utility/common";

// @ts-ignore Some props are completely incompatible and even the type `any` doesn't make TS happy
interface IProps extends ButtonProps, OverlayTriggerProps {
    target?: any
    children: ReactNode | undefined
    disabled?: boolean
    placement?: Placement
    tooltip?: string | React.ReactNode
    tooltipId?: string
    variant?: Variant
    overlay?: any
    [key: string]: any
}

/**
 * Button with a tooltip overlay
 * @param {IProps} props
 * @returns {JSX.Element}
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
            {...props}
            placement={placement}
            overlay={
                <Tooltip id={tooltipId}>
                    {tooltip}
                </Tooltip>
            }
            target={undefined}
        >
            {button}
        </OverlayTrigger>
    );
}

export default TooltipButton;
