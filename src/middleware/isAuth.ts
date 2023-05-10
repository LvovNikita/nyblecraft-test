import { Request, Response, NextFunction } from 'express'

import { ErrorResponseJSON } from '../utils/ResponseJSON'

export default async (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next()
    }
    return res
        .status(401)
        .json(new ErrorResponseJSON(401, 'Unauthorized'))
}
