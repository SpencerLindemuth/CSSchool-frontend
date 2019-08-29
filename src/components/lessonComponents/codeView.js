import React from 'react'

export default class CodeView extends React.Component {


    render(){
        return(
            <div id="codeview" className="game">
                {this.props.code}
            </div>
        )
    }

}