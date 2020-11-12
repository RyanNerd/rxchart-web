import {useEffect, useGlobal} from "reactn";
import {IMedicineManager} from "../managers/MedicineManager";

const RefreshOtcObserver = (mm: IMedicineManager) => {
    const [refreshOtc, setRefreshOtc] = useGlobal('refreshOtc');
    const [, setOtcList] = useGlobal('otcList');
    const [, setErrorDetails] = useGlobal('errorDetails');

    /**
     * Set to true when the the otcList needs to be rehydrated.
     * @var refreshOtc {boolean}
     */
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
