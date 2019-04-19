import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import { connect } from 'react-redux';
import { setSearchField } from '../actions'

const mapStateToProps = state => {
    return { searchField: state.searchField };
}

const mapDispatchtoProps = dispatch => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends React.Component {
    
    constructor() {
        super()
        this.state = {
            robots: []
        }
    }

    componentDidMount() {
        // We populate the robots array with fake data using external API
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }));
    }

    render() {
        // Render the filtered version of the robots array
        const { robots } = this.state;
        const { searchField, onSearchChange } = this.props;
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
                    <SearchBox searchChange={onSearchChange}/>
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

export default connect(mapStateToProps, mapDispatchtoProps)(App);