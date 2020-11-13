import {IMedicineManager} from "../managers/MedicineManager";
import {ResidentRecord} from "../types/RecordTypes";
import {useEffect, useGlobal} from "reactn";

/**
 * Watch for changes to the deleteDrugLog global. When populated it is set to the MedHistory.Id to be deleted
 * @param {IMedicineManager} mm
 * @param {ResidentRecord | null} activeResident
 * @constructor
 */
const DeleteDrugLogObserver = (mm: IMedicineManager, activeResident: ResidentRecord | null) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setRefreshDrugLog] = useGlobal('refreshDrugLog');
    const [deleteDrugLog, setDeleteDrugLog] = useGlobal('deleteDrugLog');

    useEffect(() => {
        const clientId = activeResident?.Id;
        if (deleteDrugLog && clientId) {
            mm.deleteDrugLog(deleteDrugLog)
            .then((deleted) => {
                if (deleted) {
                    setRefreshDrugLog(clientId);
                } else {
                    setErrorDetails(new Error('unable to delete drugLogRecord. Id: ' + deleteDrugLog));
                }
            })
            .then(() => {
                setDeleteDrugLog(null)
            })
            .catch((err) => setErrorDetails(err))
        }
    }, [activeResident, deleteDrugLog, mm, setDeleteDrugLog, setErrorDetails, setRefreshDrugLog])
}

export default DeleteDrugLogObserver;
