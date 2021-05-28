import {useEffect, useGlobal} from "reactn";

import {IMedicineManager} from "../managers/MedicineManager";
import {MedicineRecord} from "../types/RecordTypes";

/**
 * Watch for changes to the __otcMedicine global
 * when set to true indicates that the otcList global should be reloaded
 * @param {IMedicineManager} mm
 */
const OtcMedicineObserver = (mm: IMedicineManager) => {
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [, setOtcList] = useGlobal('otcList');
    const [otcMedicine, setOtcMedicine] = useGlobal('__otcMedicine');

    useEffect(() => {
        if (otcMedicine) {
            const action = otcMedicine.action;
            switch (action) {
                case "load": {
                    mm.loadOtcList()
                    .then((otcList) => {
                        return setOtcList(otcList);
                    })
                    .catch((err) => setErrorDetails(err))
                    .finally(() => setOtcMedicine(null))
                    break;
                }

                case "update": {
                    const otcRecord = otcMedicine.payload as MedicineRecord;
                    if (otcRecord) {
                        mm.updateMedicine(otcRecord)
                        .then(() => {
                            return setOtcMedicine({action: "load", payload: null});
                        })
                        .catch((err) => setErrorDetails(err))
                        .finally(() => setOtcMedicine(null))
                    }
                    break;
                }

                case "delete": {
                    const medicineId = otcMedicine.payload as number;
                    if (medicineId) {
                        mm.deleteMedicine(medicineId)
                        .then((deleted) => {
                            if (deleted) {
                                return setOtcMedicine({action: "load", payload: null});
                            } else {
                                return setErrorDetails(new Error('Unable to delete OTC medicine Id: ' + medicineId));
                            }
                        })
                        .catch((err) => setErrorDetails(err))
                        .finally(() => setOtcMedicine(null))
                    }
                    break;
                }
            }
        }
    }, [mm, otcMedicine, setErrorDetails, setOtcList, setOtcMedicine])
}

export default OtcMedicineObserver;
