import multer from 'multer'

import { join, extname } from 'node:path'

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, join(staticFolderPath, '/imgs'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + Math.round(Math.random() * 1e9) + extname(file.originalname))
    }
})

export const staticFolderPath = join(__dirname, '..', 'static')
export const imagesFolderPath = join(staticFolderPath, 'imgs')

export const imageUpload = multer({ storage: imageStorage })
