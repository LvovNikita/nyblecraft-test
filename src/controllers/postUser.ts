import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'

import db from '../config/db'
import { SuccessResponseJSON, ErrorResponseJSON } from '../utils/ResponseJSON'

export default async (req: Request, res: Response, next: NextFunction) => {
    const { email, firstName, lastName, password } = req.body

    const { filename } = req.file !

    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
        return res
            .status(400)
            .json(new ErrorResponseJSON(400, 'Please provide password and correct email address'))
    }

    let user = null

    try {
        user = await db.user.findUnique({
            where: {
                email
            }
        })
    } catch (err) {
        return next(err)
    }

    if (user) {
        return res
            .status(409)
            .json(new ErrorResponseJSON(409, 'User with this email already exists'))
    }

    try {
        const passwordHash = await bcrypt.hash(password, 10)
        user = await db.user
            .create({
                data: {
                    email,
                    password: passwordHash,
                    firstName,
                    image: filename,
                    lastName
                }
            })
    } catch (err) {
        return next(err)
    }

    return res.json(new SuccessResponseJSON(user))
}
