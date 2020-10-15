import 'reactn';
import {DrugLogRecord, MedicineRecord, ResidentRecord} from './types/RecordTypes';
import {ProviderTypes} from './types/ProviderTypes';

declare module 'reactn/default' {
    export interface Reducers {
        append: (global: State, dispatch: Dispatch, ...strings: any[]) => Pick<State, 'value'>;
        increment: (global: State, dispatch: Dispatch, i: number) => Pick<State, 'count'>;
        doNothing: (global: State, dispatch: Dispatch) => null;
    }

    export interface State {
        count: number;
        value: string;
        activeResident: ResidentRecord | null;
        apiKey: string | null;
        baseUrl: string;
        development: boolean;
        drugLogList: DrugLogRecord[];
        medicineList: MedicineRecord[];
        providers: ProviderTypes.Providers;
        otcList: MedicineRecord[];
        residentList: ResidentRecord[];
    }
}

declare module '*.css';
