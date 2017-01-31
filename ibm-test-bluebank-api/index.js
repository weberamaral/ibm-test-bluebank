import aws from 'aws-sdk';
import config from './config/env';
import app from './config/express';

const debug = require('debug')('bluebank-backend:index');

// Configurações do DynamoDB para ambiente de test e development
// Criação da tabela local ::: Detalhes da tabela em config/env
if (config.env === 'development' || config.env === 'test') {
  aws.config.update(config.aws);
  const dynamoDB = new aws.DynamoDB();
  dynamoDB.createTable(config.dynamoDB.Accounts, (err) => {
    if (err) {
      debug(`Erro ao criar tabela: ${JSON.stringify(err, null, 2)}`);
      if (err.statusCode !== 400 && err.code !== 'ResourceInUseException') {
        throw err;
      }
    } else {
      debug(`Tabela ${config.dynamoDB.Accounts.TableName} criada com sucesso.`);
    }
  });
  dynamoDB.createTable(config.dynamoDB.Transactions, (err) => {
    if (err) {
      debug(`Erro ao criar tabela: ${JSON.stringify(err, null, 2)}`);
      if (err.statusCode !== 400 && err.code !== 'ResourceInUseException') {
        throw err;
      }
    } else {
      debug(`Tabela ${config.dynamoDB.Transactions.TableName} criada com sucesso.`);
    }
  });
}


// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  app.listen(config.port, () => {
    debug(`server started on port ${config.port} (${config.env})`);
  });
}

export default app;
