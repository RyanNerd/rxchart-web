import Card from 'react-bootstrap/Card';
import React from 'reactn';
import {MedicineRecord, PillboxItemRecord, PillboxRecord} from 'types/RecordTypes';
import {BsColor} from 'utility/common';
import getPillboxItems, {PillRowType} from './getPillboxItems';
import PillboxItemGrid from './PillboxItemGrid';

interface IProps {
    activePillbox: PillboxRecord;
    medicineList: MedicineRecord[];
    onEdit: (p: PillboxItemRecord) => void;
    pillboxItemList: PillboxItemRecord[];
}

/**
 * PillboxCard UI for adding, removing and changing the pills in a pillbox
 * @param {IProps} props The props for the component
 */
const PillboxCard = (props: IProps) => {
    const {medicineList, pillboxItemList, activePillbox, onEdit} = props;
    const pillboxName = activePillbox.Name;
    const pillboxId = activePillbox?.Id;
    const pillboxGridItems = pillboxId
        ? getPillboxItems(
              medicineList.filter((m) => m.Active),
              pillboxItemList,
              pillboxId
          )
        : ([] as PillRowType[]);
    const pillboxItemCount = pillboxGridItems.filter((pgi) => pgi.Quantity !== null && pgi.Quantity > 0).length;

    return (
        <Card>
            <Card.Title className="mb-0">
                <h6 className="mt-3 mb-0 ml-2 user-select-none">
                    <span
                        style={{
                            color: BsColor.white,
                            backgroundColor: BsColor.primary,
                            padding: '.5rem 1rem',
                            boxSizing: 'border-box',
                            borderRadius: '.25rem',
                            textTransform: 'uppercase'
                        }}
                    >
                        {pillboxName.trim()}
                    </span>
                    <span style={{color: BsColor.success, fontWeight: 'bold'}}> Drugs</span>
                    {' in the pillbox: '}
                    <span
                        style={{
                            color: pillboxItemCount > 0 ? BsColor.success : BsColor.gray,
                            fontWeight: pillboxItemCount > 0 ? 'bold' : undefined
                        }}
                    >
                        {pillboxItemCount}
                    </span>
                </h6>
            </Card.Title>
            <Card.Body>
                <PillboxItemGrid className="mt-0" pillboxGridItems={pillboxGridItems} onEdit={(r) => onEdit(r)} />
            </Card.Body>
        </Card>
    );
};

export default PillboxCard;
