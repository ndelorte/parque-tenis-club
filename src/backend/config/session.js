import session from 'express-session';

export const sessionMiddleware = session({
    name: "ptc-admin-session",  
    secret: process.env.SESSION_SECRET || "parque-tenis-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure : false,
        maxAge: 1000 * 60 * 60 * 2, // 2 horas
    },
}); 