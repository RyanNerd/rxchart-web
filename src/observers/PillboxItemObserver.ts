import {useEffect, useGlobal} from "reactn";

import {IMedicineManager} from "../managers/MedicineManager";
import {PillboxItemRecord, ResidentRecord} from "../types/RecordTypes";

/**
 * Watch the __pillboxItem global
 * when set take the action specified: load, update, or delete
 */
const PillboxItemObserver = (mm: IMedicineManager, activeClient: ResidentRecord | null) => {
    const [, setPillboxItemList] = useGlobal('pillboxItemList');
    const [, setErrorDetails] = useGlobal('__errorDetails');
    const [pillboxItemObserver, setPillboxItemObserver] = useGlobal('__pillboxItem');

    useEffect(() => {
        if (pillboxItemObserver) {
            if (activeClient) {
                if (activeClient.Id) {
                    const clientId = activeClient.Id;
                    const action = pillboxItemObserver.action;
                    const payload = pillboxItemObserver.payload;
                    switch (action) {
                        case "load": {
                            if (Array.isArray(payload)) {
                                setPillboxItemList(payload);
                                if (pillboxItemObserver.cb) {
                                    pillboxItemObserver.cb(payload);
                                }
                                setPillboxItemObserver(null);
                            } else {
                                mm.loadPillboxItem(clientId)
                                .then((pillboxItems) => {
                                    setPillboxItemList(pillboxItems);
                                    if (pillboxItemObserver.cb) {
                                        pillboxItemObserver.cb(pillboxItems);
                                    }
                                })
                                .catch((err) => setErrorDetails(err))
                                .finally(() => setPillboxItemObserver(null));
                            }
                            break;
                        }

                        case "update": {
                            const pillboxItemRecord = pillboxItemObserver.payload;
                            if (pillboxItemRecord) {
                                mm.updatePillboxItem(pillboxItemRecord as PillboxItemRecord)
                                    .then((pillboxItem) => {
                                        return setPillboxItemObserver({action: 'load', payload: pillboxItem})
                                    })
                                    .catch((err) => setErrorDetails(err))
                                    .finally(() => setPillboxItemObserver(null));
                            }
                            break;
                        }

                        case "delete": {
                            const pillboxItemId = pillboxItemObserver.payload as number;
                            mm.deletePillboxItem(pillboxItemId)
                                .then((deleted) => {
                                    if (deleted) return setPillboxItemObserver({action: 'load', payload: clientId});
                                    else {
                                        return setErrorDetails(
                                            new Error('unable to delete PillboxItem record. Id: ' + pillboxItemId));
                                    }
                                })
                                .catch((err) => setErrorDetails(err))
                                .finally(() => setPillboxItemObserver(null));
                            break;
                        }
                    }
                }
            }
        }
    }, [activeClient, pillboxItemObserver, mm, setPillboxItemObserver, setPillboxItemList, setErrorDetails]);
}

export default PillboxItemObserver;
