import {IMedicineManager} from "../managers/MedicineManager";
import {MedicineRecord} from "../types/RecordTypes";
import {useEffect, useGlobal} from "reactn";

/**
 * Watch for changes to the refreshOtc global
 * when set to true indicates that the otcList global should be reloaded
 * @param {IMedicineManager} mm
 * @constructor
 */
const OtcMedicineObserver = (mm: IMedicineManager) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setOtcList] = useGlobal('otcList');
    const [otcMedicine, setOtcMedicine] = useGlobal('otcMedicine');

    useEffect(() => {
        if (otcMedicine) {
            const action = otcMedicine.action;
            switch (action) {
                case "load": {
                    mm.loadOtcList()
                    .then((otcList) => {
                        setOtcList(otcList)
                    })
                    .then(() => {
                        setOtcMedicine(null)
                    })
                    .catch((err) => {
                        setErrorDetails(err)
                    })
                    break;
                }
                case "update": {
                    const otcRecord = otcMedicine.payload as MedicineRecord;
                    if (otcRecord) {
                        mm.updateMedicine(otcRecord)
                        .then(() => {
                            setOtcMedicine({action: "load", payload: null});
                        })
                        .catch((err) => setErrorDetails(err));
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
                        .catch((err) => setErrorDetails(err));
                    }
                    break;
                }
            }
        }
    }, [mm, otcMedicine, setErrorDetails, setOtcList, setOtcMedicine])
}

export default OtcMedicineObserver;
