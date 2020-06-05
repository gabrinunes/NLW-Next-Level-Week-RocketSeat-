import express  from 'express'
import {celebrate,Joi} from 'celebrate'
import multer from 'multer'
import multerConfig from './config/multer'

import PointsController from './controllers/PointsController'
import ItensController from './controllers/ItemsController'

const routes = express.Router()
const pointsController = new PointsController();
const itensCotroller = new ItensController();

routes.get('/items',itensCotroller.index)
const upload = multer(multerConfig)

routes.get('/points/',pointsController.index)
routes.get('/points/:id',pointsController.show)

routes.post('/points',
upload.single('image'),
celebrate({
    body:Joi.object().keys({
        name:Joi.string().required(),
        email:Joi.string().required(),
        whatsapp:Joi.string().required(),
        latitude:Joi.number().required(),
        longitude:Joi.number().required(),
        city:Joi.string().required(),
        uf:Joi.string().required().max(2),
        items:Joi.string().required(),
    })
},{
    abortEarly:false
}),
pointsController.create
)

export default routes;