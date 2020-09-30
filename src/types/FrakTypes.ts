import ResidentProvider from "../providers/ResidentProvider";
import MedicineProvider from "../providers/MedicineProvider";
import MedHistoryProvider from "../providers/MedHistoryProvider";
import {DrugLogRecord} from "./RecordTypes";

export type FrakType = {
    post: Function
    get: Function
    delete_: Function
} | null;

export type BaseUrlType = string | null;
export type ApiKeyType = string | null;

export type ProvidersType = {
    residentProvider: typeof ResidentProvider | null,
    medicineProvider: typeof MedicineProvider | null,
    medHistoryProvider: typeof MedHistoryProvider | null
}

export namespace MedHistoryTypes {
    export type RecordResponse  = {
        success: boolean,
        status: number,
        data: DrugLogRecord | DrugLogRecord[]
    }
    export type SearchResponse = RecordResponse;
    export type ReadResponse = RecordResponse;
    export type DeleteResponse = {success: boolean};
}

export namespace FrakTypes {
    export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE';
    export type BodyType = Body | object | string;
    export type Request = {
        mode: string,
        headers?: Headers,
        body?: BodyType,
        method?: HTTPMethod
    }

}
