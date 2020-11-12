import {IMedicineManager} from "../managers/MedicineManager";
import {useEffect, useGlobal} from "reactn";

const RefreshMedicineObserver = (mm: IMedicineManager) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setMedicineList] = useGlobal('medicineList');
    const [, setRefreshDrugLog] = useGlobal('refreshDrugLog');
    const [refreshMedicine, setRefreshMedicine] = useGlobal('refreshMedicine');

    /**
     * Set to Resident.Id when the medicineList needs a refresh
     * @var refreshMedicine {number|null}
     */
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
