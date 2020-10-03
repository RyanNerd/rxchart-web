/**
 * Fetch the Medications given the residentId
 *
 * @param medicineProvider
 * @param residentId
 * @returns
 */
import MedicineProvider from "../../providers/MedicineProvider";
import {MedicineRecord} from "../../types/RecordTypes";

const getMedicineList = (medicineProvider: typeof MedicineProvider, residentId: number): Promise<MedicineRecord[]> => {
    const searchCriteria = {
        where: [
            {column: "ResidentId", value: residentId}
        ],
        order_by: [
            {column: "Drug", direction: "asc"}
        ]
    };
    return medicineProvider.search(searchCriteria);
}

export default getMedicineList;
