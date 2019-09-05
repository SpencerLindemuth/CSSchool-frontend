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
import Modal from './components/appComponents/Modal'


const LESSON_URL = "http://localhost:3000/api/lessons"
export default class App extends React.Component{



  state={
    lessons: [],
    modalStatus: "hidden"
  }

  openModal = () => {
    this.setState({
      modalStatus: "modal"
    })
  }

  closeModal = (ev) => {
    let outer = document.getElementById("modalBackground")
    let closeButton = document.getElementById("modalclose")
      if(ev.target === outer || ev.target === closeButton){
      this.setState({
        modalStatus: "hidden"
      })
    }
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
        <Modal switchClass={this.state.modalStatus} closeModal={this.closeModal}/>
        <Router>
          <Route exact path="/" render={(props) => <WelcomeScreen {...props} openModal={this.openModal}/>} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/lesson" render={(props) => <Lesson {...props} lessons={this.state.lessons} openModal={this.openModal}/>} />
          <Route path="/createlesson" render={(props) => <CreateLesson {...props} updateLessons={this.getLessons} openModal={this.openModal}/>} />
        </Router>
      </div>
    );
  }

  componentDidMount = () => {
    if(this.state.lessons.length === 0){
      this.getLessons()}
    if(this.props.location && this.props.location.state.update){
      this.getLessons()
      this.props.history.push(`lessons/${this.props.location.state.lessonId}`)
    }
  }

}
