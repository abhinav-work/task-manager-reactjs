import './App.css';
import Navbar from './components/navbar';
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterFile from './router';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authentication: "",
      username: ""
    }
  }
 
  addAuthentication = (token, username) => {
    this.setState(prevState => ({
      authentication: token,
      username,
    }))
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar authentication={this.state.authentication} username={this.state.username}/>
          <RouterFile addAuthentication={this.addAuthentication} authentication={this.state.authentication}/>
        </Router>
      </div>
    );
  }
}

export default App;
