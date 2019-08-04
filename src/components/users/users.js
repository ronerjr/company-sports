import React from 'react';
import axios from 'axios';
import './users.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { isError } from 'util';

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filtered: [],
            trashCan: undefined,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.all([axios.get('https://jsonplaceholder.typicode.com/users'),
        axios.get('https://jsonplaceholder.typicode.com/posts'),
        axios.get('https://jsonplaceholder.typicode.com/albums'),
        axios.get('https://jsonplaceholder.typicode.com/photos'),
        axios.get('http://localhost:3001/ride-in-group'),
        axios.get('http://localhost:3001/week-days')])
            .then(axios.spread((r1, r2, r3, r4, r5, r6) => {
                let users = r1.data;
                users.forEach(user => {
                    user.posts = r2.data.filter(post => post.userId === user.id);
                    user.albums = r3.data.filter(album => album.userId === user.id);
                    user.albums.forEach(album => {
                        album.photos = r4.data.filter(photo => photo.albumId === album.id);
                    });
                    user.rideInGroup = r5.data.find(ride => ride.userId === user.id);
                    user.weekDays = r6.data.find(days => days.userId === user.id);
                })
                users = [...users, ...this.findAll()];
                this.setState({ users });
            })
            );
    }

    findAll = () => {
        var values = [];
        Object.keys(localStorage).forEach(key => {
            values.push(JSON.parse(localStorage.getItem(key)));
        })
        return values;
    }

    mountLink = user => {
        if (!user.address || !user.address.geo || !user.address.geo.lat || !user.address.geo.lng) {
            return '/';
        }
        return `https://maps.google.com/?q=${user.address.geo.lat},${user.address.geo.lng}`;
    }

    countPhotos = user => {
        if(user.albums.length > 0) {
            return user.albums.map(album => album.photos.length).reduce((acc, curr) => acc += curr)
        }
        return 0;
    }

    render() {
        let users = this.state.filtered.length > 0 ? this.state.filtered : this.state.users;
        return (
            <div className="users-area">
                <div className="header">
                    <span className="title">Users</span>
                    <hr></hr>
                    <input type="text" placeholder="Filter table content" onChange={this.handleChange} className="filter"></input>
                </div>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th>City</th>
                            <th>Ride in group</th>
                            <th>Days of the week</th>
                            <th>Posts</th>
                            <th>Albums</th>
                            <th>Photos</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => <tr key={user.id} onMouseEnter={() => this.enableTrashCan(index)} onMouseLeave={() => this.disableTrashCan()}>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
                            <td><a href={user.email}>{user.email}</a></td>
                            <td><a href={user => this.mountLink(user)}>{user.address.city}</a></td>
                            <td>{user.rideInGroup.often}</td>
                            <td>{user.weekDays.days}</td>
                            <td>{user.posts.length}</td>
                            <td>{user.albums.length}</td>
                            <td>{this.countPhotos(user)}</td>
                            <td className="actions">{this.isTrashCanEnabled(index)}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    handleChange = event => {
        let filtered = [];
        if (event.target.value) {
            this.state.users.forEach(user => {
                let found = false;
                Object.keys(user).forEach(key => {
                    if (String(user[key]).toLowerCase().startsWith(event.target.value.toLowerCase())) {
                        found = true;
                    }
                });
                if (found) {
                    filtered.push(user);
                }
            });
        }
        this.setState({ filtered });
    }

    enableTrashCan = index => {
        this.setState({ trashCan: index })
    }

    disableTrashCan = () => {
        this.setState({ trashCan: undefined })
    }

    handleDelete = index => {
        let users = this.state.users.slice(0, this.state.users.length);
        users.splice(index, 1);
        this.setState({ users });
    }

    isTrashCanEnabled(index) {
        if (this.state.trashCan === index) {
            return (
                <button className="trash-button" onClick={() => this.handleDelete(index)}>
                    <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                </button>
            )
        } else {
            return undefined;
        }
    }
}

export default Users;