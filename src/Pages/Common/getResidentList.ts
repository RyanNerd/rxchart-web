import ResidentProvider from "../../providers/ResidentProvider";
import {ResidentRecord} from "../../types/RecordTypes";

export const getResidentList = (residentProvider: typeof ResidentProvider): Promise<ResidentRecord[]> => {
    const searchCriteria =  {
        order_by: [
            {column: "LastName", direction: "asc"},
            {column: "FirstName", direction: "asc"}
        ]
    };
    return residentProvider.search(searchCriteria)
        .then((residents) => {
            return residents;
    })
}
