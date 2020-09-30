import {useGlobal, useEffect, useState} from 'reactn'
import {ProvidersType} from "../types/FrakTypes";

export const useProviders = (): ProvidersType => {
    const [ restProviders ] = useGlobal('providers');
    const [ providers, setProviders ] = useState(restProviders);
    useEffect(() => {
        const providers = {
            residentProvider: restProviders.residentProvider,
            medicineProvider: restProviders.medicineProvider,
            medHistoryProvider: restProviders.medHistoryProvider
        };
        setProviders(providers);
    }, [restProviders])
    return providers;
}