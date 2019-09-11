import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

export default class CodeView extends React.Component {

    stripEscapes = () => {
        console.log(this.props.code)
        let x = String.raw`${this.props.code}`
        let y = x.split("\\n").join("\n")
        return y.split("\\t").join("\t")
    }

    render(){
        return(
            <div id="codeview" className="game">
                {console.log(this.props.code)}
                <ReactMarkdown source={this.stripEscapes()} escapeHtml={false} />
            </div>
        )
    }

}