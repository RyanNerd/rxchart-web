import {IAuthManager} from "managers/AuthManager";
import {IMedicineManager} from "managers/MedicineManager";
import {IResidentManager} from "managers/ResidentManager";
import {Authenticated} from "providers/AuthenticationProvider";
import 'reactn';
import {DrugLogRecord, MedicineRecord, PillboxItemRecord, PillboxRecord, ResidentRecord} from 'types/RecordTypes';
import {IProviders} from "utility/getInitialState";

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
        __drugLog: {
            action: 'load'|'update'|'delete',
            payload?: null | DrugLogRecord | DrugLogRecord[] | number.drugLogList,
            cb?: (dl: DrugLogRecord[] | DrugLogRecord) => void
        } | null
        drugLogList: DrugLogRecord[]
        __errorDetails: any
        __medicine: {
            action: 'load' | 'update' | 'delete',
            payload: null | MedicineRecord | number,
            cb?: (mr: MedicineRecord[] | MedicineRecord) => void
        } | null
        __pillbox: {
            action: 'load' | 'update' | 'delete',
            payload: null | PillboxRecord | number,
            cb?: (pb: PillboxRecord[] | PillboxRecord) => void
        } | null
        __pillboxItem: {
            action: 'load' | 'update' | 'delete',
            payload: null | PillboxItemRecord | number,
            cb?: (pbi: PillboxItemRecord[] | PillboxItemRecord) => void
        } | null
        medicineList: MedicineRecord[]
        pillboxList: PillboxRecord[]
        pillboxItemList: PillboxItemRecord[]
        medicineManager: IMedicineManager
        otcList: MedicineRecord[]
        __otcMedicine: {
            action: 'load' | 'update' | 'delete',
            payload: null | MedicineRecord | number,
            cb?: (m: MedicineRecord | MedicineRecord[]) => void
        } | null
        providers: IProviders
        residentList: ResidentRecord[]
        residentManager: IResidentManager
        signIn: Authenticated
        value: string
    }
}
