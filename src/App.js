import React from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import './App.css';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      channels: [],
      messages:[],
      selectedChannel:''
    }
  }
  clearInput = ()=>{

  };
  async componentDidMount() {
    const response = await fetch(`http://localhost:8080/channels`);
    const json = await response.json();
    this.setState({ channels: json });
    console.log(json);
  }
  async onClickChannel(channel){
    const response = await fetch(`http://localhost:8080/messages/${channel}`);
    const json = await response.json();
    this.setState({ messages: json ,selectedChannel:channel});
    console.log(json);
  }
  noMessagesLayout =()=>{
    return(
        <img src="https://cdn.dribbble.com/users/1275019/screenshots/3762906/no_message.png" alt=""/>
    )
  };
  addMessage = message =>
      this.setState(state => ({ messages: [...state.messages,message] }))

   submitMessage = async (messageString)=> {
    if(messageString.length!==0 && this.state.selectedChannel!==''){
      const message = { message: messageString,channel:this.state.selectedChannel};
      await fetch(`http://localhost:8080/sent`, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.addMessage(messageString);
    }else{
      alert("Enter message/channel")
    }
  };
  render() {
    let no_msg = null;
    if(this.state.messages.length===0){
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

                  {this.state.channels.map((value, index) =>
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
                 {this.state.messages.map((message, index) =>
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

export default App;
