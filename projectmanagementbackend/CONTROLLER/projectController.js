const project = require('../MODELS/projectData')

const newProject = async (req, res) => {
 console.log('--------------NEW-PROJECT API ACCESSED--------------');
 try {
  const newProject = new project(req.body);
  await newProject.save();
  res.send({
   success: true,
   message: 'Project added successfully'
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
   projectList: projectList
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
  await project.updateOne({ _id: req.body.projectId }, { status: req.body.status });
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

const dashBoardData = async (req, res) => {
 console.log('--------------DASHBOARD-DATA API ACCESSED--------------');
 try {
  let totalProjects = 0;
  let closedProjects = 0;
  let runningProjects = 0;
  let closureDay = 0;
  let cancelledProjects = 0;
  let chartData = [];
  let STR = {
   name: 'STR',
   Total: 0,
   Closed: 0
  }
  let FIN = {
   name: 'FIN',
   Total: 0,
   Closed: 0
  }
  let QLT = {
   name: 'QLT',
   Total: 0,
   Closed: 0
  }
  let MAN = {
   name: 'MAN',
   Total: 0,
   Closed: 0
  }
  let STO = {
   name: 'STO',
   Total: 0,
   Closed: 0
  }
  let HR = {
   name: 'HR',
   Total: 0,
   Closed: 0
  }
  const dashBoardData = await project.find({ userId: req.body.userId });
  totalProjects = dashBoardData.length;
  dashBoardData.map((data) => {
   if (data.status === 'Running')
    runningProjects++;
   else if (data.status === 'Closed')
    closedProjects++;
   else if (data.status === 'Cancelled')
    cancelledProjects++;

   let currentTime = new Date().getTime();
   let endTime = new Date(data.endDate).getTime();
   if (endTime - currentTime <= 172800000)
    closureDay++;

   if (data.department === 'Strategy') {
    STR.Total++
    if (data.status === 'Closed')
     STR.Closed++;
   }

   else if (data.department === 'Finance') {
    FIN.Total++
    if (data.status === 'Closed')
     FIN.Closed++;
   }

   else if (data.department === 'Quality') {
    QLT.Total++
    if (data.status === 'Closed')
     QLT.Closed++;
   }

   else if (data.department === 'Maintenance') {
    MAN.Total++
    if (data.status === 'Closed')
     MAN.Closed++;
   }

   else if (data.department === 'Stores') {
    STO.Total++
    if (data.status === 'Closed')
     STO.Closed++;
   }

   else if (data.department === 'HR') {
    HR.Total++
    if (data.status === 'Closed')
     HR.Closed++;
   }
  })

  chartData = [STR, FIN, QLT, MAN, STO, HR];

  chartData.map((data) => {
   let per = (data.Closed / data.Total).toPrecision(2)* 100;
   data.name = data.name +" - "+per+'%';
  })
  
  res.send({
   success:true,
   totalProjects: totalProjects,
   closedProjects: closedProjects,
   runningProjects: runningProjects,
   closureDay: closureDay,
   cancelledProjects: cancelledProjects,
   chartData: chartData
  })
  res.end()
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
 updateProject: updateProject,
 dashBoardData: dashBoardData
}