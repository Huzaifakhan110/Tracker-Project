const routes = require('express').Router();
const activityController = require('../controllers/activityController');

routes.get('/',activityController.getActivity);
routes.post('/addActivity', activityController.postActivity);
routes.post('/updateActivity/:id', activityController.updateActivity);
routes.get('/removeActivity/:id', activityController.removeActivity);
module.exports = routes;