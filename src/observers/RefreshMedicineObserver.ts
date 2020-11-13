import {IMedicineManager} from "../managers/MedicineManager";
import {useEffect, useGlobal} from "reactn";

/**
 * Watch for changes to the refreshMedicine global
 * when populated it is set to the Resident.Id of the medicineList to be refreshed
 * @param {IMedicineManager} mm
 * @constructor
 */
const RefreshMedicineObserver = (mm: IMedicineManager) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setMedicineList] = useGlobal('medicineList');
    const [, setRefreshDrugLog] = useGlobal('refreshDrugLog');
    const [refreshMedicine, setRefreshMedicine] = useGlobal('refreshMedicine');

    useEffect(() => {
        if (refreshMedicine) {
            mm.loadMedicineList(refreshMedicine)
            .then((meds) => {
                setMedicineList(meds)
            })
            .then(() => {
                setRefreshDrugLog(refreshMedicine)
            })
            .then(() => {
                setRefreshMedicine(null)
            })
            .catch((err) => setErrorDetails(err));
        }
    }, [mm, refreshMedicine, setErrorDetails, setMedicineList, setRefreshDrugLog, setRefreshMedicine]);
}

export default RefreshMedicineObserver;
