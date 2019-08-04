import React from 'react';
import './summary.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPuzzlePiece, faTrophy, faMapSigns } from '@fortawesome/free-solid-svg-icons';

class Summary extends React.Component {
    render() {
        return (
            <div className="summary-area">
                <div className="category">
                    <FontAwesomeIcon icon={faPuzzlePiece}></FontAwesomeIcon>
                    <div className="description">
                        <span className="title">Sport Type</span>
                        <span className="data"><b>Cycling</b></span>
                    </div>
                </div>
                <div className="category">
                    <FontAwesomeIcon icon={faTrophy}></FontAwesomeIcon>
                    <div className="description">
                        <span className="title">Mode</span>
                        <span className="data"><b>Advanced</b></span>
                    </div>
                </div>
                <div className="category">
                    <FontAwesomeIcon icon={faMapSigns}></FontAwesomeIcon>
                    <div className="description">
                        <span className="title">Route</span>
                        <span className="data"><b>30 miles</b></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Summary;