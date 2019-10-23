import React from 'react'
import { connect } from "react-redux";
import ChatMessage from './ChatMessage'
import '../index.css';
import { thunk_action_fetch_channels,thunk_action_fetch_messages,
    thunk_action_sent_message} from "../actions/channelAction";
class Chat extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selectedChannel:'',
            message:'',
            editableColor: "#c0f841",
            selected: false
        }
    }
     componentDidMount() {
        this.props.dispatch(thunk_action_fetch_channels());
    }
     onClickChannel(channel){
         this.setState({
             selectedChannel:channel,
             message:'',
         });
        this.props.dispatch(thunk_action_fetch_messages(channel));
    }
    noMessagesLayout =()=>{
        return(
            <img src="https://cdn.dribbble.com/users/1275019/screenshots/3762906/no_message.png" alt=""/>
        )
    };
    noChannelSelectedLayout =()=>{
        return(
            <h1>No channel selected</h1>
        )
    };

    submitMessage = (messageString)=> {
        if(messageString.length!==0 && this.state.selectedChannel!==''){
            const message = { message: messageString,channel:this.state.selectedChannel};
            this.props.dispatch(thunk_action_sent_message(message));
        }else{
            alert("Enter message or select channel")
        }
    };
    render() {
        let no_msg = null;
        if(this.props.data.messages.length===0){
            no_msg = this.noMessagesLayout();
        }
        if(this.state.selectedChannel===''){
            no_msg = this.noChannelSelectedLayout();
        }
        return (
            <div className="container">
                <h3 className=" text-center">Assignment</h3><br/>
                <div className="messaging">
                    <div className="left_panel_list">
                        <div className="left_panel">
                            <div className="left_panel_text">
                                <b>Active Channels</b>
                            </div>
                            <div className="inbox_chat">
                                {this.props.data.channels.map((value, index) =>
                                <div  key={index} className="channel_list a" style={{cursor:'pointer'}} onClick={this.onClickChannel.bind(this,value)}>
                                    <div className="channel_div">
                                        <div className="channel_img"><img
                                            src="https://ptetutorials.com/images/user-profile.png" alt="#"/></div>
                                        <div className="channel_text">
                                            <h5>{value}</h5>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>
                        </div>
                        <div className="mesgs">
                            <center><h3>{this.state.selectedChannel}</h3></center>
                            <div className="msg_history">{no_msg}
                                {this.props.data.messages.map((message, index) =>
                                    <ChatMessage
                                        key={index}
                                        message={message}
                                    />,
                                )}
                            </div>
                            <div className="type_msg">
                                <div className="input_msg_write">
                                    <form
                                        action=".."
                                        onSubmit={e => {
                                            e.preventDefault()
                                            this.submitMessage(this.state.message)
                                            this.setState({ message: '' })
                                        }}
                                    >
                                        <input type="text" className="write_msg" placeholder="Type a message" value={this.state.message}
                                               onChange={e => this.setState({ message: e.target.value })}/>
                                        <button className="msg_send_btn" type="submit"><i className="fa fa-paper-plane-o"
                                                                                          aria-hidden="true"/></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        data: state
    };
};
export default connect(mapStateToProps)(Chat);

