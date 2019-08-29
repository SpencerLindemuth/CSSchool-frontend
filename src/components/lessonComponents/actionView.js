import React from 'react'
import ReactMarkdown from 'react-markdown'

export default class ActionView extends React.Component {


    applyCss = () => {
        let css = this.props.css.replace(/\s/g, "")
        let sheet = window.document.styleSheets[0];
        let parsedArray = css.split("")
        try{
            for (let i = 0; i < parsedArray.length; i++) {
              let index = parsedArray.indexOf("}")
              let rule = parsedArray.splice(0, index+1)
              let parsedRule = rule.join("")
              sheet.insertRule(parsedRule, sheet.cssRules.length);
    
            }
          }
          catch(error){
            console.log(error)
          }
    }

    getNextLevelButton = () => {
        let button = document.getElementById("nextlevelbutton")
        if(button){
            button.addEventListener("click", () => {
                this.props.handleNextClick()
            })
        }
    }

    render(){
        return(
            <div className="game" id="actionview">
                <ReactMarkdown source={this.props.html} escapeHtml={false} />
            </div>
        )
    }

    componentDidMount = () => {
        this.applyCss()
        this.getNextLevelButton()
    }

}