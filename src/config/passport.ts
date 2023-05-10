import passport, { DoneCallback } from 'passport'
import { IStrategyOptions, Strategy, VerifyFunction } from 'passport-local'
import bcrypt from 'bcrypt'

import db from './db'

passport.serializeUser((user: any, done) => {
    done(null, user.email)
})

passport.deserializeUser(async (email: string, done: DoneCallback) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        })
        done(null, user)
    } catch (err) {
        done(err, false)
    }
})

const options: IStrategyOptions = {
    usernameField: 'email'
}

const verifyCb: VerifyFunction = async function (email, password, done) {
    let user: any = null

    try {
        user = await db.user.findUnique({
            where: {
                email
            }
        })
    } catch (err) {
        return done(err, false)
    }

    if (!user) {
        return done(null, false)
    }

    // user.password is a hash
    bcrypt.compare(password, user.password, (err: any, result: boolean) => {
        if (err) {
            return done(err, false)
        }
        if (!result) {
            return done(null, user)
        }
        return done(null, user)
    })
}

passport.use(new Strategy(options, verifyCb))
