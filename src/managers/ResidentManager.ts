import {IResidentProvider} from "../providers/ResidentProvider";
import {ResidentRecord} from "../types/RecordTypes";

export interface IResidentManager {
    deleteResident: (residentId: number) => Promise<boolean>
    loadResidentList: () => Promise<ResidentRecord[]>
    updateResident: (r: ResidentRecord) => Promise<ResidentRecord>
}

/**
 * ResidentManager handles business logic for updating, deleting, and loading Resident data.
 * @param {IResidentProvider} residentProvider
 * @constructor
 */
const ResidentManager = (residentProvider: IResidentProvider): IResidentManager => {
    /**
     * Inserts or updates a Resident record.
     * @param {ResidentRecord} residentRecord
     */
    const _updateResident = async (residentRecord: ResidentRecord) => {
        const residentData = {...residentRecord};
        const residentId = residentData?.Id;
        // If the residentId is null then we are adding a new Resident
        if (!residentId) {
            residentData.Id = null;
            const searchExisting = {
                where: [
                    {column: "FirstName", value: residentData.FirstName},
                    {column: "LastName", value: residentData.LastName},
                    {column: "DOB_YEAR", value: residentData.DOB_YEAR},
                    {column: "DOB_MONTH", value: residentData.DOB_MONTH},
                    {column: "DOB_DAY", value: residentData.DOB_DAY}
                ],
                limit: 1,
                only_trashed: true
            };
            // Check if the resident exists but is trashed.
            return await residentProvider.search(searchExisting)
                .then((trashedResidents) => {
                    const trashedResidentId = (trashedResidents.length === 1) ? trashedResidents[0].Id : null;
                    // Do we have a trashed resident?
                    if (trashedResidentId) {
                        // Reactivate trashed Resident
                        return residentProvider.restore(trashedResidentId)
                            .catch((err) => {throw err})
                    } else {
                        // Add new Resident
                        return residentProvider.post(residentData)
                            .catch((err) => {throw err})
                    }
                })
        } else {
            // Update the existing resident
            return residentProvider.post(residentData)
                .catch((err) => {throw err})
        }
    }

    /**
     * Deletes a Resident record
     * @param {number} residentId
     */
    const _deleteResident = async (residentId: number) => {
        return await residentProvider.delete(residentId)
            .then((response) => {return response.success})
            .catch((err) => {throw err})
    }

    /**
     * Gets all the residents from the Resident table and sets the residentList global
     */
    const _loadResidentList = async () => {
        const searchCriteria = {
            order_by: [
                {column: 'LastName', direction: 'asc'},
                {column: 'FirstName', direction: 'asc'},
            ],
        };
        return await residentProvider.search(searchCriteria)
            .then((residents) => {
                return residents;
            })
            .catch((err) => {throw err})
    }

    return {
        deleteResident: async (residentId: number): Promise<boolean> => {
            return await _deleteResident(residentId);
        },
        loadResidentList: async (): Promise<ResidentRecord[]> => {
            return await _loadResidentList();
        },
        updateResident: async  (residentRecord: ResidentRecord): Promise<ResidentRecord> => {
            return await _updateResident(residentRecord);
        }
    }
}

export default ResidentManager;
