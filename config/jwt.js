import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        const customError = new Error('No se tiene acceso sin loguearse');
        next(customError);
    }

    try {
        const decodedToken = jwt.verify(token, 'my-secret-key');
        req.user = decodedToken;
        next();
    } catch (error) {
        const customError = new Error('No se tiene acceso sin loguearse');
        next(customError);
    }
};