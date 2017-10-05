import React, {Component} from 'react';
// import dotenv from 'dotenv';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        id: "",
        name: "Anonymous",
        colour: ""
      },
      messages: [],
      connectedUserCount: 1
    };
  }

  componentWillMount() {
    this.webSocket = new WebSocket("ws://localhost:3001");

    this.webSocket.onopen = () => {
      console.log("Connected to server")
      this.webSocket.send(JSON.stringify({
        type: "postNewUser",
        content: this.state.currentUser
      }));
    }

  }

  componentDidMount() {
    this.webSocket.onmessage = this.handleNewMessageFromServer;
  }

  render() {
    return (
      <div>
        <NavBar
          connectedUserCount={this.state.connectedUserCount}
        />
        <MessageList
          messages={this.state.messages}
        />
        <ChatBar
          currentUser={this.state.currentUser}
          onSubmitMessage={this.handleNewMessage}
          onChangeUser={this.handleChangeUser}
        />
      </div>
    );
  }

  handleNewMessage = (message) => {
    this.webSocket.send(JSON.stringify({
      type: "postMessage",
      userId: this.state.currentUser.id,
      username: this.state.currentUser.name,
      content: message
    }));
  }

  handleNewMessageFromServer = (event) => {
    const message = JSON.parse(event.data);

    switch(message.type) {
      case "incomingMessage":
        this.setState({
          messages: [...this.state.messages, message]
        });
        break;

      case "incomingNotification":
      this.setState({
          messages: [...this.state.messages, message]
        });
        break;

      case "incomingUserConnectionCount":
        this.setState({ connectedUserCount: message.content});
        break;

      case "incomingNewUser":
        this.setState({ currentUser: message.content })
        break;

      default:
        throw new Error("Unknown event type", newMessage.type);
    }

  }

  handleChangeUser = (username) => {
    // still need to update server with new username!!!
    let newUser = this.state
    const message = `${this.state.currentUser.name} changed their name to ${username}`;
    this.webSocket.send(JSON.stringify({
      type: "postNotification",
      username: this.state.currentUser.name,
      content: message
    }));
    this.setState({
      currentUser: {
        id: this.state.currentUser.id,
        name: username,
        colour: this.state.currentUser.colour
      }
    });
  }
}

export default App;
