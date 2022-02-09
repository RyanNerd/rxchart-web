import {useRef, useEffect} from 'react';

interface IUseInterval {
    (callback: () => void, interval: number | null): void;
}

const useInterval: IUseInterval = (callback, interval) => {
    const savedCallback = useRef<(() => void) | null>(null);
    // After every render, save the latest callback into our ref.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            if (savedCallback.current) {
                savedCallback.current();
            }
        };

        if (interval !== null) {
            const id = setInterval(tick, interval);
            return () => clearInterval(id);
        }
    }, [interval]);
};

export default useInterval;
