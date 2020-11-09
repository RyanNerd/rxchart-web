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
        deleteClient: number | null
        deleteDrugLog: number | null
        deleteMedicine: number | null
        development: boolean
        drugLogList: DrugLogRecord[]
        errorDetails: any
        medicineList: MedicineRecord[]
        medicineManager: IMedicineManager
        otcList: MedicineRecord[]
        providers: IProviders
        refreshClients: boolean
        refreshMedicine: number | null
        refreshDrugLog: number | DrugLogRecord[] |null
        residentList: ResidentRecord[]
        residentManager: IResidentManager
        updateClient: ResidentRecord | null
        updateDrugLog: DrugLogRecord | null
        updateMedicine: MedicineRecord | null
        value: string
    }
}
