const express = require('express');
const credentialRoutes = express.Router();
const credentialController=require('../CONTROLLER/credentialController.js')
credentialRoutes.post('/Signup', credentialController.SignUp);
credentialRoutes.post('/Login', credentialController.Login);
credentialRoutes.post('/Logout', credentialController.Logout);
module.exports = credentialRoutes;