import React, { Component } from 'react'


class ChatInput extends Component {
    state = {
        message: '',
    };
    clearInput = ()=>{
        this.setState({ message: '' })
    };
    render() {
        return (
            <form
                action="."
                onSubmit={e => {
                    e.preventDefault()
                    this.props.onSubmitMessage(this.state.message)
                    this.setState({ message: '' })
                }}
            >
                <input type="text" className="write_msg" placeholder="Type a message" value={this.state.message}
                       onChange={e => this.setState({ message: e.target.value })}/>
                <button className="msg_send_btn" type="submit"><i className="fa fa-paper-plane-o"
                                                                  aria-hidden="true"/></button>
            </form>
        )
    }
}

export default ChatInput