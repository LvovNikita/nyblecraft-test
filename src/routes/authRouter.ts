import { Router } from 'express'
import passport from 'passport'

import { SuccessResponseJSON } from '../utils/ResponseJSON'

const authRouter = Router()

authRouter.post(
    '/login',
    (req, res, next) => {
        next()
    },
    passport.authenticate('local'),
    (req, res, next) => {
        console.log(req.session)
        console.log(req.session.id)
        console.log(req.session.cookie)
        res.json(new SuccessResponseJSON(true))
    }
)

authRouter.post('/logout', (req, res, next) => {
    req.logOut(err => {
        if (err) return next(err)
        return res.json(new SuccessResponseJSON(true))
    })
})

export default authRouter
