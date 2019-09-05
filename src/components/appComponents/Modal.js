import React from 'react'
import LoginForm from '../LoginForm';

export default class Modal extends React.Component {

    render() {
        return (
            <div className={this.props.switchClass} id="modalBackground" onClick={this.props.closeModal}>
                <div id="showModal" className="showModal">
                    <button id="modalclose" onClick={this.props.closeModal}>X</button>
                    <LoginForm />
                </div>
            </div>
        )
    }
}