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

const dashBoardCounterData = async (req, res) => {
  console.log('--------------DASHBOARD-COUNTER API ACCESSED--------------');
  try {
    let totalProjects = await project.find({ userId: req.body.userId }).count();
    let closedProjects = await project.find({ userId: req.body.userId, status: 'Closed' }).count();
    let runningProjects = await project.find({ userId: req.body.userId, status: 'Running' }).count();
    let cancelledProjects = await project.find({ userId: req.body.userId, status: 'Cancelled' }).count();

    let closureDay = 0;

    const dashBoardData = await project.find({ userId: req.body.userId });
    dashBoardData.map((data) => {
      let currentTime = new Date().getTime();
      let endTime = new Date(data.endDate).getTime();
      if (endTime - currentTime <= 172800000)
        closureDay++;
    })
    res.send({
      success: true,
      totalProjects: totalProjects,
      closedProjects: closedProjects,
      runningProjects: runningProjects,
      closureDay: closureDay,
      cancelledProjects: cancelledProjects,
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

const dashBoardChartsData = async (req, res) => {
  try {
    console.log('--------------DASHBOARD-CAHRT API ACCESSED--------------');
    const chartData = [
      {
        name: 'STR',
        Total: await project.find({ userId: req.body.userId, department: 'Strategy' }).count(),
        Closed: await project.find({ userId: req.body.userId, department: 'Strategy', status: 'Closed' }).count()
      },
      {
        name: 'FIN',
        Total: await project.find({ userId: req.body.userId, department: 'Finance' }).count(),
        Closed: await project.find({ userId: req.body.userId, department: 'Finance', status: 'Closed' }).count()
      },
      {
        name: 'QLT',
        Total: await project.find({ userId: req.body.userId, department: 'Quality' }).count(),
        Closed: await project.find({ userId: req.body.userId, department: 'Quality', status: 'Closed' }).count()
      },
      {
        name: 'MAN',
        Total: await project.find({ userId: req.body.userId, department: 'Maintenance' }).count(),
        Closed: await project.find({ userId: req.body.userId, department: 'Maintenance', status: 'Closed' }).count()
      },
      {
        name: 'STO',
        Total: await project.find({ userId: req.body.userId, department: 'Stores' }).count(),
        Closed: await project.find({ userId: req.body.userId, department: 'Stores', status: 'Closed' }).count()
      },
      {
        name: 'HR',
        Total: await project.find({ userId: req.body.userId, department: 'HR' }).count(),
        Closed: await project.find({ userId: req.body.userId, department: 'HR', status: 'Closed' }).count()
      }
    ]
    res.send({
      success: true,
      chartData: chartData
    })
    res.end();

  } catch (error) {
    console.log(error)
    res.send({
      success: false,
      message: 'Server Error'
    })
    res.end();
  }
}

const searchProject = async (req, res) => {
  console.log('--------------SEARCH PROJECT API ACCESSED--------------');
  try {
    const searchedProjects = await project.find({
      userId: req.body.userId,
      "$or": [
        { "theme": { $regex: req.body.key, $options: 'i' } },
        { "reason": { $regex: req.body.key, $options: 'i' } },
        { "type": { $regex: req.body.key, $options: 'i' } },
        { "division": { $regex: req.body.key, $options: 'i' } },
        { "category": { $regex: req.body.key, $options: 'i' } },
        { "department": { $regex: req.body.key, $options: 'i' } },
        { "location": { $regex: req.body.key, $options: 'i' } },
        { "status": { $regex: req.body.key, $options: 'i' } },
      ]
    }).collation({ locale: "en", strength: 2 })
    res.send({
      success: true,
      searchedProjects: searchedProjects
    })
    res.end();
  } catch (error) {
    console.log(error)
    res.send({
      success: false,
      message: 'Server Error'
    })
    res.end();
  }
}

const getSortedProjects = async (req, res) => {
  console.log('--------------SORTED PROJECT API ACCESSED--------------');
  try {
    let property = req.body.property;
    let sortedProjects;
    if (property === 'priority')
      sortedProjects = await project.find({ userId: req.body.userId }).sort({ 'priority': 1 })
    else if (property === 'category')
      sortedProjects = await project.find({ userId: req.body.userId }).sort({ 'category': 1 })
    else if (property === 'reason')
      sortedProjects = await project.find({ userId: req.body.userId }).sort({ 'reason': 1 })
    else if (property === 'division')
      sortedProjects = await project.find({ userId: req.body.userId }).sort({ 'division': 1 })
    else if (property === 'department')
      sortedProjects = await project.find({ userId: req.body.userId }).sort({ 'department': 1 })
    else if (property === 'location')
      sortedProjects = await project.find({ userId: req.body.userId }).sort({ 'location': 1 })
    res.send({
      success: true,
      sortedProjects: sortedProjects
    })
    res.end();
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
  dashBoardCounterData: dashBoardCounterData,
  searchProject: searchProject,
  getSortedProjects: getSortedProjects,
  dashBoardChartsData: dashBoardChartsData
}