import app from './app';
import { processMessages } from './services/smsService';
import logger from './utils/logger';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);

  // Polling interval to process messages every 10s
  setInterval(processMessages, 10000);
});


