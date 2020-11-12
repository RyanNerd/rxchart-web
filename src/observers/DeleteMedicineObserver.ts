import {IMedicineManager} from "../managers/MedicineManager";
import {ResidentRecord} from "../types/RecordTypes";
import {useEffect, useGlobal} from "reactn";

const DeleteMedicineObserver = (mm: IMedicineManager, activeResident: ResidentRecord | null) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setRefreshMedicine] = useGlobal('refreshMedicine');
    const [deleteMedicine, setDeleteMedicine] = useGlobal('deleteMedicine');

    /**
     * Set to Id of the the MedicineRecord to be deleted
     * @var deleteMedicne {number|null}
     */
    useEffect(() => {
        if (deleteMedicine && activeResident) {
            mm.deleteMedicine(deleteMedicine)
            .then((deleted) => {
                if (deleted) {
                    setRefreshMedicine(activeResident?.Id);
                }
            })
            .then(() => {
                setDeleteMedicine(null)
            })
            .catch((err) => setErrorDetails(err));
        }
    }, [activeResident, deleteMedicine, mm, setDeleteMedicine, setErrorDetails, setRefreshMedicine])
}

export default DeleteMedicineObserver;
