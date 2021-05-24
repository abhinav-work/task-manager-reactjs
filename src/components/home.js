import logo from '../logo.svg';
import React, { Component } from 'react';
class Home extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
        )
    }
}

export default Home;