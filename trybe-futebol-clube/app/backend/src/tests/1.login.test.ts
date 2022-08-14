import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
const { expect } = chai;

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const INCORRECT_VALUES = 'Incorrect email or password';
const UNFILLED_FIELDS = 'All fields must be filled';

describe('1. Testando a rota "/login"', () => {
  describe('ao fazer um POST no endpoint "/login"', () => {
    let chaiHttpResponse: Response;

    describe('com um usuário válido', () => {
      before(async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        });
      });

      it('a resposta retorna o status 200', async () => {
        expect(chaiHttpResponse).to.have.status(200);
      });

      it('o corpo da resposta contém as propriedades "user" e "token"', async () => {
        expect(chaiHttpResponse.body).to.include.all.keys('user', 'token');
      });

      it('a propriedade "user" é do tipo object', async () => {
        expect(chaiHttpResponse.body.user).to.be.an('object');
      });

      it('a propriedade "user" contém as propriedades "id", "username", "role" e "email"', async () => {
        expect(chaiHttpResponse.body.user).to.include.all.keys(
          'id',
          'username',
          'role',
          'email'
        );
      });

      it('a propriedade "token" é do tipo string', async () => {
        expect(chaiHttpResponse.body.token).to.be.a('string');
      });

      describe('com um email inválido', async () => {
        let chaiHttpResponse: Response;

        before(async () => {
          chaiHttpResponse = await chai.request(app).post('/login').send({
            email: 'admin@admin',
            password: 'secret_admin',
          });
        });

        it('a resposta retorna o status 401', async () => {
          expect(chaiHttpResponse).to.have.status(401);
        });

        it('o corpo contém a propriedade "message"', async () => {
          expect(chaiHttpResponse.body).to.have.key('message');
        });

        it('a mensagem é do tipo string', async () => {
          expect(chaiHttpResponse.body.message).to.be.a('string');
        });

        it('a mensagem retorna a string correta', async () => {
          expect(chaiHttpResponse.body.message).to.be.equal(INCORRECT_VALUES);
        });
      });

      describe('com uma senha inválida', async () => {
        before(async () => {
          chaiHttpResponse = await chai.request(app).post('/login').send({
            email: 'admin@admin.com',
            password: 123,
          });
        });

        it('a resposta retorna o status 401', async () => {
          expect(chaiHttpResponse).to.have.status(401);
        });

        it('o corpo contém a propriedade "message"', async () => {
          expect(chaiHttpResponse.body).to.have.key('message');
        });

        it('a mensagem é do tipo string', async () => {
          expect(chaiHttpResponse.body.message).to.be.a('string');
        });

        it('a mensagem retorna a string correta', async () => {
          expect(chaiHttpResponse.body.message).to.be.equal(INCORRECT_VALUES);
        });
      });

      describe('sem informar o email', async () => {
        let chaiHttpResponse: Response;

        before(async () => {
          chaiHttpResponse = await chai.request(app).post('/login').send({
            password: 'secret_admin',
          });
        });

        it('a resposta retorna o status 400', async () => {
          expect(chaiHttpResponse).to.have.status(400);
        });

        it('o corpo contém a propriedade "message"', async () => {
          expect(chaiHttpResponse.body).to.have.key('message');
        });

        it('a mensagem é do tipo string', async () => {
          expect(chaiHttpResponse.body.message).to.be.a('string');
        });

        it('a mensagem retorna a string correta', async () => {
          expect(chaiHttpResponse.body.message).to.be.equal(UNFILLED_FIELDS);
        });
      });

      describe('sem informar a senha', async () => {
        before(async () => {
          chaiHttpResponse = await chai.request(app).post('/login').send({
            email: 'admin@admin.com',
          });
        });

        it('a resposta retorna o status 400', async () => {
          expect(chaiHttpResponse).to.have.status(400);
        });

        it('o corpo contém a propriedade "message"', async () => {
          expect(chaiHttpResponse.body).to.have.key('message');
        });

        it('a mensagem é do tipo string', async () => {
          expect(chaiHttpResponse.body.message).to.be.a('string');
        });

        it('a mensagem retorna a string correta', async () => {
          expect(chaiHttpResponse.body.message).to.be.equal(UNFILLED_FIELDS);
        });
      });

      describe('com o campo "email" vazio', async () => {
        let chaiHttpResponse: Response;

        before(async () => {
          chaiHttpResponse = await chai.request(app).post('/login').send({
            email: '',
            password: 'secret_admin',
          });
        });

        it('a resposta retorna o status 400', async () => {
          expect(chaiHttpResponse).to.have.status(400);
        });

        it('o corpo contém a propriedade "message"', async () => {
          expect(chaiHttpResponse.body).to.have.key('message');
        });

        it('a mensagem é do tipo string', async () => {
          expect(chaiHttpResponse.body.message).to.be.a('string');
        });

        it('a mensagem retorna a string correta', async () => {
          expect(chaiHttpResponse.body.message).to.be.equal(UNFILLED_FIELDS);
        });
      });

      describe('com o campo "senha" vazio', async () => {
        before(async () => {
          chaiHttpResponse = await chai.request(app).post('/login').send({
            email: 'admin@test.com',
            password: '',
          });
        });

        it('a resposta retorna o status 400', async () => {
          expect(chaiHttpResponse).to.have.status(400);
        });

        it('o corpo contém a propriedade "message"', async () => {
          expect(chaiHttpResponse.body).to.have.key('message');
        });

        it('a mensagem é do tipo string', async () => {
          expect(chaiHttpResponse.body.message).to.be.a('string');
        });

        it('a mensagem retorna a string correta', async () => {
          expect(chaiHttpResponse.body.message).to.be.equal(UNFILLED_FIELDS);
        });
      });
    });
  });
});
