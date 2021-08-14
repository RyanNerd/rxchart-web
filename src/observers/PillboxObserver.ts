import {useEffect, useGlobal} from "reactn";

import {IMedicineManager} from "../managers/MedicineManager";
import {PillboxRecord, ResidentRecord} from "../types/RecordTypes";

/**
 * Watch for changes to the __pillbox global
 * when set take the action specified: load, update, or delete
 * @param {IMedicineManager} mm
 * @param {ResidentRecord | null}  activeClient
 */
const PillboxObserver = (mm: IMedicineManager, activeClient: ResidentRecord | null) => {
    const [pillbox, setPillbox] = useGlobal('__pillbox');
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [, setPillboxList] = useGlobal('pillboxList');

    useEffect(() => {
        if (pillbox) {
            const action = pillbox.action;
            switch (action) {
                case "load": {
                    mm.loadPillboxList(pillbox.payload as number)
                        .then((meds) => {
                            return setPillboxList(meds);
                        })
                        .catch((err) => setErrorDetails(err))
                        .finally(() => setPillbox(null))
                    break;
                }

                case "update": {
                    const pillboxRecord = pillbox.payload;
                    if (pillboxRecord) {
                        mm.updatePillbox(pillboxRecord as PillboxRecord)
                            .then((pillboxRecord) => {
                                const clientId = pillboxRecord && pillboxRecord.ResidentId ?
                                    pillboxRecord.ResidentId : null;
                                return setPillbox({action: "load", payload: clientId});
                            })
                            .catch((err) => setErrorDetails(err))
                            .finally(() => setPillbox(null))
                    }
                    break;
                }

                case "delete": {
                    const pillboxId = pillbox.payload as number;
                    mm.deletePillbox(pillboxId)
                        .then((deleted) => {
                            if (deleted) {
                                return setPillbox({action: "load", payload: activeClient?.Id || null});
                            } else {
                                return  setErrorDetails(new Error('Unable to delete Pillbox record Id: ' + pillboxId));
                            }
                        })
                        .catch((err) => setErrorDetails(err))
                        .finally(() => setPillbox(null))
                    break;
                }
            }
        }
    }, [activeClient, pillbox, mm, setPillbox, setErrorDetails, setPillboxList]);
}

export default PillboxObserver;
