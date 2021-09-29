import {useEffect, useGlobal} from "reactn";
import {ResidentRecord} from "types/RecordTypes";
import usePrevious from "../hooks/usePrevious";

/**
 * Watch for changes to the global activeResident
 * when populated it triggers a refresh of the medicineList global
 * @param {ResidentRecord|null} activeResident
 */
const ActiveResidentObserver = (activeResident: ResidentRecord | null) => {
    const [mm] = useGlobal('medicineManager');
    const [, setMedicineList] = useGlobal('medicineList');
    const [, setDrugLog] = useGlobal('__drugLog');
    const [, setPillbox] = useGlobal('__pillbox');
    const [, setPillboxItem] = useGlobal('__pillboxItem');
    const prevActiveResident = usePrevious(activeResident);

    // Compare the current activeResident with the previous and refresh some global values if they're different
    useEffect(() => {
        if (prevActiveResident !== activeResident) {
            // Trigger the refresh of medicineList, drugLogList, PillboxList, and PillboxItemList
            const clientId = activeResident?.Id || null;
            if (clientId) {
                mm.loadMedicineList(clientId).then(ml => setMedicineList(ml));
                setDrugLog({action: "load", payload: clientId});
                setPillbox({action: "load", payload: clientId});
                setPillboxItem({action: "load", payload: clientId});
            }
        }
    }, [activeResident, prevActiveResident, setDrugLog, mm, setMedicineList, setPillbox, setPillboxItem])
}

export default ActiveResidentObserver;
