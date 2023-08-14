import React, { useState } from 'react'
import '../../CSS/Userwindow.css'
import CreateProject from './CreateProject'
import Dashboard from './Dashboard'
import ListingPage from './ListingPage'
export default function UserWindow() {

  const [tabStatus, setTabStatus] = useState('listingProjects');

  return (
    <>
      <div className='userOptions'>
        <img src='../IMAGES/Dashboard.svg' id='dashInactive' className='optionInactive' alt='Not' onClick={(e) => { setTabStatus('Dashboard') }}></img>
        <img src='../IMAGES/Project-list.svg' id='listInactive' className='optionInactive' alt='Not' onClick={(e) => { setTabStatus('listingProjects') }}></img>
        <div id='divideOpt'></div>
        <img src='../IMAGES/create-project.svg' id='addInactive' className='optionInactive' alt='Not' onClick={(e) => { setTabStatus('createProject') }}></img>
        {
          tabStatus === 'Dashboard' ?
            <img src='../IMAGES/Dashboard-active.svg' id='dashInactive' className='optionInactive' alt='Not'></img> :
            <></>
        }
        {
          tabStatus === 'createProject' ?
            <img src='../IMAGES/create-project-active.svg' id='addInactive' className='optionInactive' alt='Not'></img> :
            <></>
        }
        {
          tabStatus === 'listingProjects' ?
            <img src='../IMAGES/Project-list-active.svg' id='listInactive' className='optionInactive' alt='Not'></img> :
            <></>
        }
      </div>
      <div className='userWindow'>
        <img src='../IMAGES/Header-bg.svg' alt='Not' className='userWindowHeadImg'></img>
        <img src='../IMAGES/Logo.svg' alt='Not' className='userWindowLogo'></img>
        <div className='userDataSubWindow'>
          {
            tabStatus === 'createProject' ?
              <CreateProject setTabStatus={setTabStatus} /> :
              <></>
          }
          {
            tabStatus === 'Dashboard' ?
              <Dashboard /> :
              <></>
          }
          {
            tabStatus === 'listingProjects' ?
              <ListingPage /> :
              <></>
          }
        </div>
      </div>
    </>
  )
}
