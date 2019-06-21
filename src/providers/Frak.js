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

/*
    eslint-disable
*/

/**
 * Frak Class
 * A simple implementation of the Fetch API specifically for JSON based Web Service requests and responses
 * See the README for installation and use.
 *
 * @todo Make this TypeScript based and extract it back to the NPM module
 * @license MIT License (c) copyright 2019
 */
export default class Frak
{
    /**
     * @protected
     *
     * Default behavior for failed requests
     * @property {boolean} _throwErrorOnFailedStatus
     *
     * Output details to console.
     * @property {boolean} _verbose
     */

    /**
     * Constructor
     *
     * @param {boolean} [throwErrorOnFailedStatus] Set this to true for behavior similar to Jquery's `Ajax.$()`
     * @param {boolean} [verbose] When true errors and warning will be emited to the console
     */
    constructor(throwErrorOnFailedStatus = false, verbose = false)
    {
        this._throwErrorOnFailedStatus = throwErrorOnFailedStatus;
        this._verbose = verbose;

        // Prevent default configuration from being changed.
        Object.freeze(this._throwErrorOnFailedStatus);
        Object.freeze(this._verbose);
    }

    /**
     * GET web method for the given url
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET
     * @see @see https://developer.mozilla.org/en-US/docs/Web/API/Request
     * @public
     * @param {string} url The endpoint for the GET request
     * @param {object} [request] Request object that overrides the defaults
     * @param {boolean} [resolveJsonResponse] Response should resolve to JSON
     * @returns {Promise<Response>}
     */
    get(url, request, resolveJsonResponse = true)
    {
        return this._call(url, this._initializeRequest('GET', request), resolveJsonResponse);
    }

    /**
     * POST web method for the given url and body
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST
     * @public
     * @param {string} url The URL endpoint
     * @param {object | string} body The body of the request
     * @param {object} [request] Request object that overrides the defaults
     * @param {boolean} [resolveJsonResponse] Response should resolve to JSON
     * @returns {Promise<Response>}
     */
    post(url, body, request, resolveJsonResponse = true)
    {
        return this._call(url, this._initializeRequest('POST', request, body), resolveJsonResponse);
    }

    /**
     * PATCH web method for the given url and body
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH
     * @public
     * @param {string} url - Endpoint for the request
     * @param {object | string} body - The body of the PATCH request
     * @param {object} [request] Request object that overrides the defaults
     * @param {boolean} [resolveJsonResponse] Response should resolve to JSON
     * @returns {Promise<Response>}
     */
    patch(url, body, request, resolveJsonResponse = true)
    {
        return this._call(url, this._initializeRequest('PATCH', request, body), resolveJsonResponse);
    }

    /**
     * PUT web method for the given url and body
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT
     * @public
     * @param {string} url - Endpoint for the PUT method
     * @param {object | string} body -The body of the PUT request
     * @param {object} [request] Request object that overrides the defaults
     * @param {boolean} [resolveJsonResponse] Response should resolve to JSON
     * @returns {Promise<Response>}
     */
    put(url, body, request, resolveJsonResponse = true)
    {
        return this._call(url, this._initializeRequest('PUT', request, body), resolveJsonResponse);
    }

    /**
     * DELETE web method for the given url
     *
     * @description Make note of the trailing UNDERSCORE -- delete_() needed because "delete" is a JS keyword.
     * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE
     * @public
     * @param {string} url - Endpoint for the DELETE request
     * @param {object} [request] Request object that overrides the defaults
     * @param {boolean} [resolveJsonResponse] Response should resolve to JSON
     * @returns {Promise<Response>}
     */
    delete_(url, request, resolveJsonResponse = true)
    {
        return this._call(url, this._initializeRequest('DELETE', request), resolveJsonResponse);
    }

    /**
     * HEAD web method for the given url
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD
     * @public
     * @param {string} url Endpoint for the HEAD request.
     * @param {object} [request] Request object that overrides the defaults
     * @returns {Promise<Response>}
     */
    head(url, request)
    {
        return this._call(url, this._initializeRequest('HEAD', request), false);
    }

    /**
     * OPTIONS web method for the given url
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS
     * @public
     * @param {string} url Endpoint for the OPTIONS request.
     * @param {object} [request] Request object that overrides the defaults
     * @param {boolean} [resolveJsonResponse] Response should resolve to JSON
     * @returns {Promise<Response>}
     */
    options(url, request, resolveJsonResponse = true)
    {
        return this._call(url, this._initializeRequest('OPTIONS', request), resolveJsonResponse);
    }

    /**
     * CONNECT web method for the given url and optional body.
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT
     * @public
     * @param {string} url Endpoint for the CONNECT method.
     * @param {string | undefined} body - Body to include with the CONNECT request if any.
     * @param {object} [request] Request object that overrides the defaults
     * @returns {Promise<Response>}
     */
    connect(url, body, request)
    {
        return this._call(url, this._initializeRequest('CONNECT', request), false);
    }

    /**
     * TRACE web method for the given url
     *
     * Note: Included only for completeness. There are potential security exploits with this web method and its
     * general use is discouraged.
     *
     * @link https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html
     * @public
     * @param {string} url Endpoint for the TRACE request.
     * @param {object} [request] Request object that overrides the defaults
     * @returns {Promise<Response>}
     */
    trace(url, request)
    {
        return this._call(url, this._initializeRequest('TRACE', request), false);
    }

    /**
     * Called prior to the fetch to validate the request object and apply defaults per http method (such as headers).
     *
     * @protected
     * @param {string} method The web method to invoke
     * @param {object} [request] Request object
     * @param {string | object} [body] The body of the request (if any)
     * @returns {object} Request object
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Request
     */
    _initializeRequest(method, request, body)
    {
        // Method must be one of the specified HTTP verbs per the HTTP spec
        // @see: https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html
        console.assert(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS', 'CONNECT', 'TRACE'].includes(method), 'Invalid method: ' + method);

        const headers = new Headers();

        if (!request) {
            request = {headers: headers, mode: 'cors'};
        }

        if (typeof request.headers !== Headers) {
            request.headers = headers;
        }

        let contentType = DEFAULT_REQUEST_CONTENT_TYPE[method];
        if (contentType !== null) {
            request.headers.append('Content-Type', contentType);
        }

        // If body is present then transform (if needed) and add it as a property to the request.
        if (body) {
            request.body = (typeof body) === 'object' ? JSON.stringify(body) : body;
        }

        // The method cannot be overridden.
        request.method = method;

        return request;
    }

    /**
     * Call to the actual fetch() function as an asynchronous call.
     *
     * @protected
     * @param {string} url The endpoint address
     * @param {object} request Request object that may include the body and headers objects.
     * @param {boolean} [resolveJsonResponse] Response should resolve to JSON
     * @returns {Promise<Response>}
     */
    _call(url, request, resolveJsonResponse = true)
    {
        // We're not using arrow functions so let's keep a reference to this.
        let self = this;

        /**
         * Async call to the Fetch API
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
         *
         * @param {string} url Endpoint
         * @param {object} request Request object
         * @returns {Promise.<Response>}
         */
        async function doFetch(url, request)
        {
            let response;

            // Asynchronously call fetch() via the await construct.
            try {
                response = await fetch(url, request);

                // Should we throw an error when the response is not successful? ($.AJAX behavior)
                if (self._throwErrorOnFailedStatus && !response.ok) {
                    throw new Error(JSON.stringify(response));
                }

                // Should we resolve json if the response.headers Content-Type is JSON? (default is true)
                if (resolveJsonResponse && typeof response.headers !== 'undefined') {
                    // If the response content type is JSON then implement the JSON parser on the body
                    let contentType = response.headers.get('Content-Type');

                    // In case the contentType has a backslash we convert it to forward slash
                    contentType = contentType.replace(/\\/, "/");
                    if (contentType && contentType === JSON_CONTENT_TYPE) {
                        return response.json();
                    }
                }

                // Frak only natively handles JSON responses if set to do so all others will have standard fetch response.
                return response;
            } catch (e) {
                if (self._verbose) {
                    console.error(e);
                }
                throw e;
            }
        }

        // Do the fetch which in turn returns a Promise<Response>.
        return doFetch(url, request);
    }
}
