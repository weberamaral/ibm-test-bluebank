# ibm-test-bluebank-api


Ao avaliador:

### 1. Instalar as dependencias do projeto:
`npm install`

### 2. Rodar o projeto na máquina local
O projeto de backend depende do banco de dados noSQL DynamoDB, para isso deverá ser realizado o download do mesmo
no link [DynamoDB local](https://s3-us-west-2.amazonaws.com/dynamodb-local/dynamodb_local_latest.zip) e pssuir o java 
instalado na máquina, mais detalhes em [Mais detalhes](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html).

Após o download basta executar o seguinte comando na pasta do instalador:
`java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb`

Obs: As tabelas serão criadas pela aplicação automaticamente.

### 3. Rodar os tests
`npm test`

### 4. Rodar ESLint
`npm run lint`

Obs: Caso rode o projeto no Windows, erros de line-break serão reportados. Pois o projeto está configurado para LF

### 5. Iniciar o projeto
`npm run start:development`

Obs: Caso rode o projeto no windows, deve-se rodar o seguinte comando:
`set DEBUG=bluebank-backend:* && gulp serve`

Se tudo estiver Ok, deve-se obter o seguinte resultado no console:
```
bluebank-backend:index server started on port 3000 (development) +0ms
bluebank-backend:index Tabela Transactions-development criada com sucesso. +188ms
bluebank-backend:index Tabela Accounts-development criada com sucesso. +109ms
```

### 6. Para criar a massa de dados, deve-se acssar a URL [http://localhost:3000/api/accounts/create-data](http://localhost:3000/api/accounts/create-data)

### 7. Acesso local para o front-end
http://localhost:3000/api

### 8. Alternativa externa
Este projeto foi realizado deploy no AWS Elastic Beanstalk, caso não consiga rodar localmente, bastando apenas alterar 
o endpoint no front-end para os testes funcionais da solução completa.

Endpoint AWS EB:
`http://ibm-test-bluebank-api-dev.sa-east-1.elasticbeanstalk.com/api`
