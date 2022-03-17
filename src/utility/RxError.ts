// noinspection JSUnusedGlobalSymbols

/**
 * Custom Error
 * @link https://stackoverflow.com/a/41102182/4323201
 */
export class RxError extends Error {
    private details: unknown;
    private errorType: 'request' | 'standard'; // TODO: DiagnosticPage should use this to format display

    constructor(message: string) {
        super(message);
        this.name = 'RxError';
        this.errorType = 'standard';
    }

    setErrorDetails(details: unknown) {
        this.details = details;
        // TODO: Move Duck 🦆 typing to figure out what type the error is to this function
        if (details instanceof Request) {
            this.errorType = 'request';
        }
    }

    getErrorDetails() {
        return this.details;
    }
}
