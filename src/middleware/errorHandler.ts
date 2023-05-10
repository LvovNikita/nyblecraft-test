import { Request, Response, NextFunction } from 'express'
import { ErrorResponseJSON } from '../utils/ResponseJSON'

export default async (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    return res
        .status(500)
        .json(new ErrorResponseJSON(500, 'Internal Server Error'))
}
