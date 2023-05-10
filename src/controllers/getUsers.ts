import { join } from 'node:path'

import { Request, Response, NextFunction } from 'express'

import db from '../config/db'
import { SuccessResponseJSON } from '../utils/ResponseJSON'
import { imagesFolderPath } from '../config/static'

export default async (req: Request, res: Response, next: NextFunction) => {
    let users = []

    try {
        users = await db.user.findMany({
            take: 10
        })
    } catch (err) {
        return next(err)
    }

    users.forEach(user => {
        user.image = join(imagesFolderPath, user.image)
    })

    return res
        .status(200)
        .json(new SuccessResponseJSON(users))
}
