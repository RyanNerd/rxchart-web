import {IMedicineManager} from "../managers/MedicineManager";
import {useEffect, useGlobal} from "reactn";

const RefreshOtcObserver = (mm: IMedicineManager) => {
    const [, setErrorDetails] = useGlobal('errorDetails');
    const [, setOtcList] = useGlobal('otcList');
    const [refreshOtc, setRefreshOtc] = useGlobal('refreshOtc');

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
