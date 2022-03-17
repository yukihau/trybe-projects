const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('Service: Busca todos os produtos', () => {
  describe('Se não houver produtos', () => {
    before(() => {
      const returned = [];
      sinon.stub(productsModel, 'getAll').resolves(returned);
    });

    after(() => {
      productsModel.getAll.restore();
    });

    it('retorna um objeto', async () => {
      const result = await productsService.getAll();
      expect(result).to.be.an('object');
    });

    it('o objeto contém a chave "code" e a chave "data"', async () => {
      const result = await productsService.getAll();
      expect(result).to.include.all.keys('code', 'data');
    });

    it('a chave "data" contém um array', async () => {
      const result = await productsService.getAll();
      expect(result.data).to.be.an('array');
    })

    it('o array na chave "data" está vazio', async () => {
      const result = await productsService.getAll();
      expect(result.data).to.be.empty;
    })
  });

  describe('Se houver produtos', () => {
    before(() => {
      const returned = [
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
      ];
      sinon.stub(productsModel, 'getAll').resolves(returned);
    });

    after(() => {
      productsModel.getAll.restore();
    });

    it('retorna um objeto', async () => {
      const result = await productsService.getAll();
      expect(result).to.be.an('object');
    });

    it('o objeto contém a chave "code" e a chave "data"', async () => {
      const result = await productsService.getAll();
      expect(result).to.include.all.keys('code', 'data');
    });

    it('a chave "code" é 200', async () => {
      const result = await productsService.getAll();
      expect(result.code).to.equal(200);
    });

    it('a chave "data" contém um array', async () => {
      const result = await productsService.getAll();
      expect(result.data).to.be.an('array');
    })

    it('o array não está vazio', async () => {
      const result = await productsService.getAll();
      expect(result.data).to.not.be.empty;
    });

    it('os itens do array são do tipo objeto', async () => {
      const { data: [result] } = await productsService.getAll();
      expect(result).to.be.an('object');
    });

    it('os itens do array tem as propriedades "id", "name" e "quantity"', async () => {
      const { data: [result] } = await productsService.getAll();
      expect(result).to.include.all.keys('id', 'name', 'quantity');
    });
  })
})

describe('Service: Busca apenas um produto pelo id', () => {
  const id = 1;
  const NOT_FOUND_MESSAGE = 'Product not found';

  describe('Quando não encontra nenhum produto', () => {
    before(() => {
      const returned = null;
      sinon.stub(productsModel, 'getById').resolves(returned);
    });

    after(() => {
      productsModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const result = await productsService.getById(id);
      expect(result).to.be.an('object');
    });

    it('o objeto contém a chave "code" e a chave "data"', async () => {
      const result = await productsService.getById(id);
      expect(result).to.include.all.keys('code', 'data');
    });

    it('a chave "code" é 404', async () => {
      const result = await productsService.getById(id);
      expect(result.code).to.equal(404);
    })

    it('a chave "data" é um objeto', async () => {
      const result = await productsService.getById(id);
      expect(result.data).to.be.an('object');
    })

    it('o objeto contém a mensagem de não encontrado', async () => {
      const result = await productsService.getById(id);
      expect(result.data).to.include({ message: NOT_FOUND_MESSAGE });
    })
  })

  describe('Quando encontra o produto', () => {
    before(() => {
      const returned = {
        id: 1,
        name: 'produto A',
        quantity: 10
      };
      sinon.stub(productsModel, 'getById').resolves(returned);
    });

    after(() => {
      productsModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const result = await productsService.getById(id);
      expect(result).to.be.an('object');
    });

    it('o objeto contém a chave "code" e a chave "data"', async () => {
      const result = await productsService.getById(id);
      expect(result).to.include.all.keys('code', 'data');
    });

    it('a chave "code" é 200', async () => {
      const result = await productsService.getById(id);
      expect(result.code).to.equal(200);
    })

    it('a chave "data" é um objeto', async () => {
      const result = await productsService.getById(id);
      expect(result.data).to.be.an('object');
    })

    it('o objeto tem as propriedades "id", "name" e "quantity"', async () => {
      const result = await productsService.getById(id);
      expect(result.data).to.include.all.keys('id', 'name', 'quantity');
    })
  })
})
