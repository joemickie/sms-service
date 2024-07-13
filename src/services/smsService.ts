import axios from 'axios';
import logger from '../utils/logger';
import { validatePhoneNumber } from '../utils/validator';
import { receiveMessages, deleteMessage } from './awsService';
import dotenv from 'dotenv';

dotenv.config();

const mockSmsApiUrl = process.env.MOCK_SMS_API_URL as string;

export const sendSms = async (phoneNumber: string, message: string) => {
  try {
    await axios.post(mockSmsApiUrl, { phoneNumber, message });
    logger.info(`SMS sent to ${phoneNumber}: ${message}`);
  } catch (error) {
    logger.error(`Error sending SMS: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw new Error('Failed to send SMS');
  }
};

export const processMessages = async () => {
  try {
    const messages = await receiveMessages();
    for (const message of messages) {
      const body = JSON.parse(message.Body as string);
      if (body.phoneNumber && validatePhoneNumber(body.phoneNumber)) {
        await sendSms(body.phoneNumber, body.message);
        await deleteMessage(message.ReceiptHandle as string);
      }
    }
  } catch (error) {
    logger.error(`Error processing messages: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw new Error('Failed to process messages');
  }
};
