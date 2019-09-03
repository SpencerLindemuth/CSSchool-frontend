import React from 'react'
import Navbar from './Navbar'
import ReactMarkdown from 'react-markdown'

export default class CreateLesson extends React.Component {

    state = {
        css: "",
        lessonHtml: "",
        lessonText: "",
        lessonTemplate: "",
        button1text: "",
        button1css: "",
        button2text: "",
        button2css: "",
        button3text: "",
        button3css: "",
        button4text: "",
        button4css: "",
        styleSheetLength: 0,
        stylesAdded: 0,
    }

    lessonTextChange = (ev) => {
        this.setState({
            lessonText: ev.target.value
        })
    }

    lessonTemplateChange = (ev) => {
        this.setState({
            lessonTemplate: ev.target.value
        })
    }

    lessonHtmlChange = (ev) => {
        this.setState({
            lessonHtml: ev.target.value
        })
    }

    cssChange = (ev) => {
        this.setState({
            css: ev.target.value
        })
        this.handleStyle(ev)
    }

    handleStyle = (event) => {
        // let button = document.getElementById("nextlevel")
        // button.style = this.state.inputRule
        let sheet = window.document.styleSheets[0];
        let parsedString = this.state.css.replace(/\s/g, "")
        let parsedArray = parsedString.split("")
        let index = parsedArray.indexOf("}")
        console.log("initial", this.state.stylesAdded)
        let i = 0
        let k = 0
        while(i < this.state.stylesAdded){
            sheet.deleteRule(sheet.cssRules.length-1)
            i++
        }
        console.log("how many times i'm running", i)
        this.setState({stylesAdded: 0})
        if(index === -1){
            return null
        }else{
            let completeRules = parsedString.match(/[\s\S]+}/g)
            let rulesArray
            if(completeRules !== null){
                rulesArray = completeRules[0].split("}")
            }
            else{return null}
            let completeRulesArray = rulesArray.map(element => element + "}")
            console.log(completeRulesArray)
            let j = 0
            for(let i = 0; i < completeRulesArray.length; i++){
                if(completeRulesArray[i] !== "}")
                try{
                    sheet.insertRule(completeRulesArray[i], sheet.cssRules.length);
                    j++
                }catch(error){
                }
            }
            console.log("IVE INSERTED THIS MANY RULES: ", j)
            console.log("but my sheet is only ", sheet.cssRules.length, " enteries long...")
            this.setState((prevState) =>  {
                return {stylesAdded: prevState.stylesAdded + (j)}
            })
        }
        //let parsedRule = rules.join("")
        // if(this.state.stylesAdded !== 0){
        //     let i = 0;
        //     while(i < this.state.stylesAdded){
        //         sheet.deleteRule(sheet.cssRules.length-1)
        //         this.setState({stylesAdded: this.state.stylesAdded - 1})
        //         i++
        //     }
        //     this.setState({stylesAdded: this.state.stylesAdded - i})
        // }
        // try{
        //     for (let i = 0; i < parsedArray.length; i++) {
        //         console.log(parsedRule)
        //         sheet.insertRule(parsedRule, sheet.cssRules.length);
        //         this.setState({
        //             stylesAdded: [...this.state.stylesAdded, ...parsedRule]
        //         })
        //     }
        // }
        // catch(error){
        //     console.log()
        // }
      }

    buttonTextChange = (ev) => {
        switch(ev.target.name){
            case "1":
                this.setState({
                    button1text: ev.target.value
                })
                break
            case "2":
                this.setState({
                    button2text: ev.target.value
                }) 
                break
            case "3":
                this.setState({
                    button3text: ev.target.value
                })  
                break
            case "4":
                this.setState({
                    button4text: ev.target.value
                })
                break
            }
        }


    buttonCssChange = (ev) => {
        switch(ev.target.name){
            case "1":
                this.setState({
                    button1css: ev.target.value
                })
                break
            case "2":
                this.setState({
                    button2css: ev.target.value
                }) 
                break
            case "3":
                this.setState({
                    button3css: ev.target.value
                }) 
                break 
            case "4":
                this.setState({
                    button4css: ev.target.value
                })
                break
            }
    }

    formSubmit = (ev) => {
        ev.preventDefault()
        console.log(this.state)
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="formpagebody">
                    <div className="formwrapper">
                        <form id="createlessonform" onSubmit={this.formSubmit}>
                            <label>Lesson Directions</label>
                            <br />
                            <textarea placeholder="Text displayed in the Lesson tab written in plain text or Markdown" value={this.state.lessonText} onChange={this.lessonTextChange}/>
                            <br />
                            <br />
                            <label>Lesson CSS template</label>
                            <br />
                            <textarea placeholder="CSS template to be displayed in example box written in Markdown" value={this.state.lessonTemplate} onChange={this.lessonTemplateChange}/>
                            <br />
                            <br />
                            <label>Lesson HTML</label> 
                            <br />
                            <textarea placeholder="Raw HTML to be rendered in the puzzle box (Don't forget id's or class names)" value={this.state.lessonHtml} onChange={this.lessonHtmlChange}/>
                            <br />
                            <br />
                            <label>Applied CSS</label>
                            <br />
                            <textarea placeholder="CSS to be applied on start to the HTML written above" value={this.state.css} onChange={this.cssChange}/>
                            <br />
                            <br />
                            <label>Button 1 text</label>
                            <br />
                            <input autoComplete="OFF" name="1" placeholder="Text to be displayed on Button 1" value={this.state.button1text} onChange={this.buttonTextChange}/>
                            <br />
                            <br />
                            <label>Button 1 Action</label>
                            <br />
                            <textarea name="1" placeholder="CSS to be applied when Button 1 is pressed (Don't foget to reference id's or class names from above)" value={this.state.button1css} onChange={this.buttonCssChange}/>
                            <br />
                            <br />
                            <label>Button 2 text</label>
                            <br />
                            <input autoComplete="OFF" name="2" placeholder="Text to be displayed on Button 2" value={this.state.button2text} onChange={this.buttonTextChange}/>
                            <br />
                            <br />
                            <label>Button 2 Action</label>
                            <br />
                            <textarea name="2" placeholder="CSS to be applied when Button 2 is pressed (Don't foget to reference id's or class names from above)" value={this.state.button2css} onChange={this.buttonCssChange} />
                            <br />
                            <br />
                            <label>Button 3 text</label>
                            <br />
                            <input autoComplete="OFF" name="3" placeholder="Text to be displayed on Button 3" value={this.state.button3text} onChange={this.buttonTextChange}/>
                            <br />
                            <br />
                            <label>Button 3 Action</label>
                            <br />
                            <textarea name="3" placeholder="CSS to be applied when Button 3 is pressed (Don't foget to reference id's or class names from above)" value={this.state.button3css} onChange={this.buttonCssChange}/>
                            <br />
                            <br />
                            <label>Button 4 text</label>
                            <br />
                            <input autoComplete="OFF" name="4" placeholder="Text to be displayed on Button 4" value={this.state.button4text} onChange={this.buttonTextChange}/>
                            <br />
                            <br />
                            <label>Button 4 Action</label>
                            <br />
                            <textarea name="4" placeholder="CSS to be applied when Button 4 is pressed (Don't foget to reference id's or class names from above)" value={this.state.button4css} onChange={this.buttonCssChange}/>
                            <br />
                            <br />
                            <input type="submit" value="Create Lesson" />
                        </form>
                    </div>
                    <div id="livewrapper">
                        <div id="liveheader">Live Preview</div>
                        <div className="game" id="livepreview">
                            <ReactMarkdown source={this.state.lessonHtml} escapeHtml={false}/>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }

    componentDidMount = () => {
        this.setState({
            styleSheetLength: window.document.styleSheets[0].cssRules.length
        })
      }



}