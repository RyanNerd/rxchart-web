import {useEffect, useRef} from 'reactn';

/**
 * Hook for comparing previous values
 * @link https://stackoverflow.com/a/57706747/4323201
 * @param {any} value The value to compare against the previous state
 */
const usePrevious = <T>(value: T): T | undefined => {
    const reference = useRef<T>();
    useEffect(() => {
        reference.current = value;
    });
    return reference.current;
};

export default usePrevious;
