import {useEffect, useGlobal, useRef} from "reactn";
import {ResidentRecord} from "../types/RecordTypes";

const ActiveResidentObserver = (activeResident: ResidentRecord | null) => {
    const [, setRefreshMedicine] = useGlobal('refreshMedicine');
    let prevActiveResident = useRef(activeResident).current;

    useEffect(() => {
        if (prevActiveResident !== activeResident) {
            // Trigger the refresh of medicineList and drugLogList
            const clientId = activeResident && activeResident.Id ? activeResident.Id : null;
            setRefreshMedicine(clientId);
        }
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            prevActiveResident = activeResident;
        }
    }, [activeResident]);
}

export default ActiveResidentObserver;
