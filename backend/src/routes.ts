import { Router } from 'express';
import multer from 'multer';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';

import uploadConfig from './config/upload';
import ImagesController from './controllers/ImagesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/orphanages", OrphanagesController.index);
routes.get("/orphanages/:id", OrphanagesController.show);
routes.post("/orphanages", upload.array('images'), OrphanagesController.create);
routes.put("/orphanages/:id", upload.array('images'), OrphanagesController.update);
routes.delete("/orphanages/:id", OrphanagesController.delete);

routes.get("/users", UsersController.index);
routes.post("/users", UsersController.create);
routes.post("/authenticate", UsersController.authenticate);

routes.delete("/images/:id", ImagesController.delete);

export default routes;