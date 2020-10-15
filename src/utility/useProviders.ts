import {useEffect, useGlobal, useState} from 'reactn';
import {ProviderTypes} from '../types/ProviderTypes';

export const useProviders = (): ProviderTypes.Providers => {
    const [restProviders] = useGlobal('providers');
    const [providers, setProviders] = useState(restProviders);
    useEffect(() => {
        const providers = {
            residentProvider: restProviders.residentProvider,
            medicineProvider: restProviders.medicineProvider,
            medHistoryProvider: restProviders.medHistoryProvider,
        };
        setProviders(providers);
    }, [restProviders]);
    return providers;
};
