import joi from 'joi';

export default {
  /**
   * POST /api/accounts
   * Dados iniciais para criação de uma conta
   */
  createAccount: {
    body: {
      cpf: joi.string().required(),
      balance: joi.number().min(0).required(),
      number: joi.string().required(),
      agency: joi.string().required()
    }
  },
  /**
   * GET /api/accounts/:ID
   * Parametro obrigatório para recuperar as informaçoes de uma conta.
   * O ID será enviado como string na URL da requisição
   */
  getAccount: {
    params: {
      id: joi.string().required()
    }
  },
  /**
   * PUT /api/accounts/:ID/balance/add|retire
   */
  updateBalance: {
    params: {
      id: joi.string().required()
    },
    body: {
      value: joi.number().min(0).required()
    }
  },
  /**
   * POST /api/transactions
   */
  createTransaction: {
    body: {
      toAccountAgency: joi.string().required(),
      toAccountNumber: joi.string().required(),
      fromAccountAgency: joi.string().required(),
      fromAccountNumber: joi.string().required(),
      value: joi.number().min(0).required()
    }
  },
  paramsId: {
    params: {
      id: joi.string().required()
    }
  }
};
