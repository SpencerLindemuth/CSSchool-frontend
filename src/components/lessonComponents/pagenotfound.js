import React from 'react'

export default class PageNotFound extends React.Component {

    render(){
        return(
            <div>
                <h1>This doesn't seem to be a valid lesson. Click below to start from the beginning.</h1>
                <button onClick={() => {
                    this.props.history.push("/lesson/1")
                    }
                }>Start new course!</button>
            </div>
        )
    }
}