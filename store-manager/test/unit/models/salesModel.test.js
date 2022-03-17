const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../connection');
const salesModel = require('../../../models/salesModel');

describe('Model: Busca todas as vendas', () => {
  describe('Se não houver vendas', () => {
    before(() => {
      const returned = [[]];
      sinon.stub(connection, 'execute').resolves(returned);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna null', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.a('array');
    });

    it('o array está vazio', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.empty;
    });
  });

  describe('Se houver vendas', () => {
    before(() => {
      const returned = [[
        {
          sale_id: 1,
          date: '2021-09-09T04:54:29.000Z',
          product_id: 1,
          quantity: 2
        },
        {
          sale_id: 1,
          date: '2021-09-09T04:54:54.000Z',
          product_id: 2,
          quantity: 2
        }
      ]];
      sinon.stub(connection, 'execute').resolves(returned);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await salesModel.getAll();
      expect(result).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const result = await salesModel.getAll();
      expect(result).to.not.be.empty;
    });

    it('os itens do array são do tipo objeto', async () => {
      const [result] = await salesModel.getAll();
      expect(result).to.be.an('object');
    });

    it('os itens do array tem as propriedades "sale_id", "date", "product_id" e "quantity"', async () => {
      const [result] = await salesModel.getAll();
      expect(result).to.include.all.keys('sale_id', 'date', 'product_id', 'quantity');
    });
  })
})

describe('Model: Busca por vendas pelo id', () => {
  const id = 1;

  describe('Quando não encontra nenhuma venda', () => {
    before(() => {
      const returned = [[]];
      sinon.stub(connection, 'execute').resolves(returned);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna null', async () => {
      const result = await salesModel.getById(id);
      expect(result).to.be.a('null');
    });
  })

  describe('Quando encontra vendas', () => {
    before(() => {
      const returned = [[{
        date: '2021-09-09T04:54:29.000Z',
        product_id: 1,
        quantity: 2
      }]];
      sinon.stub(connection, 'execute').resolves(returned);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await salesModel.getById(id);
      expect(result).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const result = await salesModel.getById(id);
      expect(result).to.not.be.empty;
    });

    it('os itens do array são do tipo objeto', async () => {
      const [result] = await salesModel.getById(id);
      expect(result).to.be.an('object');
    });

    it('os itens do array tem as propriedades "saleId", "date" e "product_id"', async () => {
      const [result] = await salesModel.getById(id);
      expect(result).to.include.all.keys('date', 'product_id', 'quantity');
    });
  })
})
