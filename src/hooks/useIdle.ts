import {useEffect, useState} from "reactn";

export enum UserIdleState {
    "active",
    "idle"
}

export enum ScreenIdleState {
    "locked",
    "unlocked"
}

export type TIdleState = {
    userState: UserIdleState | null;
    screenState: ScreenIdleState | null;
    error: null | any
}

/**
 * @fixme permissions are not working / returns an error no matter what. With the less than useful err = {}
 * @link https://web.dev/idle-detection/
 * @param threshold
 * @param signal
 */
const useIdle = (threshold: number, signal?: AbortSignal) => {
    const [idleState, setIdleState] = useState<null| TIdleState>(null);

    // @ts-ignore
    useEffect(() => {
        const initIdleDetector = async () =>
        {
            // @ts-ignore
            const idleDetector = new IdleDetector();
            const idleListener = () => {
                const userState = idleDetector.userState as UserIdleState;
                const screenState = idleDetector.screenState as ScreenIdleState;
                setIdleState({userState, screenState, error: null});
            }

            try {
                idleDetector.addEventListener('change', idleListener);
                await idleDetector.start({
                    threshold
                })
            } catch (err) {
                // const permissionGranted = async () => {
                //     try {
                //         // @ts-ignore Make sure 'idle-detection' permission is granted.
                //         const permissionState = await IdleDetector.requestPermission();
                //         if (permissionState !== 'granted') {
                //             setIdleState({
                //                 userState: null,
                //                 screenState: null,
                //                 error: "permission not granted"
                //             })
                //         }
                //     } catch (err) {
                //         setIdleState({
                //             userState: null,
                //             screenState: null,
                //             error: err
                //         })
                //     }
                // }
                // await permissionGranted();
                setIdleState({userState: null, screenState: null, error: err})
            }

            return () => {
                idleDetector.removeListener('change', idleListener);
            }
        }
        if (idleState === null) {
            initIdleDetector();
        }
    }, [idleState, signal, threshold])
    return idleState;
}

export default useIdle;
