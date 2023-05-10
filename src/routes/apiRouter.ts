import { Router } from 'express'
import { body, param } from 'express-validator'

import { imageUpload } from '../config/static'
import getUser from '../controllers/getUser'
import postUser from '../controllers/postUser'
import deleteUser from '../controllers/deleteUser'
import getUsers from '../controllers/getUsers'
import updateUser from '../controllers/updateUser'
import createUserPdf from '../controllers/createUserPdf'
import isAuth from '../middleware/isAuth'
import getProtected from '../controllers/getProtected'

const apiRouter = Router()

apiRouter.get('/protected', isAuth, getProtected)

apiRouter.get('/users', getUsers)

apiRouter.post(
    '/user',
    // TODO: custom validator for 'image'
    imageUpload.single('image'),
    body('password').notEmpty(),
    body('email').isEmail(),
    postUser
)

apiRouter
    .route('/user/:email')
    .get(getUser)
    .put(
        // TODO: custom validator
        imageUpload.single('image'),
        param('email').isEmail(),
        updateUser
    )
    .delete(deleteUser)

apiRouter.post(
    '/user/createPdf',
    body('email').isEmail(),
    createUserPdf
)

export default apiRouter
