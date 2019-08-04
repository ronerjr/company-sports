import React from 'react';
import './register.scss'
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { faLifeRing, faSmile } from '@fortawesome/free-regular-svg-icons';
import Checkbox from '../commons/checkbox/checkbox';
import Radio from '../commons/radio-button/radio';
import Card from '../commons/card/card';
import { stringify } from 'querystring';

class Register extends React.Component {

    usersForm;

    constructor(props) {
        super(props);
        let id = Math.floor(Math.random() * 1000);
        this.state = {
            user: {
                id,
                address: {
                    city: ''
                },
                email: '',
                name: '',
                username: '',
                rideInGroup: {
                    id,
                    often: ''
                },
                weekDays: {
                    id,
                    days: []
                },
                posts: [],
                albums: [],
                photos: []
            },
            onFocus: undefined
        }
    }
    
    handleCheckbox = (day) => {
        let days = this.state.user.weekDays.days.slice(0, this.state.user.weekDays.days.length);
        if(day.isChecked) {
            days.push(day.value);
        } else {
            days.splice(days.indexOf(day.value), 1);
        }
        this.setState({ 
            user: {
                ...this.state.user,
                weekDays: {
                    ...this.state.user.weekDays,
                    days
                }
            }
        });
        
    }
    
    handleRadio = (often) => {
        this.setState({
            user: {
                ...this.state.user,
                rideInGroup: {
                    ...this.state.user.rideInGroup,
                    often: often.value
                }
            }
        })
    }
    
    handleDiscard = () => {
        this.usersForm.reset();
    }
    
    handleSave = () => {
        if(!this.usersForm.checkValidity) {
            alert("Please, fill all the fields correctly");
            return;
        }
        let user = this.state.user;
        user.weekDays.days = user.weekDays.days.join(', ');
        localStorage.setItem(user.id, JSON.stringify(user));

    }
    
    handleFocus = name => {
        this.setState({onFocus: name})
    }
    
    handleBlur = () => {
        this.setState({onFocus: undefined})
    }
    
    isFocused = (name, message) => {
        if(document.activeElement.name === name) {
            return (
                <span className="optional">{message}</span>
            )
        }
    }
    
    isChecked = value => {
        return this.state.user.rideInGroup.often === value;
    }
    
    
    handleChanges = event => {
        
        const name = event.target.name;
        const value = event.target.value;
        
        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            }
        });
    }

    render() {
        return (
            <div className="register-area">
                <div className="header">
                    <span className="title">Registration</span>
                    <hr></hr>
                </div>
                <div className="header">
                    <Card title="Need help?" icon={faLifeRing} 
                        content="Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua."></Card>
                    <Card title="Why register?" icon={faHeartbeat} 
                        content="Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua."></Card>
                    <Card title="What people are saying?" icon={faSmile} 
                        content="Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua."></Card>
                </div>
                <hr></hr>
                <div className="form-area">
                    <form ref={element => this.usersForm = element}>
                        <div className="form-field">
                            <span>Username</span>
                            <input type="text" value={this.username} name="username" className="text-input" required
                                onFocus={() => this.handleFocus('username')} onBlur={() => this.handleBlur()} onChange={this.handleChanges}/>
                            {this.isFocused('username', 'Insert a valid username here')}
                        </div>
                        <div className="form-field">
                            <div className="title">
                                <span>City</span>
                                <span className="optional">optional</span>
                            </div>
                            <input type="text" name="address.city" className="text-input" onChange={this.handleChanges}
                                onFocus={() => this.handleFocus('address.city')} onBlur={() => this.handleBlur()} />
                            {this.isFocused('address.city', 'Insert the city name where you live')}
                        </div>
                        <div className="form-field">
                            <span>Name</span>
                            <input type="text" value={this.name} name="name" className="text-input" required
                                onFocus={() => this.handleFocus('name')} onBlur={() => this.handleBlur()} onChange={this.handleChanges}/>
                            {this.isFocused('name', 'Insert your name here')}
                        </div>
                        <div className="form-field">
                            <span>Ride in group?</span>
                            <div className="radio-group">
                                <Radio label="Always" value="Always" callback={this.handleRadio} isChecked={this.isChecked('Always')}></Radio>
                                <Radio label="Sometimes" value="Sometimes" callback={this.handleRadio} isChecked={this.isChecked('Sometimes')}></Radio>
                                <Radio label="Never" value="Never" callback={this.handleRadio} isChecked={this.isChecked('Never')}></Radio>
                            </div>
                        </div>
                        <div className="form-field">
                            <span>Email</span>
                            <input type="email" name="email" className="text-input" required onChange={this.handleChanges}
                                onFocus={() => this.handleFocus('email')} onBlur={() => this.handleBlur()}
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
                            {this.isFocused('email', 'Insert your email here')}
                        </div>
                        <div className="form-field">
                            <span>Days of the week</span>
                            <div className="checkbox-group">
                                <Checkbox label="Sun" value="Sun" callback={this.handleCheckbox} />
                                <Checkbox label="Mon" value="Mon" callback={this.handleCheckbox} />
                                <Checkbox label="Tue" value="Tue" callback={this.handleCheckbox} />
                                <Checkbox label="Wed" value="Wed" callback={this.handleCheckbox} />
                                <Checkbox label="Thu" value="Thu" callback={this.handleCheckbox} />
                                <Checkbox label="Fri" value="Fri" callback={this.handleCheckbox} />
                                <Checkbox label="Sat" value="Sat" callback={this.handleCheckbox} />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="btn save" onClick={this.handleSave}>Save</button>
                            <button type="button" className="btn cancel" onClick={this.handleDiscard}>Discard</button>
                        </div>
                    </form>
                </div >
            </div>
        )
    }
}

export default Register;