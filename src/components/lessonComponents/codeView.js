import React from 'react'
import ReactMarkdown from 'react-markdown'

export default class CodeView extends React.Component {


    render(){
        return(
            <div id="codeview" className="game">
                <ReactMarkdown source={this.props.code} escapeHtml={false} />
            </div>
        )
    }

}