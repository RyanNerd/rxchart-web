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
        activeTabKey: string
        apiKey: string | null
        authManager: IAuthManager
        client: {action: 'load' | 'update' | 'delete', payload: null | ResidentRecord | number} | null
        count: number
        deleteOtcMedicine: number | null
        development: boolean
        drugLog: {action: 'load' | 'update' | 'delete', payload: null | DrugLogRecord | DrugLogRecord[] | number} | null
        drugLogList: DrugLogRecord[]
        errorDetails: any
        login: { username: string, password: string } | null
        loginFailed: boolean
        logout: boolean
        medicine: {action: 'load' | 'update' | 'delete', payload: null | MedicineRecord | number} | null
        medicineList: MedicineRecord[]
        medicineManager: IMedicineManager
        otcList: MedicineRecord[]
        providers: IProviders
         refreshOtc: boolean
        residentList: ResidentRecord[]
        residentManager: IResidentManager
        updateOtcMedicine: MedicineRecord | null
        value: string
    }
}
