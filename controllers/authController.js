import { logger } from "../logs/logger.js";
import { sendMail } from '../utils/emailUtils.js';
import jwt from 'jsonwebtoken';

export async function getCookie(req, res, next) {
  try {
    const cookies = req.cookies.token
    if (cookies) {
      res.status(200).json({ cookies });
    } else {
      res.status(401).json('no existe cookie');
    }
  } catch (err) {
    logger.error(`${err.message}`);
    next(err);
  }
}

export async function signIn(req, res, next) {
  try {
    const { user } = req
    req.login(user, { session: false }, async (err) => {
      if (err) return next(err)
      const token = jwt.sign({ email: user.email, id: user._id }, 'my-secret-key', { expiresIn: '3m' });
      return res.cookie('token', token, { maxAge: 180000, httpOnly: true/* , secure: true  */ }).json({ message: `Bienvenido ${user.email}.`, token })
    })
  }
  catch (err) {
    logger.error(`No ha sido posible loguearse:
    ${err.message}`);
    next(err);
  }
}

export async function signOut(_, res, next) {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: `Hasta luego!.` });
  } catch (err) {
    logger.error(`No ha sido posible desloguearse de la cuenta:
      ${err.message}`);
    return next(err)
  }
}

export async function signUp(req, res) {
  try {
    const { user } = req;
    const timestamp = new Date();
    console.log('usuario: ', user);
    const bodyHTML = `Se registró un nuevo usuario con los siguientes datos:
        <ul>
        <li>Usuario: ${user.email}</li>
        <li>Nombre completo: ${user.fullname}</li>
        <li>Teléfono: ${user.phone}</li>
        <li>Fecha y Hora de registro: ${timestamp.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}</li>
        </ul>`;
    await sendMail(`Usuario ${user.email} se registró.`, bodyHTML, user.email);
    res.json({ message: `Usuario ${user.email} se registró.`, user });
  } catch (err) {
    logger.error(`No es posible registrarse:
    ${err.message}`);
  }
}
