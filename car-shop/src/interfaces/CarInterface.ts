import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

const CarSchema = VehicleSchema.extend({
  _id: z.optional(
    z
      .string({
        invalid_type_error: 'Id must be a string',
      })
      .regex(
        /^[0-9a-fA-F]{24}$/,
        { message: 'Id must have 24 hexadecimal characters' },
      ),
  ),
  doorsQty: z
    .number({
      required_error: 'dootsQty is required',
      invalid_type_error: 'dootsQty must be a number',
    })
    .gte(2, { message: 'Door quantity must be greater than or equal to 2' })
    .lte(4, { message: 'Door quantity must be less than or equal to 4' }),
  seatsQty: z
    .number({
      required_error: 'seatsQty is required',
      invalid_type_error: 'seatsQty must be a number',
    })
    .gte(2, { message: 'Seat quantity must be greater than or equal to 2' })
    .lte(7, { message: 'Seat quantity must be less than or equal to 7' }),
});

type Car = z.infer<typeof CarSchema>;

export { CarSchema, Car };
