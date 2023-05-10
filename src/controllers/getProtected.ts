import { Request, Response, NextFunction } from 'express'

import { SuccessResponseJSON } from '../utils/ResponseJSON'

export default async (req: Request, res: Response, next: NextFunction) => {
    return res
        .status(200)
        .json(new SuccessResponseJSON(true))
}
