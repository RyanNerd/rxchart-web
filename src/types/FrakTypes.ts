import ResidentProvider from "../providers/ResidentProvider";
import MedicineProvider from "../providers/MedicineProvider";
import MedHistoryProvider from "../providers/MedHistoryProvider";

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
