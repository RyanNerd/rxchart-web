import {useEffect, useGlobal} from "reactn";
import usePrevious from "../hooks/usePrevious";

/**
 * Watch for changes to the global activeResident
 * when populated it triggers a refresh of the medicineList global
 */
const ActiveResidentObserver = () => {
    const [activeResident] = useGlobal('activeResident');
    const [mm] = useGlobal('medicineManager');
    const [, setMedicineList] = useGlobal('medicineList');
    const [, setDrugLogList] = useGlobal('drugLogList');
    const [, setPillboxList] = useGlobal('pillboxList');
    const [, setPillboxItemList] = useGlobal('pillboxItemList');
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const prevActiveResident = usePrevious(activeResident);

    // Compare the current activeResident with the previous and refresh some global values if they're different
    useEffect(() => {
        /**
         * Asynchronously load all the lists for the activeResident (client)
         * @param {number} clientId
         * @return {null|any} Returns an error variable from catch if there were any errors, otherwise null is returned
         */
        const refreshDrugs = async (clientId: number) => {
            try {
                const ml = await mm.loadMedicineList(clientId);
                await setMedicineList(ml);
                const dl = await mm.loadDrugLog(clientId, 5);
                await setDrugLogList(dl);
                const pbl = await mm.loadPillboxList(clientId);
                await setPillboxList(pbl);
                const pbItemList = await mm.loadPillboxItemList(clientId);
                await setPillboxItemList(pbItemList);
            } catch (e) {
                await setErrorDetails(e);
            }
        }

        if (prevActiveResident !== activeResident) {
            const clientId = activeResident?.Id || null;
            // If we have a new client then refresh all the lists.
            if (clientId) {
                refreshDrugs(clientId);
            }
        }
    }, [
        activeResident,
        prevActiveResident,
        mm,
        setMedicineList,
        setDrugLogList,
        setPillboxList,
        setPillboxItemList,
        setErrorDetails
    ])
}

export default ActiveResidentObserver;
