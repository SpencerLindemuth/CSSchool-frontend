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
import Lesson from './components/Lesson'
import CreateLesson from './components/CreateLesson'

const LESSON_URL = "http://localhost:3000/api/lessons"
export default class App extends React.Component{



  state={
    lessons: [],
  }

  getLessons = () => {
    fetch(LESSON_URL)
    .then(res => res.json())
    .then(data => {
      console.log("fetched")
      this.setState({
      lessons: [...data]
    })
  })}

  render(){
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={WelcomeScreen} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/lesson" render={(props) => <Lesson {...props} lessons={this.state.lessons}/>} />
          <Route path="/createlesson" component={CreateLesson} />
        </Router>
      </div>
    );
  }

  componentDidMount = () => {
    if(this.state.lessons.length === 0){
      this.getLessons()}
  }

}
