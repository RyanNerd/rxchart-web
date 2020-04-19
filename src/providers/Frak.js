const JSON_CONTENT_TYPE = 'application/json';
const DEFAULT_REQUEST_CONTENT_TYPE =
    {
        GET: null, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET
        POST: JSON_CONTENT_TYPE, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST
        PUT:  JSON_CONTENT_TYPE, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT
        PATCH: JSON_CONTENT_TYPE, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH
        DELETE: null, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE (https://tools.ietf.org/html/rfc7231#section-4.3.5)
        HEAD: null, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD
        OPTIONS: null, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS
        CONNECT: null, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT
        TRACE: null // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE
    };

/**
 * Frak is wrapper around the fetch API that specifically handles JSON requests and responses.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch -- init section
 * @param {object} options The init object that will be passed into the fetch() API call
 * @returns {{}}
 * @constructor
 */
const Frak = (options= null) => {
    // The public API object returned to the user.
    const API = {};

    // Basically a global for the init options when then fetch is made.
    const finalOptions = {} ;

    /**
     * Call to the actual fetch() function as an asynchronous call.
     *
     * @protected
     * @param {string} url The endpoint address
     * @returns {Promise<Response>}
     */
    const callFetch = (url) =>  {
        /**
         * Async call to the Fetch API
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
         *
         * @param {string} url Endpoint
         * @returns {Promise.<Response>}
         */
        async function doFetch(url)
        {
            // Asynchronously call fetch() via the await construct.
            try {
                let response = await fetch(url, finalOptions);

                // Is the response content JSON? Yes, then return the resolved JSON value.
                if (typeof response.headers !== 'undefined') {
                    let contentType = response.headers.get('Content-Type');

                    // In case the contentType has a backslash we convert it to forward slash
                    contentType = contentType.replace(/\\/, "/");

                    // If the response content type is JSON then implement the JSON parser on the body
                    if (contentType && contentType === JSON_CONTENT_TYPE) {
                        return response.json();
                    }
                }

                // All successful non-JSON response content resolves as a standard fetch response.
                return response;
            } catch (e) {
                return e;
            }
        }

        // Do the fetch which in turn returns a Promise<Response>.
        return doFetch(url);
    }

    /**
     *
     * @param {string} method
     * @param {string || Blob || BufferSource || FormData || URLSearchParams || ReadableStream || null} body
     */
    const initRequest = (method, body= null) => {
        // Method must be one of the specified HTTP verbs per the HTTP spec
        // @see: https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html
        console.assert(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS', 'CONNECT', 'TRACE'].includes(method), 'Invalid method: ' + method);

        // Set the method
        finalOptions.method = method;

        // Is the headers property in the finalOptions object?
        if ('headers' in finalOptions) {
            // Is the headers property NOT an instance of Headers?
            if (!(finalOptions.headers instanceof Headers)) {
                finalOptions.headers = new Headers(finalOptions.headers);
            } else {
                finalOptions.headers = new Headers();
            }
        } else {
            finalOptions.headers = new Headers();
        }

        // Set the Content-Type header if we're sending JSON otherwise destroy any existing Content-Type header
        let contentType = DEFAULT_REQUEST_CONTENT_TYPE[method];
        if (contentType !== null) {
            finalOptions.headers.append('Content-Type', contentType);
        } else {
            finalOptions.headers.delete('Content-Type');
        }

        // If a body is provided then set it.
        if (body) {
            finalOptions.body = (typeof body) === 'object' ? JSON.stringify(body) : body;
        } else {
            delete finalOptions.body;
        }
    }

    /**
     * Set the finalOptions
     * @param options
     */
    API.setOptions = (options) => {
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                if (key === 'method') {
                    throw new Error('The "method" property should not be present in the options argument.');
                }

                if (key === 'body') {
                    throw new Error('The "body" property should not be present in the options argument.');
                }

                if (key === 'headers') {
                    if (typeof finalOptions.headers !== 'object') {
                        throw new Error('The "headers" property must be an object.');
                    }
                }
                finalOptions[key] = options[key];
            }
        }
    }

    /**
     * Return the current options (finalOptions)
     * @returns {{}}
     */
    API.getOptions = () => {
        return finalOptions;
    }

    API.get = (url) => {
        initRequest('GET');
        return callFetch(url);
    }

    API.post = (url, body) => {
        initRequest('POST', body);
        return callFetch(url);
    }

    API.put = (url, body) => {
        initRequest('PUT', body);
        return callFetch(url);
    }

    API.patch = (url, body) => {
        initRequest('PATCH', body);
        return callFetch(url);
    }

    API.delete = (url) => {
        initRequest('DELETE');
        return callFetch(url);
    }

    API.head = (url) => {
        initRequest('head');
        return callFetch(url);
    }

    API.options = (url) => {
        initRequest('options');
        return callFetch(url);
    }

    API.connect = (url) => {
        initRequest('connect');
        return callFetch(url);
    }

    API.trace = (url) => {
        initRequest('trace');
        return callFetch(url);
    }

    // Set the options if they were passed in
    if (options) {
        API.setOptions(options);
    }

    // Expose the public API functions
    return API;
}

export default Frak;
