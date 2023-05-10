class ResponseJSON {
    data: any
    error: null | { code: number, message: string }

    constructor () {
        this.data = null
        this.error = null
    }
}

export class SuccessResponseJSON extends ResponseJSON {
    constructor (public data: any) {
        super()
        this.data = data
        this.error = null
    }
}

export class ErrorResponseJSON extends ResponseJSON {
    constructor (errorCode: number, errorMessage: string) {
        super()
        this.error = {
            code: errorCode,
            message: errorMessage
        }
        this.data = null
    }
}
