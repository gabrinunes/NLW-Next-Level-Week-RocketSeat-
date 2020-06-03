import express  from 'express'
import PointsController from './controllers/PointsController'
import ItensController from './controllers/ItemsController'
const routes = express.Router()
const pointsController = new PointsController();
const itensCotroller = new ItensController();

routes.get('/items',itensCotroller.index)

routes.post('/points',pointsController.create)
routes.get('/points/',pointsController.index)
routes.get('/points/:id',pointsController.show)

export default routes;