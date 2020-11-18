import {IMedicineManager} from "../managers/MedicineManager";
import {useEffect, useGlobal} from "reactn";
import {MedicineRecord, ResidentRecord} from "../types/RecordTypes";

/**
 * Watch for changes to the refreshMedicine global
 * when populated it is set to the Resident.Id of the medicineList to be refreshed
 * @param {IMedicineManager} mm
 * @param {ResidentRecord | null}  activeClient
 * @constructor
 */
const MedicineObserver = (mm: IMedicineManager, activeClient: ResidentRecord | null) => {
    const [medicine, setMedicine] = useGlobal('medicine');
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setMedicineList] = useGlobal('medicineList');

    useEffect(() => {
        if (medicine) {
            const action = medicine.action;
            switch (action) {
                case "load": {
                    mm.loadMedicineList(medicine.payload as number)
                    .then((meds) => {
                        setMedicineList(meds)
                    })
                    .then(() => {
                        setMedicine(null)
                    })
                    .catch((err) => setErrorDetails(err));
                    break;
                }
                case "update": {
                    const medicineRecord = medicine.payload;
                    if (medicineRecord) {
                        mm.updateMedicine(medicineRecord as MedicineRecord)
                        .then((drugRecord) => {
                            const clientId = drugRecord && drugRecord.ResidentId ? drugRecord.ResidentId : null;
                            setMedicine({action: "load", payload: clientId});
                        })
                        .catch((err) => setErrorDetails(err));
                    }
                    break;
                }
                case "delete": {
                    const medicineId = medicine.payload as number;
                    mm.deleteMedicine(medicineId)
                    .then((deleted) => {
                        if (deleted) {
                            setMedicine({action: "load", payload: activeClient?.Id || null});
                        } else {
                            setErrorDetails(new Error('Unable to delete Medicine record Id: ' + medicineId))
                        }
                    })
                    .catch((err) => setErrorDetails(err));
                }
            }
        }
    }, [activeClient, medicine, mm, setMedicine, setErrorDetails, setMedicineList]);
}

export default MedicineObserver;
