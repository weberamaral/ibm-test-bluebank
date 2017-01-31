# ibm-test-bluebank-frontend

Ao avaliador:

### 1. Instalar as dependencias globais:
`npm install --global bower karma-cli phantomjs`

### 2. Instalar as dependencias do projeto:
`npm install`

Obs: Após a execução, com sucesso da tarefa anterior, automaticamente deverá instalar as dependecias
do bower, caso isso não ocorra:

`bower install`

### 3. Rodar o projeto na máquina local
``` bash
gulp build && gulp serve
```

O projeto front-end utiliza o projeto `ibm-test-bluebank-api` para consultas e escritas dos dados, então deve-se
iniciar o projeto backend primeiramente.

### 4. Acessar o front-end

Acesso disponivel em, [http://localhost:3001/](http://localhost:3001/)

### 5. Acesso do front-end para backend externo;

Caso o acesso ao backend local não seja possivel, uma solução para acesso externo do backend foi implementada. Bastando
apenas alterar no arquivo `app.constants.js`, a contantes: `API_URL`

para o valor: 
`http://ibm-test-bluebank-api-dev.sa-east-1.elasticbeanstalk.com/api`

### Baixar as dependencias do projeto

``` bash
npm i -g bower karma-cli phantomjs
npm i
```

### Iniciar o projeto

``` bash
gulp build && gulp serve
```
