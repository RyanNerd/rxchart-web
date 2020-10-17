import 'reactn';
import {DrugLogRecord, MedicineRecord, ResidentRecord} from './types/RecordTypes';
import {ProviderTypes} from './types/ProviderTypes';
import {CurrentResident} from "./types/CurrentResident";
import {IResidentManagerReturn} from "./utility/ResidentManager";

declare module 'reactn/default' {
    export interface Reducers {
        append: (global: State, dispatch: Dispatch, ...strings: any[]) => Pick<State, 'value'>
        doNothing: (global: State, dispatch: Dispatch) => null
        increment: (global: State, dispatch: Dispatch, i: number) => Pick<State, 'count'>
    }

    export interface State {
        activeResident: ResidentRecord | null
        apiKey: string | null
        baseUrl: string
        count: number
        currentResident: CurrentResident
        development: boolean
        drugLogList: DrugLogRecord[]
        medicineList: MedicineRecord[]
        otcList: MedicineRecord[]
        providers: ProviderTypes.Providers
        residentList: ResidentRecord[]
        residentManager: IResidentManagerReturn
        value: string
    }
}
