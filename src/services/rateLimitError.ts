export class RateLimitError extends Error {
    constructor(public readonly retryAfterSeconds: number) {
        super("Příliš mnoho požadavků. Zkuste to znovu za " + retryAfterSeconds + " sekund.");
        this.name = 'RateLimitError';
    }
}