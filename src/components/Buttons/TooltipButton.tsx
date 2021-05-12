import React from "reactn";
import Button, {ButtonProps} from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {Placement} from "react-bootstrap/Overlay";
import {Variant} from "react-bootstrap/types";
import Tooltip from "react-bootstrap/Tooltip";
import {randomString} from "../../utility/common";

interface IProps extends ButtonProps {
    children: JSX.Element[] | JSX.Element | string
    disabled?: boolean
    placement?: Placement
    tooltip?: string | React.ReactNode
    tooltipId?: string
    variant?: Variant
    [key: string]: any
}

/**
 * Button with a tooltip overlay
 * @param {IProps} props
 * @returns {JSX.Element}
 */
const TooltipButton = (props: IProps): JSX.Element => {
    const {
        disabled = false,
        placement = 'top',
        tooltip,
        tooltipId = randomString(),
        children
    } = props;

    const button = (
        <Button
            disabled={disabled}
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
            defaultShow={false}
            delay={50}
            flip={false}
            onHide={undefined}
            onToggle={undefined}
            popperConfig={undefined}
            show={undefined}
            target={undefined}
            trigger={undefined}
        >
            {button}
        </OverlayTrigger>
    );
}

export default TooltipButton;
