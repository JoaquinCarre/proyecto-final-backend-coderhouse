import jwt from "jsonwebtoken";

export function verifyToken(req, _, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        const customError = new Error('No se tiene acceso sin loguearse');
        next(customError);
    }
    jwt.verify(token, 'my-secret-key', (err, decoded) => {
        if (err) {
            const customError = new Error('No se tiene acceso sin loguearse');
            next(customError);
        }
        req.user = decoded;
        next();
    });
}