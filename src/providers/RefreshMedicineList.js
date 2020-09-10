/**
 * Helper function that rehydrates the medicineList global state
 *
 * @param medicineProvider
 * @param residentId
 * @returns {Q.Promise<any> | Promise<T | never> | * | undefined}
 * @constructor
 */
const RefreshMedicineList = (medicineProvider, residentId) => {
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
