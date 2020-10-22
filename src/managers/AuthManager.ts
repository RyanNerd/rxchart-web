import {Authenticated, IAuthenticationProvider} from "../providers/AuthenticationProvider";

export interface IAuthManager {
    authenticate: (username: string, password: string) => Promise<Authenticated>
}

const AuthManager = (authenticationProvider: IAuthenticationProvider): IAuthManager => {
    const _authenticate = async (username: string, password: string) => {
        return authenticationProvider.post({username, password})
            .then((response) => {
                return response;
            })
            .catch((err) => {throw err})
    }

    return {
        authenticate: async (username: string, password: string) => {
            return await _authenticate(username, password);
        }
    }
}

export default AuthManager;
