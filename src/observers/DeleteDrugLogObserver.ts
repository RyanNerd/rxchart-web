import {IMedicineManager} from "../managers/MedicineManager";
import {ResidentRecord} from "../types/RecordTypes";
import {useEffect, useGlobal} from "reactn";

const DeleteDrugLogObserver = (mm: IMedicineManager, activeResident: ResidentRecord | null) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setRefreshDrugLog] = useGlobal('refreshDrugLog');
    const [deleteDrugLog, setDeleteDrugLog] = useGlobal('deleteDrugLog');

    /**
     * Set to the MedHistoy.Id for the DrugLogRecord to delete.
     * @var deleteDrugLog {number|null}
     */
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
