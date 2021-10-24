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

    const pillTooltip = (id: number) => {
        return <Tooltip id={'pill-popover' + id.toString()}>{pillboxInfo?.Name}</Tooltip>;
    };

    const pillboxItemInfo = pillboxItemList?.find((p) => p.Id === pillboxItemId);
    const pillboxInfo = pillboxList?.find((pb) => pb.Id === pillboxItemInfo?.PillboxId);

    // noinspection RequiredAttributes
    return (
        <OverlayTrigger placement="top" delay={{show: 200, hide: 300}} overlay={pillTooltip(id)}>
            <span
                onClick={() => onPillClick?.(pillboxInfo?.Id as number)}
                style={{cursor: onPillClick ? 'pointer' : undefined}}
            >
                {'💊 '}
            </span>
        </OverlayTrigger>
    );
};

export default PillPopover;
