import {MedicineRecord, PillboxItemRecord} from "../../../types/RecordTypes";
import {multiSort, SortDirection} from "../../../utility/common";

export interface IPillboxItemGrid {
    medicineList: MedicineRecord[]
    pillboxItemList: PillboxItemRecord[]
    pillboxId: number
}

export type PillRowType = {
    Drug: string
    Id: number | null
    MedicineId: number
    PillboxId: number
    Quantity: number | null
    ResidentId: number
    Strength: string | null
}

const getPillboxItems = (medicineList: MedicineRecord[], pillboxItemList: PillboxItemRecord[], pillboxId: number) => {
    // Build out pills<PillRowType>[]
    const pillBuild = [] as PillRowType[];
    medicineList.forEach((m) => {
        const residentId = m.ResidentId as number;
        const pillboxItemRecord = pillboxItemList.find((r) => r.MedicineId === m.Id && m.Active);
        if (pillboxItemRecord) {
            pillBuild.push({
                Drug: m.Drug,
                Id: pillboxItemRecord.Id,
                MedicineId: m.Id as number,
                PillboxId: pillboxId,
                Quantity: pillboxItemRecord.Quantity,
                ResidentId: residentId,
                Strength: m.Strength
            })
        } else {
            pillBuild.push({
                Drug: m.Drug,
                Id: null,
                MedicineId: m.Id as number,
                PillboxId: pillboxId,
                Quantity: 0,
                ResidentId: residentId,
                Strength: m.Strength
            })
        }
    });

    // @fixme: Not generic
    // @ts-ignore multiSort isn't generic so it currently pitches a fit
    return multiSort(pillBuild, {Quantity: SortDirection.asc, Drug: SortDirection.desc});
}

export default getPillboxItems;
