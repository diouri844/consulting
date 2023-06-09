import { Express } from 'express';
import { Controller } from '../shared';
const URL_PREFIX = '/api/v1';
export default (app: Express): void => {
  const controllers: Controller[] = [];

  controllers.forEach(controller => {
    console.log(URL_PREFIX + controller.path + controller.route);

    app.use(URL_PREFIX + controller.path, controller.route);
  });
};
