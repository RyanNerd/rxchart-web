import {IAuthManager} from 'managers/AuthManager';
import {IClientManager} from 'managers/ClientManager';
import {IMedicineManager} from 'managers/MedicineManager';
import {Authenticated} from 'providers/AuthenticationProvider';
import 'reactn';
import {ClientRecord, DrugLogRecord, MedicineRecord, PillboxItemRecord, PillboxRecord} from 'types/RecordTypes';
import {IProviders} from 'utility/getInitialState';

/* eslint @typescript-eslint/no-explicit-any: off */
declare module 'reactn/default' {
    // Client Type for the activeClient
    export type TClient = {
        clientInfo: ClientRecord;
        drugLogList: DrugLogRecord[];
        medicineList: MedicineRecord[];
        pillboxList: PillboxRecord[];
        pillboxItemList: PillboxItemRecord[];
    };

    export interface Reducers {
        append: (global: State, dispatch: Dispatch, ...strings: any[]) => Pick<State, 'value'>;
        doNothing: (global: State, dispatch: Dispatch) => null;
        increment: (global: State, dispatch: Dispatch, i: number) => Pick<State, 'count'>;
    }

    export interface IPreferences {
        landingPageTabSize: 'lg' | 'sm';
        rxTabSize: 'lg' | 'sm';
    }

    export interface State {
        activeTabKey: string;
        authManager: IAuthManager;
        activeClient: TClient | null;
        count: number;
        __errorDetails: any;
        medicineManager: IMedicineManager;
        otcList: MedicineRecord[];
        preferences: IPreferences | null;
        providers: IProviders;
        clientList: ClientRecord[];
        clientManager: IClientManager;
        signIn: Authenticated;
        value: string;
    }
}
