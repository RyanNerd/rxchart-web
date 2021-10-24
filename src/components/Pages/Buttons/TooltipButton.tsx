import {ReactNode} from 'reactn/default';
import Button, {ButtonProps} from 'react-bootstrap/Button';
import {Placement} from 'react-bootstrap/Overlay';
import OverlayTrigger, {OverlayTriggerProps} from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import React from 'reactn';
import {Modify} from 'types/Modify';
import {randomString} from 'utility/common';

interface IButtonProps extends ButtonProps {
    [key: string]: unknown;
}

interface IOverlayProps extends OverlayTriggerProps {
    placement: Placement;
    [key: string]: unknown;
}

type TProps = Modify<
    IButtonProps | IOverlayProps,
    {
        children?: ReactNode | undefined;
        placement?: Placement;
        id?: string;
        tooltip?: string;
    }
>;

/**
 * Button with a tooltip overlay
 * @param {TProps} props The props for this component
 * @returns {JSX.Element}
 */
const TooltipButton = (props: TProps): JSX.Element => {
    const {placement = 'top', tooltip, tooltipId = randomString(), children} = props;

    const button = <Button {...props}>{children}</Button>;

    // If tooltip isn't given then return a regular Button with no overlay
    if (!tooltip) {
        return button;
    }

    return (
        <OverlayTrigger
            {...props}
            placement={placement}
            overlay={<Tooltip id={tooltipId as string}>{tooltip}</Tooltip>}
            target={undefined}
        >
            {button}
        </OverlayTrigger>
    );
};

export default TooltipButton;
