const sinon = require('sinon');
const { expect } = require('chai');

const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');

describe('Controller: Busca todas as vendas', () => {
  describe('Se não houver vendas', () => {
    const request = {};
    const response = {};

    before(() => {
      const returned = { code: 200, data: [] };

      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').resolves(returned);
    });

    after(() => {
      salesService.getAll.restore();
    });

    it('é chamado o status 200', async () => {
      await salesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com um item de tipo array', async () => {
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('Se houver vendas', () => {
    const request = {};
    const response = {};

    before(() => {
      const returned = {
        code: 200,
        data: [
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
        ],
      };

      request.body = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').resolves(returned);
    });

    after(() => {
      salesService.getAll.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await salesController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com um item de tipo array', async () => {
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  })
})

describe('Controller: Busca por vendas pelo id', () => {
  const id = 1;
  const NOT_FOUND_MESSAGE = 'Sale not found';

  describe('Quando não encontra nenhum produto', () => {
    const request = {};
    const response = {};

    before(() => {
      const returned = { code: 404, data: { message: NOT_FOUND_MESSAGE } };

      request.body = {};
      request.params = { id };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getById').resolves(returned);
    });

    after(() => {
      salesService.getById.restore();
    });

    it('é chamado o status 404', async () => {
      await salesController.getById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o json com uma mensagem de produto não encontrado', async () => {
      await salesController.getById(request, response);
      expect(response.json.calledWith({ message: NOT_FOUND_MESSAGE })).to.be.equal(true);
    });
  })

  describe('Quando encontra vendas', () => {
    const request = {};
    const response = {};

    before(() => {
      const returned = {
        code: 200,
        data: [{
          date: '2021-09-09T04:54:29.000Z',
          productId: 1,
          quantity: 2
        }]
      };

      request.body = {};
      request.params = { id };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getById').resolves(returned);
    });

    after(() => {
      salesService.getById.restore();
    });

    it('é chamado o status 200', async () => {
      await salesController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado json com um item do tipo array', async () => {
      await salesController.getById(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  })
})
