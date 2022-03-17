const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');

describe('Controller: Busca todos os produtos', () => {
  describe('Se não houver produtos', () => {
    const request = {};
    const response = {};

    before(() => {
      const returned = { code: 200, data: [] };

      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getAll').resolves(returned);
    });

    after(() => {
      productsService.getAll.restore();
    });

    it('é chamado o status 200', async () => {
      await productsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com um item de tipo array', async () => {
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('Se houver produtos', () => {
    const request = {};
    const response = {};

    before(() => {
      const returned = {
        code: 200,
        data: [
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
        ],
      };

      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getAll').resolves(returned);
    });

    after(() => {
      productsService.getAll.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await productsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com um item de tipo array', async () => {
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  })
})

describe('Controller: Busca apenas um produto pelo id', () => {
  const id = 1;
  const NOT_FOUND_MESSAGE = 'Product not found';

  describe('Quando não encontra nenhum produto', () => {
    const request = {};
    const response = {};

    before(() => {
      const returned = { code: 404, data: { message: NOT_FOUND_MESSAGE } };

      request.body = {};
      request.params = { id };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getById').resolves(returned);
    });

    after(() => {
      productsService.getById.restore();
    });

    it('é chamado o status 404', async () => {
      await productsController.getById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o json com uma mensagem de produto não encontrado', async () => {
      await productsController.getById(request, response);
      expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  })

  describe('Quando encontra o produto', () => {
    const request = {};
    const response = {};

    before(() => {
      const returned = {
        code: 200,
        data: {
          id: 1,
          name: 'produto A',
          quantity: 10
        },
      };

      request.body = {};
      request.params = { id };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getById').resolves(returned);
    });

    after(() => {
      productsService.getById.restore();
    });

    it('é chamado o status 200', async () => {
      await productsController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado json com um item do tipo objeto', async () => {
      await productsController.getById(request, response);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  })
})
