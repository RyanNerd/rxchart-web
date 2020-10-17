import {IResidentProvider} from '../providers/ResidentProvider';
import MedicineProvider from '../providers/MedicineProvider';
import MedHistoryProvider from '../providers/MedHistoryProvider';
import {DrugLogRecord, MedicineRecord, ResidentRecord} from './RecordTypes';
import {IAuthenticationProvider} from "../providers/AuthenticationProvider";

export namespace ProviderTypes {
    export type Providers = {
        authenticationProvider: IAuthenticationProvider;
        residentProvider: IResidentProvider;
        medicineProvider: typeof MedicineProvider;
        medHistoryProvider: typeof MedHistoryProvider;
    };

    export type DeleteResponse = { success: boolean };

    export namespace MedHistory {
        export type RecordResponse = {
            data: DrugLogRecord[] | DrugLogRecord;
            status: number;
            success: boolean;
        };
        export type DeleteResponse = ProviderTypes.DeleteResponse;
    }

    export namespace Medicine {
        export type RecordResponse = {
            data: MedicineRecord[] | MedicineRecord;
            status: number;
            success: boolean;
        };
        export type DeleteResponse = ProviderTypes.DeleteResponse;
    }

    export namespace Resident {
        export type RecordResponse = {
            data: ResidentRecord[] | ResidentRecord;
            status: number;
            success: boolean;
        };
        export type DeleteResponse = ProviderTypes.DeleteResponse;
    }
}
