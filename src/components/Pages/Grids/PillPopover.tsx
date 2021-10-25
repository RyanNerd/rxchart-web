import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import React from 'reactn';
import {PillboxItemRecord, PillboxRecord} from 'types/RecordTypes';

interface IProps {
    pillboxItemId: number;
    id: number;
    pillboxList: PillboxRecord[];
    pillboxItemList: PillboxItemRecord[];
    onPillClick?: (n: number) => void;
}

/**
 * Pillbox Popover displaying pillbox name
 * @param {IProps} props The props for this component
 */
const PillPopover = (props: IProps) => {
    const {id, pillboxItemId, pillboxList, pillboxItemList, onPillClick} = props;
    const pillboxItemInfo = pillboxItemList?.find((p) => p.Id === pillboxItemId);
    const pillboxInfo = pillboxList?.find((pb) => pb.Id === pillboxItemInfo?.PillboxId);

    /**
     * Tooltip to display if there's an associated pillbox
     */
    const pillTooltip = () => {
        return <Tooltip id={`pill-popover' + ${id}`}>Pillbox: {pillboxInfo?.Name}</Tooltip>;
    };

    /**
     * Tooltip to show when the pillbox has been deleted
     */
    const deletedTooltip = () => {
        return <Tooltip id={`pill-popover-dead-${id}`}>{'Pillbox deleted'}</Tooltip>;
    };

    // noinspection RequiredAttributes
    return (
        <OverlayTrigger
            placement="top"
            delay={{show: 200, hide: 300}}
            overlay={pillboxInfo ? pillTooltip() : deletedTooltip()}
        >
            <span
                onClick={() => (pillboxInfo ? onPillClick?.(pillboxInfo?.Id as number) : undefined)}
                style={{cursor: pillboxInfo ? (onPillClick ? 'pointer' : undefined) : 'not-allowed'}}
            >
                {'💊 '}
            </span>
        </OverlayTrigger>
    );
};

export default PillPopover;
