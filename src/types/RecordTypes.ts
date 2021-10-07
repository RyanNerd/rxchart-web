export type ResidentRecord = {
    Created?: null | Date
    DOB_DAY: number | string
    DOB_MONTH: number | string
    DOB_YEAR: number | string
    FirstName: string
    Id: null | number
    LastName: string
    Nickname: string
    Notes: string
    Updated?: null | Date
    UserId?: number
    deleted_at?: null | Date
    [key: string]: any
};

export type DrugLogRecord = {
    Created?: string | null
    Id: null | number
    MedicineId: number
    Notes: string
    In: null | number
    Out: null | number
    ResidentId: number
    Updated?: null | Date
    [key: string]: any
};

export type MedicineRecord = {
    Barcode: string | null
    Directions: string | null
    Drug: string
    OtherNames: string
    FillDateDay?: string | number
    FillDateMonth?: string
    FillDateYear?: string | number
    [key: string]: any
    Id: number | null
    Notes: string | null
    Active: boolean
    OTC: boolean
    ResidentId?: number | null
    Strength: string | null
};

export const newMedicineRecord = {
    Barcode: '',
    Directions: '',
    Drug: '',
    OtherNames: '',
    Id: null,
    Notes: '',
    Active: true,
    ResidentId: null,
    Strength: ''
} as MedicineRecord;

export const newDrugLogRecord = {
    Id: null,
    MedicineId: 0,
    Notes: "",
    In: null,
    Out: null,
    ResidentId: 0
} as DrugLogRecord;

export const newResidentRecord = {
    Id: null,
    FirstName: "",
    LastName: "",
    Nickname: "",
    DOB_YEAR: "",
    DOB_MONTH: "",
    DOB_DAY: "",
    Notes: ""
} as ResidentRecord

export type PillboxRecord = {
    Id: number | null
    ResidentId: number | null
    Name: string
    Notes: string | null
    [key: string]: any
}

export const newPillboxRecord = {
    Id: null,
    ResidentId: 0,
    Name: "",
    Notes: null
}

export type PillboxItemRecord = {
    Id: number | null
    ResidentId: number
    PillboxId: number
    MedicineId: number
    Quantity: number
}

export const newPillboxItemRecord = {
    Id: null,
    ResidentId: 0,
    PillboxId: 0,
    MedicineId: 0,
    Quantity: 1
}
