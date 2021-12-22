/* eslint-disable no-underscore-dangle */
import {IClientProvider} from 'providers/ClientProvider';
import {TClient} from 'reactn/default';
import {ClientRecord} from 'types/RecordTypes';
import {asyncWrapper} from 'utility/common';

type DeleteResponse = {success: boolean};

export interface IClientManager {
    checkForDupe: (clientRecord: ClientRecord) => Promise<ClientRecord[]>;
    deleteClient: (clientId: number) => Promise<boolean>;
    loadClientList: () => Promise<ClientRecord[]>;
    loadClient: (clientId: number) => Promise<TClient>;
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
        const [error, r] = (await asyncWrapper(clientProvider.post(clientRecord))) as [unknown, Promise<ClientRecord>];
        if (error) throw error;
        else return r;
    };

    /**
     * Loads the Client object
     * @param {number} clientId The PK of the client
     */
    const _loadClient = async (clientId: number) => {
        const [error, r] = (await asyncWrapper(clientProvider.load(clientId))) as [unknown, Promise<TClient>];
        if (error) throw error;
        else return r;
    };

    /**
     * Deletes a Client record
     * @param {number} clientId The PK of the Client table
     */
    const _deleteClient = async (clientId: number) => {
        const [error, r] = (await asyncWrapper(clientProvider.delete(clientId))) as [unknown, Promise<DeleteResponse>];
        if (error) throw error;
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
        const [error, r] = (await asyncWrapper(clientProvider.search(searchCriteria))) as [
            unknown,
            Promise<ClientRecord[]>
        ];
        if (error) throw error;
        else return r;
    };

    /**
     * Given a client record check if there's a duplicate record
     * @param {ClientRecord} client The client object
     */
    const _checkForDupe = async (client: ClientRecord) => {
        const searchCriteria = {
            where: [
                ['FirstName', '=', client.FirstName],
                ['LastName', '=', client.LastName],
                ['DOB_YEAR', '=', client.DOB_YEAR],
                ['DOB_MONTH', '=', client.DOB_MONTH],
                ['DOB_DAY', '=', client.DOB_DAY],
                ['Id', '<>', client.Id]
            ],
            withTrashed: true
        };
        const [error, r] = (await asyncWrapper(clientProvider.search(searchCriteria))) as [
            unknown,
            Promise<ClientRecord[]>
        ];
        if (error) throw error;
        else return r;
    };

    return <IClientManager>{
        checkForDupe: async (clientRecord: ClientRecord): Promise<ClientRecord[]> => {
            return await _checkForDupe(clientRecord);
        },
        deleteClient: async (clientId: number): Promise<boolean> => {
            return await _deleteClient(clientId);
        },
        loadClient: async (clientId: number): Promise<TClient> => {
            return await _loadClient(clientId);
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
