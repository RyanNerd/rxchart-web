import ResidentProvider from "../providers/ResidentProvider";
import MedicineProvider from "../providers/MedicineProvider";
import MedHistoryProvider from "../providers/MedHistoryProvider";
import {DrugLogRecord, MedicineRecord, ResidentRecord} from "./RecordTypes";

export namespace ProviderTypes {
    export type Providers = {
        residentProvider: typeof ResidentProvider | null,
        medicineProvider: typeof MedicineProvider | null,
        medHistoryProvider: typeof MedHistoryProvider | null
    }

    export type DeleteResponse = { success: boolean };

    export namespace MedHistory {
        export type RecordResponse = {
            success: boolean,
            status: number,
            data: DrugLogRecord[] | DrugLogRecord
        }
        export type DeleteResponse = ProviderTypes.DeleteResponse;
    }

    export namespace Medicine {
        export type RecordResponse = {
            success: boolean,
            status: number,
            data: MedicineRecord[] | MedicineRecord
        }
        export type DeleteResponse = ProviderTypes.DeleteResponse;
    }

    export namespace Resident {
        export type RecordResponse = {
            success: boolean,
            status: number,
            data: ResidentRecord[] | ResidentRecord
        }
        export type DeleteResponse = ProviderTypes.DeleteResponse;
    }
}
