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
        if (!residentData.Id) {
            residentData.Id = null;
        }
        try {
            return await residentProvider.post(residentData);
        } catch (err) {
            throw err;
        }
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
            orderBy: [
                ['LastName', 'asc'],
                ['FirstName', 'asc']
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
