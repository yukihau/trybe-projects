import { Schema, model as createModel } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';

const carSchema = new Schema<Car>(
  {
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    status: { type: Boolean, required: false },
    buyValue: { type: Number, required: true },
    seatsQty: { type: Number, required: true },
    doorsQty: { type: Number, required: true },
  },
  { versionKey: false },
);

class CarModel extends MongoModel<Car> {
  constructor(model = createModel('Cars', carSchema)) {
    super(model);
  }
}

export default CarModel;
