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
        drugLogList: DrugLogRecord[]
        __errorDetails: any
        medicineList: MedicineRecord[]
        pillboxList: PillboxRecord[]
        pillboxItemList: PillboxItemRecord[]
        medicineManager: IMedicineManager
        otcList: MedicineRecord[]
        providers: IProviders
        residentList: ResidentRecord[]
        residentManager: IResidentManager
        signIn: Authenticated
        value: string
    }
}
