import React from 'react'
import Navbar from './Navbar'
import CodeView from './lessonComponents/codeView'
import ActionView from './lessonComponents/actionView'

export default class Lesson extends React.Component {

    state = {
        lessonView: true,
    }

    pathName = () => {
        let url = this.props.location.pathname
        let lessonNum = url.replace("/lesson/", "")
        return parseInt(lessonNum)
    }

    render(){

        const lesson = this.props.lessons[this.pathName() - 1]


        return(
            <div>
                <Navbar history={this.props.history}/>
                <span className="actionbar">
                    <span className="leftbuttons">
                        <button>&#8592; Prev</button>
                        <button id="lessonbutton">Lesson</button>
                    </span>
                    <span className="rightbuttons">
                        <button>Reset</button>
                        <button>Save</button>
                    </span>
                </span>
                <div className="helperdiv">
                    <div id="gamescreen">
                        {lesson ? <CodeView code={this.props.lessons[this.pathName() - 1].template} /> : null}
                        {lesson ? <ActionView /> : null}
                    </div>
                </div>
            </div>
        )
    }

}