/**
 * Helper function that rehydrates the otcList global state
 *
 * @param medicineProvider
 * @returns {Q.Promise<any> | Promise<T | never> | * | undefined}
 * @constructor
 */
const RefreshOtcList = (medicineProvider) => {
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
