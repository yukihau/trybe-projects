export const invalidCarToCreate = {
  model: 'Carro que não existe porque só tem 1 assento',
  year: 2020,
  color: 'Preto',
  buyValue: 3500,
  seatsQty: 1,
  doorsQty: 4,
};

export const validCarToCreate = {
  model: 'Chevrolet Onix',
  year: 2020,
  color: 'Preto',
  buyValue: 86000,
  seatsQty: 5,
  doorsQty: 4,
};

export const createdValidCar = {
  _id: '266a19107f4d15653e6b6f6b',
  model: 'Chevrolet Onix',
  year: 2020,
  color: 'Preto',
  buyValue: 86000,
  seatsQty: 5,
  doorsQty: 4,
};

export const validUpdate = {
  id: '266a19107f4d15653e6b6f6b',
  obj: {
    model: 'Impreza Sti',
    year: 2020,
    color: 'Prata',
    buyValue: 300000,
    seatsQty: 5,
    doorsQty: 4,
  },
};

export const updatedValidCar = {
  _id: '266a19107f4d15653e6b6f6b',
  model: 'Impreza Sti',
  year: 2020,
  color: 'Prata',
  buyValue: 300000,
  seatsQty: 5,
  doorsQty: 4,
};

export const carToGet = {
  model: 'BMW 750Li',
  year: 2016,
  color: 'Preto',
  buyValue: 449990,
  seatsQty: 5,
  doorsQty: 5,
};

export const mockedMongooseModel = {
  create: (obj: object) => {
    if (obj === validCarToCreate) return validCarToCreate;
    return null;
  },
};
