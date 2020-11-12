import {useEffect, useGlobal} from "reactn";
import {IMedicineManager} from "../managers/MedicineManager";
import {ResidentRecord} from "../types/RecordTypes";

const DeleteDrugLogObserver = (mm: IMedicineManager, activeResident: ResidentRecord | null) => {
    const [deleteDrugLog, setDeleteDrugLog] = useGlobal('deleteDrugLog');
    const [, setRefreshDrugLog] = useGlobal('refreshDrugLog');
    const [, setErrorDetails] = useGlobal('errorDetails');

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
            .then(() => {setDeleteDrugLog(null)})
            .catch((err) => setErrorDetails(err))
        }
    }, [activeResident, deleteDrugLog, mm, setDeleteDrugLog, setErrorDetails, setRefreshDrugLog])
}

export default DeleteDrugLogObserver;
