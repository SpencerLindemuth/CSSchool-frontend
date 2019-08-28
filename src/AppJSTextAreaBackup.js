import React from 'react';
import logo from './logo.svg';
import stylesheet from './App.css';
import ReactMarkdown from 'react-markdown'

export default class App extends React.Component{

  //<p>.button &#123;</p>, <p>&nbsp; &nbsp;background-color: white;</p>

  state = {
    //codeBlock: '.body {\n\n\t  background-color: white;',
    lessonDirections: "Uh Oh! Looks like our button got lost in a blizzard! Let's try giving him a brighter color jacket to stand out in the storm!",
    inputRule: "#actionView {\n\t  background-color: white\n}",
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
    if(event.target.value.length === 0){
      sheet.deleteRule(sheet.cssRules.length-1)
      //console.log(sheet)
    }else{
      if(sheet.cssRules.length !== this.state.styleSheetLength){
        sheet.deleteRule(sheet.cssRules.length-1)
      }
      let parsedString = this.state.inputRule.replace(/\s/g, "")
      let parsedArray = parsedString.split("")
      try{
        for (let i = 0; i < parsedArray.length; i++) {
          let index = parsedArray.indexOf("}")
          let rule = parsedArray.splice(0, index+1)
          let parsedRule = rule.join("")
          console.log(parsedRule)
          sheet.insertRule(parsedRule, sheet.cssRules.length);

        }
      }
      catch(error){
        console.log(error)
      }
    }
  }

  handleNextLevel = () => {
    if(!this.state.buttonBlocked){
      alert("你赢了,天才")
    }
  }

  blockTab = (e) => {
    let keyCode = e.keyCode || e.which;

    if (keyCode == 9) {
      let textArea = e.target
      let caret = textArea.selectionStart
      let tabbedString = this.state.inputRule.slice(0, caret)
      console.log(tabbedString)
      this.setState({
        inputRule: tabbedString + '\t' + this.state.inputRule.slice(caret)
      })
      this.setCursorAferTab(caret)
      e.preventDefault();
    }
  }

  setCursorAferTab = (position) => {
    let box = document.getElementById("answerbox")
    setTimeout(() => {
      box.focus()
      box.setSelectionRange(position + 1, position + 1)
    }, 0)
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
            <textarea value={this.state.inputRule} id="answerbox" onKeyDown={this.blockTab} onChange={this.handleChange}></textarea>
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
