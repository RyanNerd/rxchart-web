import { useState, useCallback } from 'react'

/**
 * Hook to force a re-render
 *
 * @see https://stackoverflow.com/a/55862077/4323201
 * @example:
 * const forceUpdate = useForceUpdate();
 * if (...) {
 *   forceUpdate(); // force re-render
 * }
 */
export const useForceUpdate = (): Function => {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
        setTick(tick => tick + 1);
    }, [])
    return update;
}
