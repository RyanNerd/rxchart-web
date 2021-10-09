import {Authenticated, IAuthenticationProvider} from "providers/AuthenticationProvider";
import {asyncWrapper} from "utility/common";

export interface IAuthManager {
    authenticate: (username: string, password: string) => Promise<Authenticated>
}

/**
 * Authorization Manager
 * @param {AuthManager} authenticationProvider
 */
const AuthManager = (authenticationProvider: IAuthenticationProvider): IAuthManager => {
    /**
     * Authentication API call
     * @param {string} username
     * @param {string} password
     * @return Promise<Authenticated | void>
     */
    const _authenticate = async (username: string, password: string) => {
        const [e, r] = await asyncWrapper(authenticationProvider.post({username, password}));
        if (e) throw e; else return r;
    }

    return {
        // @ts-ignore
        authenticate: async (username: string, password: string) => {
            return await _authenticate(username, password);
        }
    }
}

export default AuthManager;
