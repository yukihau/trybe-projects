const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../connection');
const productsModel = require('../../../models/productsModel');

describe('Model: Busca todos os produtos', () => {
  describe('Se não houver produtos', () => {
    before(() => {
      const returned = [[]];
      sinon.stub(connection, 'execute').resolves(returned);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await productsModel.getAll();
      expect(result).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const result = await productsModel.getAll();
      expect(result).to.be.empty;
    });
  });

  describe('Se houver produtos', () => {
    before(() => {
      const returned = [[
        {
          id: 1,
          name: 'produto A',
          quantity: 10
        },
        {
          id: 2,
          name: 'produto B',
          quantity: 20
        }
      ]];
      sinon.stub(connection, 'execute').resolves(returned);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await productsModel.getAll();
      expect(result).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const result = await productsModel.getAll();
      expect(result).to.not.be.empty;
    });

    it('os itens do array são do tipo objeto', async () => {
      const [result] = await productsModel.getAll();
      expect(result).to.be.an('object');
    });

    it('os itens do array tem as propriedades "id", "name" e "quantity"', async () => {
      const [result] = await productsModel.getAll();
      expect(result).to.include.all.keys('id', 'name', 'quantity');
    });
  })
})

describe('Model: Busca apenas um produto pelo id', () => {
  const id = 1;

  describe('Quando não encontra nenhum produto', () => {
    before(() => {
      const returned = [[]];
      sinon.stub(connection, 'execute').resolves(returned);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna null', async () => {
      const result = await productsModel.getById(id);
      expect(result).to.be.a('null');
    });
  })

  describe('Quando encontra o produto', () => {
    before(() => {
      const returned = [[{
        id: 1,
        name: 'produto A',
        quantity: 10
      }]];
      sinon.stub(connection, 'execute').resolves(returned);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const result = await productsModel.getById(id);
      expect(result).to.be.an('object');
    });

    it('o objeto não está vazio', async () => {
      const result = await productsModel.getById(id);
      expect(result).to.not.be.empty;
    });

    it('os itens do array tem as propriedades "id", "name" e "quantity"', async () => {
      const result = await productsModel.getById(id);
      expect(result).to.include.all.keys('id', 'name', 'quantity');
    });
  })
})
