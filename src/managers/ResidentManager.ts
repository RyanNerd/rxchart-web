import {IResidentProvider} from 'providers/ResidentProvider';
import {ResidentRecord} from 'types/RecordTypes';
import {asyncWrapper} from 'utility/common';

type DeleteResponse = {success: boolean};

export interface IResidentManager {
    deleteResident: (residentId: number) => Promise<boolean>;
    loadResidentList: () => Promise<ResidentRecord[]>;
    updateResident: (r: ResidentRecord) => Promise<ResidentRecord>;
}

/**
 * ResidentManager handles business logic for updating, deleting, and loading Resident data.
 * @param {IResidentProvider} residentProvider The resident provider "class" object
 */
const ResidentManager = (residentProvider: IResidentProvider): IResidentManager => {
    /**
     * Inserts or updates a Resident record.
     * @param {ResidentRecord} residentRecord The client record object
     */
    const _updateResident = async (residentRecord: ResidentRecord): Promise<ResidentRecord> => {
        const [e, r] = (await asyncWrapper(residentProvider.post(residentRecord))) as [
            unknown,
            Promise<ResidentRecord>
        ];
        if (e) throw e;
        else return r;
    };

    /**
     * Deletes a Resident record
     * @param {number} residentId The PK of the Resident table
     */
    const _deleteResident = async (residentId: number) => {
        const [e, r] = (await asyncWrapper(residentProvider.delete(residentId))) as [unknown, Promise<DeleteResponse>];
        if (e) throw e;
        else return (await r).success;
    };

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
        const [e, r] = (await asyncWrapper(residentProvider.search(searchCriteria))) as [
            unknown,
            Promise<ResidentRecord[]>
        ];
        if (e) throw e;
        else return r;
    };

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
    };
};

export default ResidentManager;
