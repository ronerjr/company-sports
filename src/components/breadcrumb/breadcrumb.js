import React from 'react';
import './breadcrumb.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';

class BreadCrumb extends React.Component {
    render() {
        return (
            <div className="breadcrumb-area">
                <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                <span className="routes route">Page Name</span>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                <span className="routes route">BreadCrumb</span>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                <span className="routes">Current page</span>
            </div>
        )
    }
}

export default BreadCrumb;