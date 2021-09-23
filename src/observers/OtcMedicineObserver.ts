import {IMedicineManager} from "managers/MedicineManager";
import {useEffect, useGlobal} from "reactn";
import {MedicineRecord} from "types/RecordTypes";

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
                        setOtcList(otcList);
                        if (otcMedicine.cb) {
                            otcMedicine.cb(otcList);
                        }
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
                            setOtcMedicine({action: "load", payload: null});
                            if (otcMedicine.cb) {
                                otcMedicine.cb(otcRecord);
                            }
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
                                setOtcMedicine({action: "load", payload: null});
                            } else {
                                setErrorDetails(new Error('Unable to delete OTC medicine Id: ' + medicineId));
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
