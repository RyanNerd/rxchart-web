import React from "reactn";
import Button, {ButtonProps} from "react-bootstrap/Button";
import OverlayTrigger, {OverlayTriggerProps} from "react-bootstrap/OverlayTrigger";
import {OverlayChildren, Placement} from "react-bootstrap/Overlay";
import {Variant} from "react-bootstrap/types";

// @ts-ignore
interface IProps extends ButtonProps, OverlayTriggerProps {
    target?: any
    children: any
    disabled?: boolean
    placement?: Placement
    overlay?: OverlayChildren
    popover?: OverlayChildren
    variant?: Variant
    [key: string]: any
}

/**
 * Button with a Popover overlay
 * @param {IProps} props
 * @returns {JSX.Element}
 */
const PopoverButton = (props: IProps): JSX.Element => {
    const {
        placement = 'top',
        children,
        overlay = props.popover
    } = props;

    const button = (
        <Button
            {...props}
        >
            {children}
        </Button>
    )

    // If popover isn't given then return a regular Button with no overlay
    if (!overlay) {
        return button;
    }

    return (
        <OverlayTrigger
            {...props}
            placement={placement}
            overlay={overlay}
        >
            {button}
        </OverlayTrigger>
    );
}

export default PopoverButton;
