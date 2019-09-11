import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

export default class CodeView extends React.Component {

    stripEscapes = () => {
        console.log(this.props.code)
        let x = String.raw`${this.props.code}`
        let y = x.replace("\\n", "\n" )
        let z = y.replace("\\v", "\v")
        return z.replace("\\t", "\t")
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