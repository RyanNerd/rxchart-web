import {MedicineRecord, PillboxItemRecord} from 'types/RecordTypes';
import {multiSort, SortDirection} from 'utility/common';

export type PillRowType = {
    Drug: string;
    Id: number | null;
    MedicineId: number;
    PillboxId: number;
    Quantity: number | null;
    ResidentId: number;
    Strength: string | null;
};

/**
 * Builds out and returns PillRowType[] given the pillboxId
 * @param {MedicineRecord[]} medicineList An array of medicine record objects
 * @param {PillboxItemRecord[]} pillboxItemList An array of pillboxItem objects
 * @param {number} pillboxId The PK of the Pillbox table
 */
const getPillboxItems = (medicineList: MedicineRecord[], pillboxItemList: PillboxItemRecord[], pillboxId: number) => {
    const pillBuild = [] as PillRowType[];
    medicineList.forEach((m) => {
        const residentId = m.ResidentId as number;
        const pillboxItemRecord = pillboxItemList.find((r) => r.MedicineId === m.Id && r.PillboxId === pillboxId);
        if (pillboxItemRecord) {
            pillBuild.push({
                Drug: m.Drug,
                Id: pillboxItemRecord.Id,
                MedicineId: m.Id as number,
                PillboxId: pillboxId,
                Quantity: pillboxItemRecord.Quantity,
                ResidentId: residentId,
                Strength: m.Strength
            });
        } else {
            pillBuild.push({
                Drug: m.Drug,
                Id: null,
                MedicineId: m.Id as number,
                PillboxId: pillboxId,
                Quantity: 0,
                ResidentId: residentId,
                Strength: m.Strength
            });
        }
    });

    return multiSort(pillBuild, {Quantity: SortDirection.asc, Drug: SortDirection.desc});
};

export default getPillboxItems;
