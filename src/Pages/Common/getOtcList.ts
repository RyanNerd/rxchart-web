import MedicineProvider from "../../providers/MedicineProvider";
import {MedicineRecord} from "../../types/RecordTypes";

/**
 * Fetch all of the OTC medications
 *
 * @param {MedicineProvider} medicineProvider
 * @return {Promise<MedicineRecord[]>}
 */
const getOtcList = (medicineProvider: typeof MedicineProvider): Promise<MedicineRecord[]> => {
    const searchCriteria = {
        where: [
            {column: "OTC", value: true}
        ],
        order_by: [
            {column: "Drug", direction: "asc"}
        ]
    };
    return medicineProvider.search(searchCriteria);
}

export default getOtcList;
