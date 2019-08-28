import React from 'react';
import logo from './logo.svg';
import stylesheet from './App.css';
import ReactMarkdown from 'react-markdown'

export default class App extends React.Component{

  //<p>.button &#123;</p>, <p>&nbsp; &nbsp;background-color: white;</p>

  state = {
    codeBlock: '.body {\n\n\t  background-color: white;',
    lessonDirections: "Uh Oh! Looks like our button got lost in a blizzard! Let's try giving him a brighter color jacket to stand out in the storm!",
    inputRule: "",
    buttonBlocked: true,
    styleSheetLength: 0
  }

  handleClick = (ev) => {
    if(ev.target.value === "blue"){
      let target = document.getElementById("activeTarget")
      target.style = "margin-bottom: 0px;"
    }
    else if(ev.target.value === "red"){
      let target = document.getElementById("activeTarget")
      target.style.color = "red"
    }
  }

  handleChange = (ev) => {
    let event = ev
    this.setState({
      inputRule: ev.target.value,
      buttonBlocked: false
    })
    this.handleStyle(event)
  }

  handleStyle = (event) => {
    // let button = document.getElementById("nextlevel")
    // button.style = this.state.inputRule
    let sheet = window.document.styleSheets[0];
    console.log(event.target.value.length)
    if(event.target.value.length === 0){
      sheet.deleteRule(sheet.cssRules.length-1)
      //console.log(sheet)
    }else{
      if(sheet.cssRules.length !== this.state.styleSheetLength){
        console.log("ZERO", sheet.cssRules.length)
        sheet.deleteRule(sheet.cssRules.length-1)
      }
      sheet.insertRule(`#nextlevel{${this.state.inputRule}}`, sheet.cssRules.length);
      //console.log(sheet)
    }
  }

  handleNextLevel = () => {
    if(!this.state.buttonBlocked){
      alert("你赢了,天才")
    }
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
        <span>{this.state.lessonDirections}</span>
        <br />
        <div id="gamescreen">
          <div className="game" id="code">
            <div id="css">
            <ReactMarkdown source={this.state.codeBlock}/>
            &nbsp; &nbsp;<input value={this.state.inputRule} id="answerbox" onChange={this.handleChange}></input>
            <p>&#125;</p>
            </div>
          </div>
          <div className="game" id="actionView">
            <button onClick={this.handleNextLevel} id="nextlevel">Next Level</button>
          </div>
        </div>
        <div className="test">
        </div>
        </header>
      </div>
    );
  }

  componentDidMount = () => {
    this.setState({
      styleSheetLength: window.document.styleSheets[0].cssRules.length
    })
  }
}
