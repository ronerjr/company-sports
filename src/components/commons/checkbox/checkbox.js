import React from 'react';
import './checkbox.scss';

class Checkbox extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        this.props.callback({ value: event.target.value, isChecked: event.target.checked })
    }

    render() {
        return (
            <label className="checkbox-container">
                <input type="checkbox" value={this.props.value} onChange={this.handleChange} />
                <span className="checkmark"></span>
                <span className="label">{this.props.label}</span>
            </label>
        )
    }
}

export default Checkbox;