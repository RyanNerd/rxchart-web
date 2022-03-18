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

    public setErrorDetails(details: unknown) {
        this.details = details;
    }

    public getErrorDetails() {
        return this.details;
    }
}
