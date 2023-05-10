import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

import db from '../config/db'
import { SuccessResponseJSON, ErrorResponseJSON } from '../utils/ResponseJSON'

export default async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params

    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
        return res
            .status(400)
            .json(new ErrorResponseJSON(400, 'Pleae provide correct email address'))
    }

    let user = null

    const data = { ...req.body }

    delete data.password // FIXME:

    if (req.file) {
        const { filename } = req.file !
        Object.assign(data, {
            image: filename
        })
    }

    try {
        user = await db.user.update({
            where: {
                email
            },
            data
        })
    } catch (err) {
        return res
            .status(404)
            .json(new ErrorResponseJSON(400, 'User with this email doesn\'t exist'))
    }

    return res
        .status(200)
        .json(new SuccessResponseJSON(user))
}
