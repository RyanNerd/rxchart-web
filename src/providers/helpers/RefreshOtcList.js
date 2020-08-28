/**
 * Helper function that rehydrates the otcList global state
 *
 * @param medicineProvider
 * @returns {Q.Promise<any> | Promise<T | never> | * | undefined}
 * @constructor
 */
export default function RefreshMedicineList(medicineProvider)
{
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
