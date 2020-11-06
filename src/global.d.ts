import 'reactn';
import {DrugLogRecord, MedicineRecord, ResidentRecord} from './types/RecordTypes';
import {IResidentManager} from "./managers/ResidentManager";
import {IMedicineManager} from "./managers/MedicineManager";
import {IAuthManager} from "./managers/AuthManager";
import {IProviders} from "./utility/getInitialState";

declare module 'reactn/default' {
    export interface Reducers {
        append: (global: State, dispatch: Dispatch, ...strings: any[]) => Pick<State, 'value'>
        doNothing: (global: State, dispatch: Dispatch) => null
        increment: (global: State, dispatch: Dispatch, i: number) => Pick<State, 'count'>
    }

    export interface State {
        activeResident: ResidentRecord | null
        apiKey: string | null
        authManager: IAuthManager
        count: number
        development: boolean
        drugLogList: DrugLogRecord[]
        errorDetails: any
        medicineList: MedicineRecord[]
        medicineManager: IMedicineManager
        otcList: MedicineRecord[]
        providers: IProviders
        residentList: ResidentRecord[]
        residentManager: IResidentManager
        value: string
        refreshClients: boolean
    }
}
