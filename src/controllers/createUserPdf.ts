import { join } from 'node:path'

import { Request, Response, NextFunction } from 'express'
import PDF from 'pdfkit'

import db from '../config/db'
import { SuccessResponseJSON, ErrorResponseJSON } from '../utils/ResponseJSON'
import { imagesFolderPath } from '../config/static'

export default async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body

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

    if (!user) {
        return res
            .status(400)
            .json(new ErrorResponseJSON(400, 'User with this email doesn\'t exist'))
    }

    const pdfFile = new PDF()

    pdfFile
        .fontSize(24)
        .text(user.firstName + ' ' + user.lastName)
        .image(join(imagesFolderPath, user.image), { width: 200 })

    pdfFile.end()

    const buffers: Array<Buffer> = []

    pdfFile.on('data', chunk => {
        buffers.push(chunk)
    })

    pdfFile.on('end', async () => {
        await db.user.update({
            where: {
                email
            },
            data: {
                pdf: Buffer.concat(buffers)
            }
        })
    })

    return res
        .status(200)
        .json(new SuccessResponseJSON(true))
}
