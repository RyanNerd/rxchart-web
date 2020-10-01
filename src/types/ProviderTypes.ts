import ResidentProvider from "../providers/ResidentProvider";
import MedicineProvider from "../providers/MedicineProvider";
import MedHistoryProvider from "../providers/MedHistoryProvider";
import {DrugLogRecord} from "./RecordTypes";

export namespace ProviderTypes {
    export type Providers = {
        residentProvider: typeof ResidentProvider | null,
        medicineProvider: typeof MedicineProvider | null,
        medHistoryProvider: typeof MedHistoryProvider | null
    }

    export namespace MedHistory {
        export type RecordResponse = {
            success: boolean,
            status: number,
            data: DrugLogRecord | DrugLogRecord[]
        }
        export type SearchResponse = RecordResponse;
        export type ReadResponse = RecordResponse;
        export type DeleteResponse = { success: boolean };
    }
}