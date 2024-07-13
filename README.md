# SMS Service

This project is a backend service designed to handle SMS messaging for customer notifications using AWS SQS (Simple Queue Service) and AWS SNS (Simple Notification Service). The service is implemented in TypeScript and follows enterprise standards with proper separation of concerns and error handling.

## Features

- **Transaction Event Handling**: Receives transaction success events and calculates the profit from successful transactions, assuming a 3% commission rate per transaction.
- **SMS Request Processing**: Polls an AWS SQS queue for incoming SMS requests, validates them, and sends mock API calls to simulate SMS delivery through an ISP (Internet Service Provider).
- **Error Handling and Logging**: Implements best practices for error handling and logging to manage SMS delivery failures and queue processing errors effectively.
- **SMS Notification Limit**: Ensures that each valid phone number receives notifications at most once to avoid customer frustration.

## Project Structure

```
sms-service/
├── src/
│   ├── controllers/
│   │   └── smsController.ts
│   ├── middlewares/
│   │   └── errorHandler.ts
│   ├── services/
│   │   ├── awsService.ts
│   │   └── smsService.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   └── validator.ts
│   ├── app.ts
│   └── server.ts
├── dist/
├── .env
├── tsconfig.json
└── package.json
```

## Setup and Installation

### Prerequisites

- Node.js
- npm or yarn
- TypeScript

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/joemickie/sms-service.git
   cd sms-service
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file:**
   ```plaintext
   PORT=4001
   AWS_REGION=us-east-1
   SQS_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/123456789012/my-queue
   MOCK_SMS_API_URL=https://httpbin.org/post
   ```

4. **Compile TypeScript:**
   ```bash
   npm run build
   ```

5. **Run the server:**
   ```bash
   npm start
   ```

## Running the Service

The service can be started by running the following command:

```bash
npm start
```

This will start the server on the port specified in the `.env` file. By default, it runs on port 3000.

## Testing the Service

You can test the service by sending HTTP requests to the endpoints defined in the `smsController.ts` file. Here’s an example of how to send a POST request to send an SMS:

```bash
curl -X POST http://localhost:4001/api/sms -H "Content-Type: application/json" -d '{"phoneNumber": "+2349036249762", "message": "Hello, this is a test message."}'
```

## Mock Scenario

This project uses a mock scenario to simulate SMS delivery. The `MOCK_SMS_API_URL` in the `.env` file points to `https://httpbin.org/post`, which is a public testing endpoint provided by httpbin.org. This allows us to simulate the process of sending SMS messages without needing a real SMS provider.

## Error Handling

All errors are logged and handled gracefully to ensure the service remains robust and reliable. The `errorHandler` middleware catches all errors and logs them using the `logger.ts` utility.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for any features, enhancements, or bug fixes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.