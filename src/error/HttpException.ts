class HttpException extends Error {
    public status: number;
    constructor(message: string, status?: number) {
        super(message);
        this.status = status || 500;
    }
}

export default HttpException;
