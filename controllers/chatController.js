import { logger } from '../logs/logger.js';
import messageAPI from './messagesController.js';

export async function indexChat(_, res, next) {
    try {
        res.status(200).render('chat.handlebars');
    } catch (err) {
        logger.error(err.message);
        next(err);
    }
}

export async function getChatsByEmail(req, res, next) {
    try {
        const { email } = req.params;
        const messages = await messageAPI.readAllMessages();
        const filteredMessages = messages.filter(msg => msg.email === email);
        res.json({ filteredMessages });
    } catch (err) {
        logger.error(err.message);
        next(err);
    }
}