const express = require('express');
const credentialRoutes = express.Router();
const credentialController=require('../CONTROLLER/credentialController.js')
credentialRoutes.post('/Login', credentialController.Login);
credentialRoutes.post('/Signup', credentialController.SignUp)
module.exports = credentialRoutes;