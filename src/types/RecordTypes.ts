export type ResidentRecord = {
  Id: null | number;
  UserId?: number;
  LastName: string;
  FirstName: string;
  DOB_YEAR: number | string;
  DOB_MONTH: number | string;
  DOB_DAY: number | string;
  Created?: null | Date;
  Updated?: null | Date;
  deleted_at?: null | Date;
  [key: string]: any;
};

export type DrugLogRecord = {
  Id: null | number;
  MedicineId: number;
  Notes: string;
  Created?: string | null;
  Updated?: string | null;
  [key: string]: any;
};

export type MedicineRecord = {
  Id: number | null;
  Barcode: string | null;
  ResidentId?: number | null;
  Drug: string;
  Strength: string | null;
  Directions: string | null;
  Notes: string | null;
  OTC: boolean;
  FillDateMonth?: string | string[] | number;
  FillDateDay?: string | string[] | number;
  FillDateYear?: string | string[] | number;
  [key: string]: any;
};

export const newDrugInfo = {
  Id: null,
  Barcode: '',
  ResidentId: null,
  Drug: '',
  Strength: '',
  Directions: '',
  Notes: '',
} as MedicineRecord;
