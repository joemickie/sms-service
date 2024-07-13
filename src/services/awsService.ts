import AWS from 'aws-sdk';
import AWSMock from 'aws-sdk-mock';
import dotenv from 'dotenv';

dotenv.config();

// Mock AWS SDK for testing
AWSMock.setSDKInstance(AWS);

// Mock SQS receiveMessage function
AWSMock.mock('SQS', 'receiveMessage', (params, callback) => {
  const mockMessage = {
    Messages: [
      {
        MessageId: '1',
        ReceiptHandle: 'mock-receipt-handle',
        Body: JSON.stringify({
          phoneNumber: '+2349036249762',
          message: 'Your transaction was successful!',
        }),
      },
    ],
  };
  callback(null, mockMessage);
});

// Mock SQS deleteMessage function
AWSMock.mock('SQS', 'deleteMessage', (params, callback) => {
  callback(null, {});
});

const sqs = new AWS.SQS({
  region: process.env.AWS_REGION,
});

const queueUrl = process.env.SQS_QUEUE_URL as string;

export const receiveMessages = async () => {
  try {
    const params = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20,
    };

    const result = await sqs.receiveMessage(params).promise();
    return result.Messages || [];
  } catch (error) {
    throw new Error(`Error receiving message from SQS: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const deleteMessage = async (receiptHandle: string) => {
  try {
    const deleteParams = {
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle,
    };
    await sqs.deleteMessage(deleteParams).promise();
  } catch (error) {
    throw new Error(`Error deleting message from SQS: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
