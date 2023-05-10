import session from 'express-session'

export default session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true
    // TODO: prod
    // store:
})
