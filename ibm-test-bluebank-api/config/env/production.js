export default {
  env: 'production',
  port: process.env.PORT,
  aws: {
    region: process.env.AWS_REGION || process.env.REGION
  },
  dynamoDB: {
    Accounts: {
      TableName: 'Accounts',
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'cpf',
          KeyType: 'RANGE'
        }
      ],
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S'
        },
        {
          AttributeName: 'cpf',
          AttributeType: 'S'
        },
        {
          AttributeName: 'type',
          AttributeType: 'S'
        },
        {
          AttributeName: 'createdAt',
          AttributeType: 'S'
        },
        {
          AttributeName: 'number',
          AttributeType: 'S'
        },
        {
          AttributeName: 'agency',
          AttributeType: 'S'
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      },
      GlobalSecondaryIndexes: [
        {
          IndexName: 'GetAllIndex',
          KeySchema: [
            {
              AttributeName: 'type',
              KeyType: 'HASH'
            },
            {
              AttributeName: 'createdAt',
              KeyType: 'RANGE'
            }
          ],
          Projection: {
            ProjectionType: 'ALL'
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          }
        },
        {
          IndexName: 'GetByAgencyAndNumberIndex',
          KeySchema: [
            {
              AttributeName: 'number',
              KeyType: 'HASH'
            },
            {
              AttributeName: 'agency',
              KeyType: 'RANGE'
            }
          ],
          Projection: {
            ProjectionType: 'ALL'
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          }
        }
      ]
    },
    Transactions: {
      TableName: 'Transactions',
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'type',
          KeyType: 'RANGE'
        }
      ],
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S'
        },
        {
          AttributeName: 'type',
          AttributeType: 'S'
        },
        {
          AttributeName: 'createdAt',
          AttributeType: 'S'
        },
        {
          AttributeName: 'fromAccountId',
          AttributeType: 'S'
        },
        {
          AttributeName: 'status',
          AttributeType: 'S'
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      },
      GlobalSecondaryIndexes: [
        {
          IndexName: 'GetAllIndex',
          KeySchema: [
            {
              AttributeName: 'type',
              KeyType: 'HASH'
            },
            {
              AttributeName: 'createdAt',
              KeyType: 'RANGE'
            }
          ],
          Projection: {
            ProjectionType: 'ALL'
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          }
        },
        {
          IndexName: 'GetAllPendingIndex',
          KeySchema: [
            {
              AttributeName: 'fromAccountId',
              KeyType: 'HASH'
            },
            {
              AttributeName: 'status',
              KeyType: 'RANGE'
            }
          ],
          Projection: {
            ProjectionType: 'ALL'
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          }
        }
      ]
    }
  }
};
