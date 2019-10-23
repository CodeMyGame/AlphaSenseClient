import React from 'react'
import { connect } from "react-redux";
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import '../index.css';
import { thunk_action_fetch_channels,thunk_action_fetch_messages,
    thunk_action_sent_message} from "../actions/channelAction";
class Chat extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            selectedChannel:''
        }
    }
    clearInput = ()=>{

    };
     componentDidMount() {
        this.props.dispatch(thunk_action_fetch_channels());
    }
    async onClickChannel(channel){
         this.setState({
             selectedChannel:channel
         });
        this.props.dispatch(thunk_action_fetch_messages(channel));
    }
    noMessagesLayout =()=>{
        return(
            <img src="https://cdn.dribbble.com/users/1275019/screenshots/3762906/no_message.png" alt=""/>
        )
    };


    submitMessage = async (messageString)=> {
        if(messageString.length!==0 && this.state.selectedChannel!==''){
            const message = { message: messageString,channel:this.state.selectedChannel};
            this.props.dispatch(thunk_action_sent_message(message));
        }else{
            alert("Enter message/channel")
        }
    };
    render() {
        let no_msg = null;
        if(this.props.data.messages.length===0){
            no_msg = this.noMessagesLayout();
        }
        return (
            <div className="container">
                <h3 className=" text-center">Assignment</h3><br/>
                <div className="messaging">
                    <div className="left_panel_list">
                        <div className="left_panel">
                            <div className="left_panel_text">
                                Active Channels
                            </div>
                            <div className="inbox_chat">

                                {this.props.data.channels.map((value, index) =>
                                    <div key={index} className="channel_list" style={{cursor:'pointer'}} onClick={this.onClickChannel.bind(this,value)}>
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
                                    <ChatInput
                                        onSubmitMessage={messageString => this.submitMessage(messageString)}
                                    />
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

