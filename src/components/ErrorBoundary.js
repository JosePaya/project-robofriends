import React from 'react'

class ErrorBoundary extends React.Component {
    constructor() {
        super();
        this.state = {
            hasError: false,
            errorDescription: ''
        }
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true, errorDescription: info })
    }

    render() {
        return this.state.hasError ?
            <h1>Something went wrong</h1> :
            this.props.children;
    }
}

export default ErrorBoundary;