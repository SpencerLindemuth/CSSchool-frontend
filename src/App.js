import React from 'react';
import logo from './logo.svg';
import stylesheet from './App.css';
import ReactMarkdown from 'react-markdown'
import LoginForm from './components/LoginForm'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import { createBrowserHistory } from 'history';
import Dashboard from './components/Dashboard'
import WelcomeScreen from './components/WelcomeScreen'


export default class App extends React.Component{

  render(){
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Route exact path="/" component={WelcomeScreen} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Router>
      </div>
    );
  }

}
