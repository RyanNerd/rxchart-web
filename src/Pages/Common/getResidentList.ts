import ResidentProvider from "../../providers/ResidentProvider";
import {ResidentRecord} from "../../types/RecordTypes";

/**
 * Get all the residents.
 *
 * @param {ResidentProvider} residentProvider
 * @return Promise<ResidentRecord>
 */
export const getResidentList = (residentProvider: typeof ResidentProvider): Promise<ResidentRecord[]> => {
    const searchCriteria =  {
        order_by: [
            {column: "LastName", direction: "asc"},
            {column: "FirstName", direction: "asc"}
        ]
    };
    return residentProvider.search(searchCriteria);
}
