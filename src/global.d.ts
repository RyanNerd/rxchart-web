import 'reactn';
import {DrugLogRecord, MedicineRecord, ResidentRecord} from './types/RecordTypes';
import {IResidentManager} from "./managers/ResidentManager";
import {IMedicineManager} from "./managers/MedicineManager";
import {IAuthManager} from "./managers/AuthManager";
import {IProviders} from "./utility/getInitialState";
import {Authenticated} from "./providers/AuthenticationProvider";

declare module 'reactn/default' {
    export interface Reducers {
        append: (global: State, dispatch: Dispatch, ...strings: any[]) => Pick<State, 'value'>
        doNothing: (global: State, dispatch: Dispatch) => null
        increment: (global: State, dispatch: Dispatch, i: number) => Pick<State, 'count'>
    }

    export interface State {
        __auth: {action: 'login' | 'logout', payload: {username: string, password: string} | null} | null
        activeResident: ResidentRecord | null
        activeTabKey: string
                authManager: IAuthManager
        __client: {
            action: 'load' | 'update' | 'delete'
            cb?: (c: ResidentRecord | ResidentRecord[] | undefined) => void
            payload: null | ResidentRecord | number
        } | null
        count: number
        development: boolean
        __drugLog: {action: 'load'|'update'|'delete', payload?: null | DrugLogRecord | DrugLogRecord[] | number} | null
        drugLogList: DrugLogRecord[]
        __errorDetails: any
        __medicine: {action: 'load' | 'update' | 'delete', payload: null | MedicineRecord | number} | null
        medicineList: MedicineRecord[]
        medicineManager: IMedicineManager
        otcList: MedicineRecord[]
        __otcMedicine: {action: 'load' | 'update' | 'delete', payload: null | MedicineRecord | number} | null
        providers: IProviders
        residentList: ResidentRecord[]
        residentManager: IResidentManager
        signIn: Authenticated
        value: string
    }
}
