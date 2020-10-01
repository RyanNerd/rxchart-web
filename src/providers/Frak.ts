type HTTPMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'CONNECT' | 'TRACE';

interface IDefaultRequestContent {
    [key: string]: string | null
}

const JSON_CONTENT_TYPE = 'application/json';
const DEFAULT_REQUEST_CONTENT_TYPE = {
    GET: null,                  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET
    POST: JSON_CONTENT_TYPE,    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST
    PUT:  JSON_CONTENT_TYPE,    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT
    PATCH: JSON_CONTENT_TYPE,   // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH
    DELETE: null,               // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE (https://tools.ietf.org/html/rfc7231#section-4.3.5)
    HEAD: null,                 // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD
    OPTIONS: null,              // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS
    CONNECT: null,              // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT
    TRACE: null,                // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE
} as IDefaultRequestContent;

/**
 * Frak
 * A simple implementation of the Fetch API specifically for JSON based Web Service requests and responses
 */
const Frak = {
    get: async (uri: string, request: RequestInit = {}): Promise<any> => {
        const options = Frak._prepRequest('GET', request);
        return await Frak._http(new Request(uri, options));
    },

    post: async (uri: string, body: any, request: RequestInit = {body: JSON.stringify(body) }): Promise<any> => {
        const options = Frak._prepRequest('POST', request);
        return await Frak._http(new Request(uri, options));
    },

    patch: async (uri: string, body: any, request: RequestInit = {body: JSON.stringify(body) }): Promise<any> => {
        const options = Frak._prepRequest('PATCH', request);
        return await Frak._http(new Request(uri, options));
    },

    put: async (uri: string, body: any, request: RequestInit = {body: JSON.stringify(body) }): Promise<any> => {
        const options = Frak._prepRequest('PUT', request);
        return await Frak._http(new Request(uri, options));
    },

    delete: async (uri: string, request: RequestInit = {}): Promise<any> => {
        const options = Frak._prepRequest('DELETE', request);
        return await Frak._http(new Request(uri, options));
    },

    options: async (uri: string, request: RequestInit = {}): Promise<any> => {
        const options = Frak._prepRequest('OPTIONS', request);
        return await Frak._http(new Request(uri, options));
    },

    head: async (uri: string, request: RequestInit = {}): Promise<any> => {
        const options = Frak._prepRequest('HEAD', request);
        return await Frak._http(new Request(uri, options));
    },

    connect: async (uri: string, request: RequestInit = {}): Promise<any> => {
        const options = Frak._prepRequest('CONNECT', request);
        return await Frak._http(new Request(uri, options));
    },

    trace: async (uri: string, request: RequestInit = {}): Promise<any> => {
        const options = Frak._prepRequest('TRACE', request);
        return await Frak._http(new Request(uri, options));
    },

    /**
     * Initialize the Request options object
     *
     * @private
     * @param {HTTPMethods} method
     * @param {RequestInfo} request
     */
    _prepRequest: (method: HTTPMethods, request: RequestInit) => {
        const options = {...request};

        // Override RequestInit properties as needed.
        options.mode = 'cors';
        options.method = method;

        // Add Headers based on request method type
        if (!options.headers || options.headers ! instanceof Headers) {
            options.headers = new Headers();
        }
        let contentType = DEFAULT_REQUEST_CONTENT_TYPE[method];
        if (contentType !== null) {
            if (options.headers instanceof Headers) {
                options.headers.append('Content-Type', contentType);
            }
        }
        return options;
    },

    /**
     * Async call to perform the fetch given the request
     *
     * @private
     * @param {Request} request
     */
    _http: async (request: Request): Promise<any> => {
        const response = await fetch(request);

        try {
            if (typeof response.headers !== 'undefined') {
                // Get the Content-Type of the response
                let contentType = response.headers.get('Content-Type');

                // In case the contentType has a backslash we convert it to forward slash
                contentType = contentType?.replace(/\\/, "/") || null;

                // If the content type is JSON then return the parsed JSON
                if (contentType && contentType === JSON_CONTENT_TYPE) {
                    return response.json();
                }
            }
        } catch (err) {
            throw err;
        }

        // Return the unparsed response
        return response;
    }
}

export default Frak;