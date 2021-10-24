import {Authenticated, IAuthenticationProvider} from 'providers/AuthenticationProvider';
import {asyncWrapper} from 'utility/common';

export interface IAuthManager {
    authenticate: (username: string, password: string) => Promise<Authenticated>;
}

/**
 * Authorization Manager
 * @param {AuthManager} authenticationProvider The Authentication provider "class" object
 */
const AuthManager = (authenticationProvider: IAuthenticationProvider): IAuthManager => {
    /**
     * Authentication API call
     * @param {string} username The username to authenticate
     * @param {string} password The password to authenticate
     * @returns Promise<Authenticated | void>
     */
    const _authenticate = async (username: string, password: string) => {
        const [e, r] = (await asyncWrapper(authenticationProvider.post({username, password}))) as [
            unknown,
            Promise<Authenticated>
        ];
        if (e) throw e;
        else return r;
    };

    return {
        authenticate: async (username: string, password: string) => {
            return await _authenticate(username, password);
        }
    };
};

export default AuthManager;
