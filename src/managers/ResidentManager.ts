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
 */
const ResidentManager = (residentProvider: IResidentProvider): IResidentManager => {
    /**
     * Inserts or updates a Resident record.
     * @param {ResidentRecord} residentRecord
     */
    const _updateResident = async (residentRecord: ResidentRecord): Promise<ResidentRecord> => {
        const residentData = {...residentRecord};
        return searchExisting(residentData)
        .then(async (clients) => {
            // Does the client record already exist (including trashed records)
            if (clients.length > 0) {
                const client = clients[0];
                // Trashed (deactivated) client?
                if (client.deleted_at) {
                    return await residentProvider.restore(client.Id as number);
                } else {
                    // Is the existing client.Id different? If so then set the residentData record to the existing Id.
                    if (client.Id !== residentData.Id) {
                        residentData.Id = client.Id;
                    }
                    return await residentProvider.post(residentData);
                }
            } else {
                return residentProvider.post(residentData);
            }
        })
    }

    /**
     * Deletes a Resident record
     * @param {number} residentId
     */
    const _deleteResident = async (residentId: number) => {
        return await residentProvider.delete(residentId)
        .then((response) => {
            return response.success
        })
        .catch((err) => {
            throw err
        })
    }

    /**
     * Gets ALL the residents from the Resident table
     */
    const _loadResidentList = async () => {
        const searchCriteria = {
            order_by: [
                {column: 'LastName', direction: 'asc'},
                {column: 'FirstName', direction: 'asc'},
            ]
        };
        return await residentProvider.search(searchCriteria)
        .then((residents) => {
            return residents;
        })
        .catch((err) => {
            throw err
        })
    }

    const searchExisting = async (clientRecord: ResidentRecord) => {
        const searchExisting = {
            where: [
                {column: "FirstName", value: clientRecord.FirstName},
                {column: "LastName", value: clientRecord.LastName},
                {column: "DOB_YEAR", value: clientRecord.DOB_YEAR},
                {column: "DOB_MONTH", value: clientRecord.DOB_MONTH},
                {column: "DOB_DAY", value: clientRecord.DOB_DAY}
            ],
            with_trashed: true
        };
        return await residentProvider.search(searchExisting);
    }

    return {
        deleteResident: async (residentId: number): Promise<boolean> => {
            return await _deleteResident(residentId);
        },
        loadResidentList: async (): Promise<ResidentRecord[]> => {
            return await _loadResidentList();
        },
        updateResident: async (residentRecord: ResidentRecord): Promise<ResidentRecord> => {
            return await _updateResident(residentRecord);
        }
    }
}

export default ResidentManager;
