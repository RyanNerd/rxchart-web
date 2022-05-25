// ORM record of the Resident "Client" table
export type ClientRecord = {
    Created?: null | Date;
    DOB_DAY: number | string;
    DOB_MONTH: number | string;
    DOB_YEAR: number | string;
    FirstName: string;
    Id: null | number;
    LastName: string;
    Nickname: string;
    Notes: string;
    HMIS: string;
    EnrollmentId: string;
    Updated?: null | Date;
    UserId?: number;
    deleted_at?: null | Date;
    [key: string]: unknown;
};

// ORM record of the Document table
export type FileRecord = {
    Created?: null | Date;
    Description: null | string;
    FileName: string;
    Id: null | number;
    Image: null | string;
    MediaType: null | string;
    ResidentId: number;
    Size: null | number;
    Updated?: null | Date;
    [key: string]: unknown;
    deleted_at?: null | Date;
};

// ORM record of the MedHistory table
export type DrugLogRecord = {
    Created?: string | null;
    Id: null | number;
    In: null | number;
    MedicineId: number;
    Notes: null | string;
    Out: null | number;
    PillboxItemId: number | null;
    ResidentId: number;
    Updated?: null | Date;
    [key: string]: unknown;
};

// ORM record of the Medicine table
export type MedicineRecord = {
    Barcode: string | null;
    Directions: string | null;
    Drug: string;
    OtherNames: string;
    FillDateDay?: string | number;
    FillDateMonth?: string;
    FillDateYear?: string | number;
    [key: string]: unknown;
    Id: number | null;
    Notes: string | null;
    Active: boolean;
    OTC: boolean;
    ResidentId?: number | null;
    Strength: string | null;
};

// ORM record of the Pillbox table
export type PillboxRecord = {
    Id: number | null;
    ResidentId: number | null;
    Name: string;
    Notes: string | null;
    [key: string]: unknown;
};

// ORM record of the PillboxItem table
export type PillboxItemRecord = {
    Id: number | null;
    ResidentId: number;
    PillboxId: number;
    MedicineId: number;
    Quantity: number;
};

// Default empty Medication record
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

// Default empty MedHistory record
export const newDrugLogRecord = {
    Id: null,
    MedicineId: 0,
    Notes: '',
    In: null,
    Out: null,
    PillboxItemId: null,
    ResidentId: 0
} as DrugLogRecord;

// Default empty Resident (Client) record
export const newResidentRecord = {
    Id: null,
    FirstName: '',
    LastName: '',
    Nickname: '',
    DOB_YEAR: '',
    DOB_MONTH: '',
    DOB_DAY: '',
    Notes: ''
} as ClientRecord;

// Default empty Pillbox record
export const newPillboxRecord = {
    Id: null,
    ResidentId: 0,
    Name: '',
    Notes: null
} as PillboxRecord;

// Default empty PillboxItem record
export const newPillboxItemRecord = {
    Id: null,
    ResidentId: 0,
    PillboxId: 0,
    MedicineId: 0,
    Quantity: 1
} as PillboxItemRecord;
