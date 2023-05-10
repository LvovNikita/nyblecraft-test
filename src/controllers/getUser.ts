import { join } from 'node:path'

import { Request, Response, NextFunction } from 'express'

import db from '../config/db'
import { SuccessResponseJSON, ErrorResponseJSON } from '../utils/ResponseJSON'
import { imagesFolderPath } from '../config/static'

export default async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params

    let user = null

    try {
        user = await db.user.findUnique({
            where: { email }
        })
    } catch (err) {
        return next(err)
    }

    if (!user) {
        return res
            .status(400)
            .json(new ErrorResponseJSON(400, 'User with this email doesn\'t exist'))
    }

    user.image = join(imagesFolderPath, user.image)

    return res
        .status(200)
        .json(new SuccessResponseJSON(user))
}
