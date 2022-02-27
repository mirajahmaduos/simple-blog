const express = require('express')
const ContentRouter = express.Router();
const contentController = require('../controllers/ContentController');
const {body, validationResult} = require('express-validator');

ContentRouter.get('/getall', contentController.getContent);
ContentRouter.post('/', contentController.createContent);
ContentRouter.get('/getone/:id', contentController.getContentByid);
ContentRouter.delete('/deletecontent/:id', contentController.deleteContent);
ContentRouter.delete('/deletebunch/:type', contentController.deleteBunch);
ContentRouter.patch('/:id', contentController.partialUpdate);
ContentRouter.put('/:id', contentController.fullUpdate);

module.exports = ContentRouter;