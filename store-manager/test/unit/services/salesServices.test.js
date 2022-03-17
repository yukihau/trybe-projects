const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('Service: Busca todas as vendas', () => {
  describe('Se não houver vendas', () => {
    before(() => {
      const returned = [];
      sinon.stub(salesModel, 'getAll').resolves(returned);
    });

    after(() => {
      salesModel.getAll.restore();
    });

    it('retorna um objeto', async () => {
      const result = await salesService.getAll();
      expect(result).to.be.an('object');
    });

    it('o objeto contém a chave "code" e a chave "data"', async () => {
      const result = await salesService.getAll();
      expect(result).to.include.all.keys('code', 'data');
    });

    it('a chave "data" contém um array', async () => {
      const result = await salesService.getAll();
      expect(result.data).to.be.an('array');
    })

    it('o array na chave "data" está vazio', async () => {
      const result = await salesService.getAll();
      expect(result.data).to.be.empty;
    })
  });

  describe('Se houver vendas', () => {
    before(() => {
      const returned = [
        {
          date: '2021-09-09T04:54:29.000Z',
          productId: 1,
          quantity: 2
        },
        {
          date: '2021-09-09T04:54:54.000Z',
          productId: 2,
          quantity: 2
        }
      ];
      sinon.stub(salesModel, 'getAll').resolves(returned);
    });

    after(() => {
      salesModel.getAll.restore();
    });

    it('retorna um objeto', async () => {
      const result = await salesService.getAll();
      expect(result).to.be.an('object');
    });

    it('o objeto contém a chave "code" e a chave "data"', async () => {
      const result = await salesService.getAll();
      expect(result).to.include.all.keys('code', 'data');
    });

    it('a chave "data" contém um array', async () => {
      const result = await salesService.getAll();
      expect(result.data).to.be.an('array');
    })

    it('o array não está vazio', async () => {
      const result = await salesService.getAll();
      expect(result.data).to.not.be.empty;
    });

    it('os itens do array são do tipo objeto', async () => {
      const { data: [result] } = await salesService.getAll();
      expect(result).to.be.an('object');
    });

    it('os itens do array tem as propriedades "date", "productId" e "quantity"', async () => {
      const { data: [result] } =await salesService.getAll();
      expect(result).to.include.all.keys('date', 'productId', 'quantity');
    });
  })
})

describe('Service: Busca por vendas pelo id', () => {
  const id = 1;
  const NOT_FOUND_MESSAGE = 'Sale not found';

  describe('Quando não encontra nenhuma venda', () => {
    before(() => {
      const returned = null;
      sinon.stub(salesModel, 'getById').resolves(returned);
    });

    after(() => {
      salesModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const result = await salesService.getById(id);
      expect(result).to.be.an('object');
    });

    it('o objeto contém a chave "code" e a chave "data"', async () => {
      const result = await salesService.getById(id);
      expect(result).to.include.all.keys('code', 'data');
    });

    it('a chave "code" é 404', async () => {
      const result = await salesService.getById(id);
      expect(result.code).to.equal(404);
    })

    it('a chave "data" é um objeto', async () => {
      const result = await salesService.getById(id);
      expect(result.data).to.be.an('object');
    })

    it('o objeto contém a mensagem de não encontrado', async () => {
      const result = await salesService.getById(id);
      expect(result.data).to.include({ message: NOT_FOUND_MESSAGE });
    })
  })

  describe('Quando encontra vendas', () => {
    before(() => {
      const returned = [{
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2
      }];
      sinon.stub(salesModel, 'getById').resolves(returned);
    });

    after(() => {
      salesModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const result = await salesService.getById(id);
      expect(result).to.be.an('object');
    });

    it('o objeto contém a chave "code" e a chave "data"', async () => {
      const result = await salesService.getById(id);
      expect(result).to.include.all.keys('code', 'data');
    });

    it('a chave "code" é 200', async () => {
      const result = await salesService.getById(id);
      expect(result.code).to.equal(200);
    })

    it('a chave "data" é um array', async () => {
      const result = await salesService.getById(id);
      expect(result.data).to.be.an('array');
    })

    it('os itens do array são do tipo objeto', async () => {
      const { data: [ result ] } = await salesService.getById(id);
      expect(result).to.be.an('object');
    })

    it('o objeto tem as propriedades "date", "productId" e "quantity"', async () => {
      const { data: [ result ] } = await salesService.getById(id);
      expect(result).to.include.all.keys('date', 'productId', 'quantity');
    })
  })
})
