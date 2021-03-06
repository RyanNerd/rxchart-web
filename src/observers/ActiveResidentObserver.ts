import {useEffect, useGlobal, useRef} from "reactn";
import {ResidentRecord} from "../types/RecordTypes";

/**
 * Watch for changes to the global activeResident
 * when populated it triggers a refresh of the medicineList global
 * @param {ResidentRecord|null} activeResident
 * @constructor
 */
const ActiveResidentObserver = (activeResident: ResidentRecord | null) => {
    const [, setMedicine] = useGlobal('medicine');
    const [, setDrugLog] = useGlobal('drugLog');
    let prevActiveResident = useRef(activeResident).current;

    useEffect(() => {
        if (prevActiveResident !== activeResident) {
            // Trigger the refresh of medicineList
            const clientId = activeResident && activeResident.Id ? activeResident.Id : null;
            setMedicine({action: "load", payload: clientId});
            setDrugLog({action: "load", payload: clientId});
        }
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            prevActiveResident = activeResident;
        }
    }, [activeResident]);
}

export default ActiveResidentObserver;
