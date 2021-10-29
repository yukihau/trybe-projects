const answerPhone = require('../src/asyncJest');

describe('1 - O retorno do telefonema', () => {
  test('atende', async () => {
    expect.assertions(1);
    await expect(answerPhone('alo?')).resolves.toEqual('Oi!');
  });
  test('ocupado', async () => {
    expect.assertions(1);
    await expect(answerPhone()).rejects.toThrow('Infelizmente não podemos atender...');
  });
});
