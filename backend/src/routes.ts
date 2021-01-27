import { Router } from 'express';
import multer from 'multer';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';

import uploadConfig from './config/upload';
import ImagesController from './controllers/ImagesController';

import authMiddleware from './middlewares/auth';

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/orphanages", OrphanagesController.index);
routes.get("/orphanages/:id", OrphanagesController.show);
routes.post("/orphanages", upload.array('images'), OrphanagesController.create);
routes.post("/authenticate", UsersController.authenticate);

routes.use(authMiddleware);

routes.get("/pending-orphanages", OrphanagesController.getPendingOrphanages);
routes.get("/approved-orphanages", OrphanagesController.getApprovedOrphanages);
routes.put("/orphanages/:id", upload.array('images'), OrphanagesController.update);
routes.delete("/orphanages/:id", OrphanagesController.delete);

routes.get("/users", UsersController.index);
routes.post("/users", UsersController.create);

routes.delete("/images/:id", ImagesController.delete);

export default routes;