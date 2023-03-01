import {
    getMessages,
    sendMessage
} from '../services/messageServices.js';

async function readAllMessages() {
    return getMessages();
}

async function sendNewMessage(message) {
    return sendMessage(message);
}

export default {
    readAllMessages,
    sendNewMessage
}