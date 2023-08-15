import React, { useEffect, useState } from 'react'
import '../../CSS/ProjectList.css'
import axios from 'axios'
export default function ListingPage() {

  const updateProjectStatusApi = 'http://localhost:8000/Project/UpdateProject';

  const getAllProjectsApi = 'http://localhost:8000/Project/Allprojects';
  
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const [projectList, setProjectList] = useState([]);

  const userId = JSON.parse(localStorage.getItem('userId'));

  const projectPerPage = 7;
  const pages = Math.ceil(projectList.length / projectPerPage);
  const [start, setStart] = useState(0);
  const end = start + projectPerPage;

  const updateStatus = (e) => {
    let status = '';
    if (e.target.value === 'Start')
      status = 'Running';
    else if (e.target.value === 'Close')
      status = 'Closed';
    else if (e.target.value === 'Cancel')
      status = 'Cancelled';
    axios.post(updateProjectStatusApi, {
      status: status,
      projectId: e.target.parentElement.id
    })
      .then((response) => {
        if (response.data.success)
          getProjectList();
      })
      .catch((error) => {
      console.log(error.message)
    })

  }

  const getProjectList = () => {
    axios.post(getAllProjectsApi, {
      userId: userId
    })
      .then((response) => {
        if (response.data.success)
          setProjectList(response.data.projectList.reverse())
      })
      .catch((error) => {
      console.log(error.message)
    })
  }

  useEffect(() => {
    getProjectList();
  }, [])
  
  const [pageArray, setPageArray] = useState([]);
  const getPages = () => {
    for (let i = 1; i < pages + 1; i++)
      setPageArray(prev=>[...prev,i])    
  }

  const setCurrentPage = (e) => {
    e.preventDefault();
    let prevButton = document.getElementsByClassName('selectedPageElement')[0];
    if (prevButton !== undefined)
      prevButton.setAttribute('class', 'pageElement')
    e.target.setAttribute('class','selectedPageElement')
    setStart((Number(e.target.id) - 1) * projectPerPage)
  }

  return (
    <>
      <div className='projectListHead'>
        <p id='projectH'>Project Name</p>
        <p id='projectR'>Reason</p>
        <p id='projectT'>Type</p>
        <p id='projectD'>Division</p>
        <p id='projectC'>Category</p>
        <p id='projectP'>Priority</p>
        <p id='projectDep'>Dept.</p>
        <p id='projectL'>Location</p>
        <p id='projectS'>Status</p>
      </div>
      <div className='projectListWrapper'>
      {
          projectList.length > 0 ?
            <>
              {
                projectList.slice(start,end).map((data, index) => {
                  return (
                    <div key={index} id={data._id} className='projectListElement'>
                      <p className='pleH'>{data.theme}<br></br>
                        <span>
                          {
                            
                            month[Number(String(data.startDate).slice(5, 7))] + '-' + String(data.startDate).slice(8, 10) + ', ' + String(data.startDate).slice(0, 4) + ' to ' + month[Number(String(data.endDate).slice(5, 7))] + '-' + String(data.endDate).slice(8, 10) + ', ' + String(data.endDate).slice(0, 4)
                          }
                        </span>
                      </p>
                      <p className='pleR'>{data.reason}</p>
                      <p className='pleT'>{data.type}</p>
                      <p className='pleD'>{data.division}</p>
                      <p className='pleC'>{data.category}</p>
                      <p className='pleP'>
                      {
                          data.priority === 1 ?
                            <>High</> :
                            <>
                              {
                                data.priority === 2 ?
                                  <>Medium</> :
                                  <>Low</>
                              }
                            </>
                      }</p>
                      <p className='pleDep'>{data.department}</p>
                      <p className='pleL'>{data.location}</p>
                      <p className='pleS'>{data.status}</p>
                      <input type='button' value={'Start'} className='startProjectButton' onClick={(e)=>{updateStatus(e)}}></input>
                      <input type='button' value={'Close'} className='closeProjectButton' onClick={(e) => { updateStatus(e) }}></input>
                      <input type='button' value={'Cancel'} className='cancelProjectButton' onClick={(e) => { updateStatus(e) }}></input>
                    </div>
                  )
                })
              }
            </> :
            <></>
      }
      </div>
      <div className='pageNumWrapper'>
        {
          pageArray.length > 0 ?
            <>
              {
                pageArray.map((data, index) => {
                  return (
                    data>1?
                      <p className='pageElement' key={index} id={data} onClick={(e) => { setCurrentPage(e) }}>{data}</p> :
                      <p className='selectedPageElement' key={index} id={data} onClick={(e) => { setCurrentPage(e) }}>{data}</p>
                  )
                })
              }
            </> :
            <>
              {getPages()}
            </>
        }
      </div>
    </>
  )
}
