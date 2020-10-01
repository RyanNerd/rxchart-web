/**
 * Helper function that rehydrates the medicineList global state
 *
 * @param medicineProvider
 * @param residentId
 * @returns
 * @constructor
 */
import MedicineProvider from "../MedicineProvider";

const RefreshMedicineList = (medicineProvider: typeof MedicineProvider, residentId: number | string) => {
   const searchCriteria =
       {
           where: [
               {column: "ResidentId", value: residentId}
           ],
           order_by: [
               {column: "Drug", direction: "asc"}
           ]
       };

   return medicineProvider.search(searchCriteria);
}

export default RefreshMedicineList;
