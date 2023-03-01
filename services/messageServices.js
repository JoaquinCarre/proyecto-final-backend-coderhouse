import { v4 as uuidv4 } from 'uuid';
import MessageRepository from '../models/repository/messageRepository.js';
import { messageInstance } from '../models/dao/indexDAO.js';

const repository = new MessageRepository();

export async function getMessages() {
    return await repository.readFile();
}

export async function sendMessage(message) {
    const comment = {
        id: uuidv4(),
        content: message.content,
        timestamp: message.timestamp
    };
    const newMessage = {
        authors: message.author,
        comments: comment,
    };
    const response = messageInstance.addMessage(newMessage);
    return response;
}