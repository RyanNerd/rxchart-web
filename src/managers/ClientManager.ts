import {IClientProvider} from 'providers/ClientProvider';
import {ClientRecord} from 'types/RecordTypes';
import {asyncWrapper} from 'utility/common';

type DeleteResponse = {success: boolean};

export interface IClientManager {
    deleteClient: (clientId: number) => Promise<boolean>;
    loadClientList: () => Promise<ClientRecord[]>;
    updateClient: (r: ClientRecord) => Promise<ClientRecord>;
}

/**
 * ClientManager handles business logic for updating, deleting, and loading Client data.
 * @param {IClientProvider} clientProvider The client provider "class" object
 */
const ClientManager = (clientProvider: IClientProvider): IClientManager => {
    /**
     * Inserts or updates a Client record.
     * @param {ClientRecord} clientRecord The client record object
     */
    const _updateClient = async (clientRecord: ClientRecord): Promise<ClientRecord> => {
        const [e, r] = (await asyncWrapper(clientProvider.post(clientRecord))) as [unknown, Promise<ClientRecord>];
        if (e) throw e;
        else return r;
    };

    /**
     * Deletes a Client record
     * @param {number} clientId The PK of the Client table
     */
    const _deleteClient = async (clientId: number) => {
        const [e, r] = (await asyncWrapper(clientProvider.delete(clientId))) as [unknown, Promise<DeleteResponse>];
        if (e) throw e;
        else return (await r).success;
    };

    /**
     * Gets ALL the clients from the Client table
     */
    const _loadClientList = async () => {
        const searchCriteria = {
            orderBy: [
                ['LastName', 'asc'],
                ['FirstName', 'asc']
            ]
        };
        const [e, r] = (await asyncWrapper(clientProvider.search(searchCriteria))) as [
            unknown,
            Promise<ClientRecord[]>
        ];
        if (e) throw e;
        else return r;
    };

    return {
        deleteClient: async (clientId: number): Promise<boolean> => {
            return await _deleteClient(clientId);
        },
        loadClientList: async (): Promise<ClientRecord[]> => {
            return await _loadClientList();
        },
        updateClient: async (clientRecord: ClientRecord): Promise<ClientRecord> => {
            return await _updateClient(clientRecord);
        }
    };
};

export default ClientManager;
