import {ReactNode} from "reactn/default";
import Button, {ButtonProps} from "react-bootstrap/Button";
import {Placement} from "react-bootstrap/Overlay";
import OverlayTrigger, {OverlayTriggerProps} from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import React from "reactn";
import {Modify} from "types/Modify";
import {randomString} from "utility/common";

interface IButtonProps extends ButtonProps {
    [key: string]: any
}

interface IOverlayProps extends OverlayTriggerProps {
    placement: Placement
    [key: string]: any
}

type TProps = Modify<IButtonProps | IOverlayProps, {
    children?: ReactNode | undefined
    placement?: Placement
}>

/**
 * Button with a tooltip overlay
 * @param {IProps} props
 * @returns {JSX.Element}
 */
const TooltipButton = (props: TProps): JSX.Element => {
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
    )
}

export default TooltipButton;
