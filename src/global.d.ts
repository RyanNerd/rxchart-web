import {IAuthManager} from 'managers/AuthManager';
import {IMedicineManager} from 'managers/MedicineManager';
import {Authenticated} from 'providers/AuthenticationProvider';
import 'reactn';
import {State} from 'reactn/default';
import {
    ClientRecord,
    DrugLogRecord,
    FileRecord,
    MedicineRecord,
    PillboxItemRecord,
    PillboxRecord
} from 'types/RecordTypes';
import {IProviders} from 'utility/getInitialState';

/* eslint @typescript-eslint/no-explicit-any: off */
declare module 'reactn/default' {
    // Client Type for the activeClient
    export type TClient = {
        clientInfo: ClientRecord;
        fileList: FileRecord[];
        drugLogList: DrugLogRecord[];
        medicineList: MedicineRecord[];
        pillboxList: PillboxRecord[];
        pillboxItemList: PillboxItemRecord[];
    };

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
        signIn: Authenticated;
        value: string;
    }
}

export interface Reducers {
    append: (global: State, dispatch: Dispatch, ...strings: unknown[]) => Pick<State, 'value'>;
    doNothing: (global: State, dispatch: Dispatch) => null;
    increment: (global: State, dispatch: Dispatch, index: number) => Pick<State, 'count'>;
}
