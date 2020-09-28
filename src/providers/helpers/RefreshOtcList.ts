/**
 * Helper function that rehydrates the otcList
 */
import MedicineProvider from "../MedicineProvider";

const RefreshOtcList = (medicineProvider: typeof MedicineProvider): Promise<any> => {
    const searchCriteria =
        {
            where: [
                {column: "OTC", value: true}
            ],
            order_by: [
                {column: "Drug", direction: "asc"}
            ]
        };

    return medicineProvider.search(searchCriteria);
}

export default RefreshOtcList;
