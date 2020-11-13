import {IMedicineManager} from "../managers/MedicineManager";
import {useEffect, useGlobal} from "reactn";

/**
 * Watch for changes to the refreshOtc global
 * when set to true indicates that the otcList global should be reloaded
 * @param {IMedicineManager} mm
 * @constructor
 */
const RefreshOtcObserver = (mm: IMedicineManager) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setOtcList] = useGlobal('otcList');
    const [refreshOtc, setRefreshOtc] = useGlobal('refreshOtc');

    useEffect(() => {
        if (refreshOtc) {
            mm.loadOtcList()
            .then((otcList) => {
                setOtcList(otcList)
            })
            .then(() => {
                setRefreshOtc(false)
            })
            .catch((err) => {
                setErrorDetails(err)
            })
        }
    }, [mm, refreshOtc, setErrorDetails, setOtcList, setRefreshOtc])
}

export default RefreshOtcObserver;
