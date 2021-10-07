import {IResidentProvider} from "providers/ResidentProvider";
import {ResidentRecord} from "types/RecordTypes";
import {asyncWrapper} from "utility/common";

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
        const [e, r] = await asyncWrapper(residentProvider.post(residentRecord));
        if (e) throw e; else return r as Promise<ResidentRecord>;
    }

    /**
     * Deletes a Resident record
     * @param {number} residentId
     */
    const _deleteResident = async (residentId: number) => {
        const [e, r] = await asyncWrapper(residentProvider.delete(residentId));
        if (e) throw e; else return r.success as Promise<boolean>;
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
        const [e, r] = await asyncWrapper(residentProvider.search(searchCriteria));
        if (e) throw e; else return r as Promise<ResidentRecord[]>;
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
