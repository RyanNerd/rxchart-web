import {Card} from "react-bootstrap";
import React, {useGlobal} from "reactn";
import {MedicineRecord, PillboxItemRecord, PillboxRecord} from "types/RecordTypes";
import {BsColors} from "utility/common";
import getPillboxItems, {PillRowType} from "./getPillboxItems";
import PillboxItemGrid from "./PillboxItemGrid";

interface IProp {
    medicineList: MedicineRecord[]
    pillboxItemList: PillboxItemRecord[]
    activePillbox: PillboxRecord
}

const PillboxCard = (props: IProp) => {
    const {
        medicineList,
        pillboxItemList,
        activePillbox
    } = props;

    // TODO: Move this as a call back to the parent
    const [, setPillboxItemObserver] = useGlobal('__pillboxItem');

    const pillboxName = activePillbox.Name;
    const pillboxNotes = activePillbox.Notes || '';
    const pillboxId = activePillbox?.Id;
    const pillboxGridItems = pillboxId ?
        getPillboxItems(medicineList, pillboxItemList, pillboxId) : [] as PillRowType[];
    const pillboxItemCount = pillboxGridItems.filter(pgi => pgi.Quantity !== null && pgi.Quantity > 0).length;

    return (
        <Card>
            <Card.Title>
                <h5 className="mt-3 ml-2 user-select-none">
                            <span style={{
                                color: BsColors.white,
                                backgroundColor: BsColors.primary,
                                padding: ".5rem 1rem",
                                boxSizing: "border-box",
                                borderRadius: ".25rem"
                            }}
                            >
                                {pillboxName.trim()}
                            </span>
                    <span style={{color: BsColors.success, fontWeight: "bold"}}> Drugs</span>
                    {" in the pillbox: "}
                    <span style={{
                        color: pillboxItemCount > 0 ? BsColors.success : BsColors.gray,
                        fontWeight: pillboxItemCount > 0 ? "bold" : undefined
                    }}>
                                {pillboxItemCount}
                    </span>
                </h5>
            </Card.Title>
            <Card.Body>
                <PillboxItemGrid
                    pillboxGridItems={pillboxGridItems}
                    onEdit={r => setPillboxItemObserver({action: "update", payload: r})}
                />
            </Card.Body>
            {pillboxNotes.length > 0 &&
            <Card.Footer>
                <p>
                    {pillboxNotes}
                </p>
            </Card.Footer>
            }
        </Card>
    )
}

export default PillboxCard;
