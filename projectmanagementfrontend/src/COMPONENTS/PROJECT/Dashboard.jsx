import React, { useEffect, useState } from 'react'
import '../../CSS/Dashboard.css'
import CountUp from 'react-countup'
import axios from 'axios';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, LabelList } from 'recharts';
export default function Dashboard() {

  const [dashBoardData, setDashBoardData] = useState({});

  const dashboardDataApi = 'https://my-project-management.onrender.com/Project/DashboardData'
  const userId = JSON.parse(localStorage.getItem('userId'));
  
  const getDashboardData = () => {
    axios.post(dashboardDataApi, {
      userId:userId
    })
      .then((response) => {
        console.log(response.data)
        if (response.data.success) {
        setDashBoardData(response.data)
      }
      })
      .catch((error) => {
      console.log(error.message)
    })
  }

  useEffect(() => {
    getDashboardData();
  },[])
  return (
    <>
      <p className="dashboardHeading">Dashboard</p>
      {
        Object.keys(dashBoardData).length > 0 ?
          <>
            <div className='dashDataWrap'>
              <div className='dashDataEle' id='dde1'>
                <p className='dashValue'>Total Projects<br></br>
                  <CountUp start={0} end={dashBoardData.totalProjects} duration={1}></CountUp>
                </p>
              </div>
              <div className='dashDataEle' id='dde2'>
                <p className='dashValue'>Closed<br></br>
                  <CountUp start={0} end={dashBoardData.closedProjects} duration={1}></CountUp>
                </p>
              </div>
              <div className='dashDataEle' id='dde3'>
                <p className='dashValue'>Running<br></br>
                  <CountUp start={0} end={dashBoardData.runningProjects} duration={1}></CountUp>
                </p>
              </div>
              <div className='dashDataEle' id='dde4'>
                <p className='dashValue'>Closure Delay<br></br>
                  <CountUp start={0} end={dashBoardData.closureDay} duration={1}></CountUp>
                </p>
              </div>
              <div className='dashDataEle' id='dde5'>
                <p className='dashValue'>Cancelled<br></br>
                  <CountUp start={0} end={dashBoardData.cancelledProjects} duration={1}></CountUp>
                </p>
              </div>
            </div>
            <h1 id='chartHeading'>Department wise - Total Vs Closed</h1>
            <div className='chartWrapper'>
              <BarChart width={700} height={340} data={dashBoardData.chartData}>
                <XAxis dataKey={"name"} height={60} />
                <YAxis width={40}/>
                <Tooltip />
                <Legend height={50}/>
                <Bar dataKey="Total" fill="rgba(4, 78, 146,1)" legendType='circle' barSize={15}>
                  <LabelList dataKey="Total" position="top" />
                </Bar>
                <Bar dataKey="Closed" fill="rgb(89, 166, 66)" legendType='circle' barSize={15} >
                  <LabelList dataKey="Closed" position="top" />
                </Bar>
              </BarChart>
            </div>
            <div className='chartWrapper1'>
              <BarChart width={300} height={340} data={dashBoardData.chartData}>
                <XAxis dataKey={"name"} height={60} />
                <YAxis width={30} />
                <Tooltip />
                <Legend height={70} />
                <Bar dataKey="Total" fill="rgba(4, 78, 146,1)" legendType='circle' barSize={10}>
                  <LabelList dataKey="Total" position="top" />
                </Bar>
                <Bar dataKey="Closed" fill="rgb(89, 166, 66)" legendType='circle' barSize={10} >
                  <LabelList dataKey="Closed" position="top" />
                </Bar>
              </BarChart>
            </div>
          </> :
          <></>
      }
    </>
  )
}
