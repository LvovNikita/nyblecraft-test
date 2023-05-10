import { Request, Response, NextFunction } from 'express'

import db from '../config/db'
import { SuccessResponseJSON, ErrorResponseJSON } from '../utils/ResponseJSON'

export default async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params

    try {
        await db.user.delete({
            where: {
                email
            }
        })
    } catch (err) {
        return res
            .status(404)
            .json(new ErrorResponseJSON(400, 'User with this email doesn\'t exist'))
    }

    return res
        .status(200)
        .json(new SuccessResponseJSON(true))
}
