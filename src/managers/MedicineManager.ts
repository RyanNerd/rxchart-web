import {ProviderTypes} from "../types/ProviderTypes";
import {DrugLogRecord, MedicineRecord} from "../types/RecordTypes";

export interface IMedicineManager {
    deleteDrugLog: (drugLogId: number) => Promise<ProviderTypes.MedHistory.DeleteResponse>
    deleteMedicine: (medicineId: number) => Promise<boolean>
    loadDrugLog: (residentId: number) => Promise<DrugLogRecord[]>
    loadMedicineList: (residentId: number) => Promise<MedicineRecord[]>
    loadOtcList: () => Promise<MedicineRecord[]>
    updateDrugLog: (drugLogRecord: DrugLogRecord, residentId: number) => Promise<DrugLogRecord[]>
    updateMedicine: (medicine: MedicineRecord) => Promise<MedicineRecord>
}

const MedicineMananger = (providers: ProviderTypes.Providers): IMedicineManager => {
    const medicineProvider = providers.medicineProvider;
    const medHistoryProvider = providers.medHistoryProvider;

    const _deleteDrugLog = async (drugLogId: number): Promise<ProviderTypes.DeleteResponse> => {
        return medHistoryProvider
            .delete(drugLogId)
            .then((deleted) => {
                return deleted;
            })
            .catch((err) => {
                throw err;
            });
    };

    const _deleteMedicine = async (medicineId: number): Promise<boolean> => {
        return medicineProvider
            .delete(medicineId)
            .then((response: ProviderTypes.Medicine.DeleteResponse) => {
                return response.success;
            })
            .catch((err) => {
                throw err;
            });
    };

    const _loadDrugLog = async (residentId: number): Promise<DrugLogRecord[]> => {
        const searchCriteria = {
            where: [{column: 'ResidentId', comparison: '=', value: residentId}],
            order_by: [{column: 'Updated', direction: 'desc'}],
        };
        return medHistoryProvider.search(searchCriteria);
    };

    const _loadMedicineList = async (residentId: number) => {
        const searchCriteria = {
            where: [{column: 'ResidentId', value: residentId}],
            order_by: [{column: 'Drug', direction: 'asc'}],
        };
        return medicineProvider.search(searchCriteria);
    }

    const _loadOtcList = async (): Promise<MedicineRecord[]> => {
        const searchCriteria = {
            where: [{column: 'OTC', value: true}],
            order_by: [{column: 'Drug', direction: 'asc'}],
        };
        return medicineProvider.search(searchCriteria);
    };

    const _updateDrugLog = async (drugLogInfo: DrugLogRecord, residentId: number): Promise<DrugLogRecord[]> => {
        return medHistoryProvider
            .post(drugLogInfo)
            .then(() => {
                return _loadDrugLog(residentId)
                    .then((drugLogList) => {
                        return drugLogList;
                    })
                    .catch((err) => {
                        throw err;
                    });
            })
            .then((drugLogList) => {
                return drugLogList;
            })
            .catch((err) => {
                throw err;
            });
    };

    const _updateMedicine = async (drugInfo: MedicineRecord): Promise<MedicineRecord> => {
        const drugData = {...drugInfo};
        if (!drugData.Id) {
            drugData.Id = null;
        }
        if (drugData.Notes === '') {
            drugData.Notes = null;
        }
        if (drugInfo.Directions === '') {
            drugData.Directions = null;
        }
        try {
            return await medicineProvider
                .post(drugData);
        } catch (err) {
            throw err;
        }
    }

    return {
        deleteDrugLog: async  (drugLogId: number) => {
            return await _deleteDrugLog(drugLogId);
        },

        deleteMedicine: async (medicineId: number) => {
            return await _deleteMedicine(medicineId);
        },

        loadDrugLog: async (residentId: number) => {
            return await _loadDrugLog(residentId);
        },

        loadMedicineList: async (residentId: number) => {
            return await _loadMedicineList(residentId);
        },

        loadOtcList: async () => {
            return await _loadOtcList();
        },

        updateDrugLog: async (drugLogRecord: DrugLogRecord, residentId: number) => {
            return await  _updateDrugLog(drugLogRecord, residentId);
        },

        updateMedicine: async (medicine: MedicineRecord) => {
            return await _updateMedicine(medicine);
        }
    }
}

export default MedicineMananger;

