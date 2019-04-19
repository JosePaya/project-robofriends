import React from 'react'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import './App.css'
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary'

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
        const { robots, searchField } = this.state;
        const filteredRobots = robots.filter(robot => {
            // return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        });

        if (!robots.length) {
            return <h1 className="tc f2">Loading robots...</h1>
        } else {
            return (
                <div className='tc'>
                    <h1 className="f1 fl w-100 ma10">Robofriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        {/* Error handler wrapping the list of cards */}
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;