const project = require('../MODELS/projectData')

const newProject = async (req, res) => {
 console.log('--------------NEW-PROJECT API ACCESSED--------------');
 try {
  const newProject = new project(req.body);
  await newProject.save();
  res.send({
   success: true,
   message:'Project added successfully'
  })
 } catch (error) {
  console.log(error)
  res.send({
   success: false,
   message: 'Server Error'
  })
  res.end();
 }
}

const allProjects = async (req, res) => {
 console.log('--------------ALL-PROJECT API ACCESSED--------------');
 try {
  const projectList = await project.find({ userId: req.body.userId });
  res.send({
   success: true,
   message: 'Project list fetch successfull',
   projectList:projectList
  })
 } catch (error) {
  console.log(error)
  res.send({
   success: false,
   message: 'Server Error'
  })
  res.end();
 }
}

const updateProject = async (req, res) => {
 console.log('--------------UPDATE-PROJECT API ACCESSED--------------');
 try {
  await project.updateOne({ _id: req.body.projectId },{status:req.body.status});
  res.send({
   success: true,
   message: 'Status updated successfully'
  })
 } catch (error) {
  console.log(error)
  res.send({
   success: false,
   message: 'Server Error'
  })
  res.end();
 }
}

module.exports = {
 newProject: newProject,
 allProjects: allProjects,
 updateProject: updateProject
}