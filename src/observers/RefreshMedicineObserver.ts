import {useEffect, useGlobal} from "reactn";
import {IMedicineManager} from "../managers/MedicineManager";

const RefreshMedicineObserver = (mm: IMedicineManager) => {
    const [refreshMedicine, setRefreshMedicine] = useGlobal('refreshMedicine');
    const [, setMedicineList] = useGlobal('medicineList');
    const [, setRefreshDrugLog] = useGlobal('refreshDrugLog');
    const [, setErrorDetails] = useGlobal('errorDetails');

    /**
     * Set to Resident.Id when the medicineList needs a refresh
     * @var refreshMedicine {number|null}
     */
    useEffect(() => {
        if (refreshMedicine) {
            mm.loadMedicineList(refreshMedicine)
            .then((meds) => {setMedicineList(meds)})
            .then(() => {setRefreshDrugLog(refreshMedicine)})
            .then(() => {setRefreshMedicine(null)})
            .catch((err) => setErrorDetails(err));
        }
    }, [mm, refreshMedicine, setErrorDetails, setMedicineList, setRefreshDrugLog, setRefreshMedicine]);
}

export default RefreshMedicineObserver;
