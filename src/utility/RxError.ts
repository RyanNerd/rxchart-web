// noinspection JSUnusedGlobalSymbols

/**
 * Custom Error
 * @link https://stackoverflow.com/a/41102182/4323201
 */
export class RxError extends Error {
    private details: unknown;
    constructor(message: string) {
        super(message);
        this.name = 'RxError';
    }

    setErrorDetails(theDetails: unknown) {
        this.details = theDetails;
    }

    getErrorDetails() {
        return this.details;
    }
}
