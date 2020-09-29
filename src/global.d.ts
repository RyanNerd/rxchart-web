import 'reactn';
import {MedicineRecord, ResidentRecord} from "./types/RecordTypes";

declare module 'reactn/default' {

    export interface Reducers {

        append: (
            global: State,
            dispatch: Dispatch,
            ...strings: any[]
        ) => Pick<State, 'value'>;

        increment: (
            global: State,
            dispatch: Dispatch,
            i: number,
        ) => Pick<State, 'count'>;

        doNothing: (
            global: State,
            dispatch: Dispatch,
        ) => null;
    }

    export interface State {
        count: number;
        value: string;
        activeResident: ResidentRecord | null;
        development: boolean;
        providers: object;
        drugLogList: null | [];
        medicineList: MedicineRecord[] | null;
        otcList: MedicineRecord[] | null;
        residentList: Array<ResidentRecord>;
        baseUrl: string;
        apiKey: string | null;
    }
}

declare module '*.css';