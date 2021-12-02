// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck We disable TS because we'd need to drag in many, many react-bootstrap property type defs and merge them
import ReactNode from 'react';
import {Placement} from 'react-bootstrap/Overlay';
import OverlayTrigger, {OverlayDelay, OverlayTriggerType} from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import React from 'reactn';
import {randomString} from 'utility/common';

interface IProps {
    children: unknown;
    defaultShow?: boolean;
    delay?: OverlayDelay;
    flip?: boolean;
    id?: string;
    onHide?: () => void;
    onToggle?: () => void;
    placement?: Placement;
    show?: boolean;
    tooltip: ReactNode | undefined;
    trigger?: OverlayTriggerType | OverlayTriggerType[];
}

/**
 * Generic component making tooltips easier
 * @param {IProps} props The props for this component
 */
const TooltipContainer = (props: IProps) => {
    const {
        children,
        defaultShow = false,
        delay,
        id = randomString(),
        onHide = null,
        onToggle,
        placement = 'top',
        flip = placement && placement.indexOf('auto') !== -1,
        show,
        tooltip,
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
            defaultShow={defaultShow}
            delay={delay}
            flip={flip}
            onHide={onHide}
            onToggle={onToggle}
            overlay={tooltipOverlay()}
            placement={placement}
            show={show}
            trigger={trigger}
        >
            {children}
        </OverlayTrigger>
    );
};

export default TooltipContainer;
