import Frak from "frak/lib/components/Frak";

export interface IAuthenticationProvider {
    post: (credentials: AuthCredentials) => Promise<Authenticated>
}

type AuthResponse = {
    success: boolean,
    data: {
        apiKey: string,
        organization: string
    } | null
}

type Authenticated = {
    success: boolean,
    apiKey: string,
    organization: string
}

type AuthCredentials = {
    username: string,
    password: string
}

const AuthenticationProvider = (url: string): IAuthenticationProvider => {
    const baseUrl = url;

    return {
        /**
         * Post interface for authentication
         *
         * @param {AuthCredentials} credentials
         * @returns {Promise<Authenticated>}
         */
        post: async (credentials: AuthCredentials): Promise<Authenticated> => {
            const uri = baseUrl + 'authenticate';
            try {
                const response = await Frak.post<AuthResponse>(uri, credentials);
                const success = response.success;
                const data = response.data ? response.data : undefined;
                const apiKey = (success && data?.apiKey) ? data.apiKey : '';
                const organization = (success && data?.organization) ? data.organization : '';
                return {success, organization, apiKey};
            } catch (err) {
                throw err;
            }
        }
    }
}

export default AuthenticationProvider;
