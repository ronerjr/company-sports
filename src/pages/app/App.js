import React from 'react';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolleyballBall, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import BreadCrumb from '../../components/breadcrumb/breadcrumb';
import Summary from '../../components/summary/summary';
import Users from '../../components/users/users';
import Register from '../../components/register/register';

function App() {
  return (
    <div>
      <div className="top">
        <div className="left">
          <FontAwesomeIcon icon={faVolleyballBall}></FontAwesomeIcon>
          <span>Company Sports</span>
        </div>
        <div className="right">
          <span className="circle">RJ</span>
          <span>Roner Junior</span>
          <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
        </div>
      </div>
      <BreadCrumb></BreadCrumb>
      <Summary></Summary>
      <Users></Users>
      <Register></Register>
    </div>
  );
}

export default App;
