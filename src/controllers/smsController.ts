import { Router, Request, Response, NextFunction } from 'express';
import { sendSms } from '../services/smsService';
import { validatePhoneNumber } from '../utils/validator';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }

  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  try {
    await sendSms(phoneNumber, message);
    res.status(200).json({ success: 'SMS sent successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
