import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Token missing' });
    }

    try {
        const decodedToken = jwt.verify(token, 'my-secret-key');
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token invalid' });
    }
};