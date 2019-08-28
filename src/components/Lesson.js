import React from 'react'
import Navbar from './Navbar'

export default class Lesson extends React.Component {

    pathName = () => {
        let url = this.props.location.pathname
        let lessonNum = url.replace("/lesson/", "")
        return parseInt(lessonNum)
    }

    render(){
        return(
            <div>
                <Navbar history={this.props.history}/>
                {console.log(this.pathName())}
            </div>
        )
    }

}