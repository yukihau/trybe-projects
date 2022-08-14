import CarController from './controllers/CarController';
import { Car } from './interfaces/CarInterface';
import CustomRouter from './routes/Router';
import App from './app';

const server = new App();

const carController = new CarController();
const carsRouter = new CustomRouter<Car>();

carsRouter.addRoute(carController);

server.addRouter(carsRouter.router);

export default server;
