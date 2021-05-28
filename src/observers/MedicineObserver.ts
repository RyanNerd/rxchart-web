import {useEffect, useGlobal} from "reactn";

import {IMedicineManager} from "../managers/MedicineManager";
import {MedicineRecord, ResidentRecord} from "../types/RecordTypes";

/**
 * Watch for changes to the __medicine global
 * when set take the action specified: load, update, or delete
 * @param {IMedicineManager} mm
 * @param {ResidentRecord | null}  activeClient
 */
const MedicineObserver = (mm: IMedicineManager, activeClient: ResidentRecord | null) => {
    const [medicine, setMedicine] = useGlobal('__medicine');
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [, setMedicineList] = useGlobal('medicineList');

    useEffect(() => {
        if (medicine) {
            const action = medicine.action;
            switch (action) {
                case "load": {
                    mm.loadMedicineList(medicine.payload as number)
                    .then((meds) => {
                        return setMedicineList(meds);
                    })
                    .catch((err) => setErrorDetails(err))
                    .finally(() => setMedicine(null))
                    break;
                }

                case "update": {
                    const medicineRecord = medicine.payload;
                    if (medicineRecord) {
                        mm.updateMedicine(medicineRecord as MedicineRecord)
                        .then((drugRecord) => {
                            const clientId = drugRecord && drugRecord.ResidentId ? drugRecord.ResidentId : null;
                            return setMedicine({action: "load", payload: clientId});
                        })
                        .catch((err) => setErrorDetails(err))
                        .finally(() => setMedicine(null))
                    }
                    break;
                }

                case "delete": {
                    const medicineId = medicine.payload as number;
                    mm.deleteMedicine(medicineId)
                    .then((deleted) => {
                        if (deleted) {
                            return setMedicine({action: "load", payload: activeClient?.Id || null});
                        } else {
                           return  setErrorDetails(new Error('Unable to delete Medicine record Id: ' + medicineId));
                        }
                    })
                    .catch((err) => setErrorDetails(err))
                    .finally(() => setMedicine(null))
                    break;
                }
            }
        }
    }, [activeClient, medicine, mm, setMedicine, setErrorDetails, setMedicineList]);
}

export default MedicineObserver;
