import { Router } from 'express';
import Controller from '../controllers';

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(controller: Controller<T>, route: string = controller.route) {
    this.router.get(route, controller.read);
    this.router.get(`${route}/:id`, controller.validateId, controller.readOne);
    this.router.post(route, controller.create);
    this.router.put(`${route}/:id`, controller.validateId, controller.update);
    this.router.delete(
      `${route}/:id`,
      controller.validateId,
      controller.delete,
    );
  }
}

export default CustomRouter;
