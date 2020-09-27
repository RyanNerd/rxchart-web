export type ResidentRecord = {
    Id : null | number,
    UserId: number,
    LastName: string,
    FirstName: string,
    DOB_YEAR: number,
    DOB_MONTH: number,
    DOB_DAY: number,
    Created: null | Date,
    Updated: null | Date,
    deleted_at: null | Date,
}

export type DrugLogRecord = {
    Id: null | number,
    MedicineId: number,
    Notes: string,
    Created: null | Date,
    Updated: Date,
    [key: string]: any
} | null;

export type MedicineRecord = {
    Id: number | null,
    Barcode: string | null,
    ResidentId: number | null,
    Drug: string,
    Strength: string | null,
    Directions: string | null,
    Notes: string,
    [key: string]: any
}

export const newDrugInfo = {
    Id: null,
    Barcode: "",
    ResidentId: null,
    Drug: "",
    Strength: "",
    Directions: "",
    Notes: ""
};
