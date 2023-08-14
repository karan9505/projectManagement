
const express = require('express');
const projectRoutes = express.Router();
const projectController = require('../CONTROLLER/projectController.js')

projectRoutes.post('/Newproject', projectController.newProject)
projectRoutes.post('/Allprojects', projectController.allProjects)
projectRoutes.post('/UpdateProject', projectController.updateProject)
projectRoutes.post('/DashboardData', projectController.dashBoardData)
module.exports = projectRoutes;