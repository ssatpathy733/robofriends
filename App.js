import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox.js';
import Scroll from '../components/Scroll';
// import { robots } from './robots';
import { render } from '@testing-library/react';
import './App.css';
import ErrorBoundry from '../components/ErrorBoundry.';

class App extends Component{
    constructor() {
        super()
        this.state = {
                robots: [],
                searchField: ''
            }
        }

componentDidMount() {
    debugger;
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response=> {
        return response.json();
    })
    .then(users => {
        this.setState({ robots: users }) 
    });
}

onSearchChange = (event) => {
    this.setState({searchField: event.target.value})
}

    render() {
        const {robots, searchField} = this.state;
        const filteredRobots = robots.filter(robots => {
            return robots.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return !robots.length ?
        <h1>Loading</h1>:
        (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        )};
    }


export default App;