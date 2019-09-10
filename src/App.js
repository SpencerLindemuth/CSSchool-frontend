import React from 'react';
import logo from './logo.svg';
import stylesheet from './App.css';
import ReactMarkdown from 'react-markdown'
import LoginForm from './components/LoginForm'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import { createBrowserHistory } from 'history';
import WelcomeScreen from './components/WelcomeScreen'
import Lesson from './components/Lesson'
import CreateLesson from './components/CreateLesson'
import Modal from './components/appComponents/Modal'


const LESSON_URL = "http://10.137.5.116:3000/api/lessons"
export default class App extends React.Component{



  state={
    lessons: [],
    modalStatus: "hidden",
    loggedIn: false,
  }

  openModal = () => {
    this.setState({
      modalStatus: "modal"
    })
  }

  closeModal = (ev, formInput) => {
    let outer = document.getElementById("modalBackground")
    let closeButton = document.getElementById("modalclose")
    if(ev.target === outer || ev.target === closeButton || ev.which === 27 || ev.target === true){
      this.setState({
        modalStatus: "hidden",
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

  setLoginState = () => {
    this.setState({
      loggedIn: true
    })
  }

  setLogoutState = () => {
    this.setState({
      loggedIn: false
    })
  }

  render(){
    return (
      <div className="App" onKeyDown={this.closeModal}>
        <Modal switchClass={this.state.modalStatus} closeModal={this.closeModal} setLoginState={this.setLoginState}/>
        <Router>
          <Route exact path="/" render={(props) => <WelcomeScreen {...props} openModal={this.openModal} setLoginState={this.setLoginState} setLogoutState={this.setLogoutState} loggedIn={this.state.loggedIn}/>} />
          <Route path="/lesson" render={(props) => <Lesson {...props} lessons={this.state.lessons} openModal={this.openModal} setLoginState={this.setLoginState} setLogoutState={this.setLogoutState} loggedIn={this.state.loggedIn}/>} />
          <Route path="/createlesson" render={(props) => <CreateLesson {...props} updateLessons={this.getLessons} openModal={this.openModal} setLoginState={this.setLoginState} setLogoutState={this.setLogoutState} loggedIn={this.state.loggedIn}/>} />
        </Router>
      </div>
    );
  }

  componentDidMount = () => {
    if(this.state.lessons.length === 0){
      this.getLessons()}
    if(this.props.location && this.props.location.state.update){
      this.getLessons()}
    if(localStorage.getItem("jwt") !== "null")
      this.setState({
        loggedIn: true
    })
  }

}
