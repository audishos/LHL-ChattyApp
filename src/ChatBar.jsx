import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentUser.name,
      content: ""
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          value={this.state.username}
          onChange={this.handleUsernameChange}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.content}
          onChange={this.handleMessageChange}
          onKeyPressCapture={this.handleSubmitMessage}
        />
      </footer>
    );
  }

  handleMessageChange = (e) => {
    this.setState({ content: e.target.value });
  }

  handleSubmitMessage = (e) => {
    if (e.charCode === 13) { // on ENTER
      this.props.onSubmitMessage(this.state);
      this.setState({ content: "" })
    }
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  }

  // handleSubmitUserName = (e) => {
  //   if (e.charCode === 13) { // on ENTER
  //     this.props.onChangeUser(this.state.username);
  //   }
  // }
}

export default ChatBar;
