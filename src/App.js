import React from 'react';
import CardList from './CardList'
import Title from './Title'
import SearchBox from './SearchBox'

class App extends React.Component {
    
    constructor() {
        super()
        this.state = {
            robots: [],
            searchField: '' 
        }
    }

    componentDidMount() {
        // We populate the robots array with fake data using external API
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }));
    }

    // Events that bubble up from the SearchBox component
    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value });
    }

    render() {
        
        // Render the filtered version of the robots array
        const filteredRobots = this.state.robots.filter(robot => {
            // return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
            return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
        });

        return (
            <div className='tc'>
                <Title/>
                <SearchBox searchChange={this.onSearchChange}/>
                <CardList robots={filteredRobots}/>
            </div>
        );
    }
}

export default App;