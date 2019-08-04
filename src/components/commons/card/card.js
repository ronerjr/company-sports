import React from 'react';
import './card.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Card extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <span className="title">{this.props.title}</span>
                <div className="content">
                    <FontAwesomeIcon icon={this.props.icon}></FontAwesomeIcon>
                    <span>{this.props.content}</span>
                </div>
            </div>
        )
    }
}

export default Card;