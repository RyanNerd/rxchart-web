import Card from "react-bootstrap/Card";
import React, {useGlobal} from "reactn";
import {MedicineRecord, PillboxItemRecord, PillboxRecord} from "types/RecordTypes";
import {BsColor} from "utility/common";
import getPillboxItems, {PillRowType} from "./getPillboxItems";
import PillboxItemGrid from "./PillboxItemGrid";

interface IProp {
    medicineList: MedicineRecord[]
    activePillbox: PillboxRecord
}

const PillboxCard = (props: IProp) => {
    const {
        medicineList,
        activePillbox
    } = props;

    const [pillboxItemList, setPillboxItemList] = useGlobal('pillboxItemList');
    const [mm] = useGlobal('medicineManager');
    const clientId = activePillbox.ResidentId;
    const pillboxName = activePillbox.Name;
    const pillboxId = activePillbox?.Id;
    const pillboxGridItems = pillboxId ?
        getPillboxItems(medicineList, pillboxItemList, pillboxId) : [] as PillRowType[];
    const pillboxItemCount = pillboxGridItems.filter(pgi => pgi.Quantity !== null && pgi.Quantity > 0).length;

    /**
     * Add or update a pillboxItem record
     * @param {PillboxItemRecord} pbi
     */
    const savePillboxItem = async (pbi: PillboxItemRecord) => {
        const updatedPbi = await mm.updatePillboxItem(pbi);
        if (updatedPbi) {
            const pbItemList = await mm.loadPillboxItemList(clientId as number);
            await setPillboxItemList(pbItemList);
        }
    }

    return (
        <Card>
            <Card.Title
                className="mb-0"
            >
                <h6
                    className="mt-3 mb-0 ml-2 user-select-none"
                >
                    <span
                        style={{
                            color: BsColor.white,
                            backgroundColor: BsColor.primary,
                            padding: ".5rem 1rem",
                            boxSizing: "border-box",
                            borderRadius: ".25rem",
                            textTransform: "uppercase"
                        }}
                    >
                        {pillboxName.trim()}
                    </span>
                    <span
                        style={{color: BsColor.success, fontWeight: "bold"}}> Drugs
                    </span>
                    {" in the pillbox: "}
                    <span
                        style={{
                            color: pillboxItemCount > 0 ? BsColor.success : BsColor.gray,
                            fontWeight: pillboxItemCount > 0 ? "bold" : undefined
                        }}
                    >
                        {pillboxItemCount}
                    </span>
                </h6>
            </Card.Title>
            <Card.Body>
                <PillboxItemGrid
                    className="mt-0"
                    pillboxGridItems={pillboxGridItems}
                    onEdit={r => savePillboxItem(r)}
                />
            </Card.Body>
        </Card>
    )
}

export default PillboxCard;
