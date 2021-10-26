// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck We disable TS because we'd need to drag in many, many react-bootstrap propery type defs and merge them
import {Placement} from 'react-bootstrap/Overlay';
import OverlayTrigger, {OverlayDelay, OverlayTriggerType} from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import React from 'reactn';
import ReactNode from 'reactn/default';
import {randomString} from 'utility/common';

interface IProps {
    id?: string;
    placement?: Placement;
    tooltip: ReactNode | undefined;
    defaultShow?: boolean;
    children: unknown;
    delay?: OverlayDelay;
    flip?: boolean;
    onHide?: () => void;
    onToggle?: () => void;
    show?: boolean;
    trigger?: OverlayTriggerType | OverlayTriggerType[];
}

/**
 * Generic component making tooltips easier
 * @param {IProps} props The props for this component
 */
const TooltipContainer = (props: IProps) => {
    const {
        tooltip,
        children,
        placement = 'top',
        id = randomString(),
        defaultShow = false,
        delay,
        flip = placement && placement.indexOf('auto') !== -1,
        onHide = null,
        onToggle,
        show,
        trigger
    } = props;

    /**
     * Tooltip to display
     */
    const tooltipOverlay = () => {
        return <Tooltip id={`${id}`}>{tooltip}</Tooltip>;
    };

    // noinspection RequiredAttributes
    return (
        <OverlayTrigger
            placement={placement}
            overlay={tooltipOverlay()}
            defaultShow={defaultShow}
            delay={delay}
            flip={flip}
            onHide={onHide}
            onToggle={onToggle}
            show={show}
            trigger={trigger}
        >
            {children}
        </OverlayTrigger>
    );
};

export default TooltipContainer;
