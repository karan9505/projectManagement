
const express = require('express');
const projectRoutes = express.Router();
const projectController = require('../CONTROLLER/projectController.js')

projectRoutes.post('/Newproject', projectController.newProject)
projectRoutes.post('/Allprojects', projectController.allProjects)
projectRoutes.post('/UpdateProject', projectController.updateProject)
projectRoutes.post('/DashboardCounter', projectController.dashBoardCounterData)
projectRoutes.post('/DashboardChart', projectController.dashBoardChartsData)
projectRoutes.post('/Search', projectController.searchProject)
projectRoutes.post('/GetSorted', projectController.getSortedProjects)
module.exports = projectRoutes;