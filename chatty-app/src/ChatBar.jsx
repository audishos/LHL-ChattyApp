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
          onKeyPressCapture={this.handleSubmitUserName}
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

  handleMessageChange = (event) => {
    this.setState({ content: event.target.value });
  }

  handleSubmitMessage = (event) => {
    if (event.charCode === 13) { // on ENTER
      this.props.onSubmitMessage(this.state.content);
      this.setState({ content: "" })
    }
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handleSubmitUserName = (event) => {
    if (event.charCode === 13) { // on ENTER
      this.props.onChangeUser(this.state.username);
    }
  }
}

export default ChatBar;
