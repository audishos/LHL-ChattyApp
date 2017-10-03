import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: { name: "Anonymous" },
                   messages: [
                     { username: "Bob", content: "Hey there!" },
                     { username: "Jason", content: "Hello!" }
                   ]
                 };
  }

  // componentDidMount() {
  //   console.log("componentDidMount <App />");
  //   setTimeout(() => {
  //     console.log("Simulating incoming message");
  //     // Add a new message to the list of messages in the data store
  //     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
  //     const messages = this.state.messages.concat(newMessage)
  //     // Update the state of the app component.
  //     // Calling setState will trigger a call to render() in App and all child components.
  //     this.setState({messages: messages})
  //   }, 3000);
  // }

  render() {
    // more code here..
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
          onSubmitMessage={this.handleNewMessage}
        />
      </div>
    );
  }

  handleNewMessage = (message) => {
    this.setState({
      currentUser: { name: message.username },
      messages: [...this.state.messages, message]
    });
  }

  // handleChangeUser = (username) => {
  //   const message = {
  //     username: username,
  //     content: `${this.state.currentUser.name} changed their name to ${username}`
  //   };

  //   this.setState({
  //     currentUser: {name: username},
  //     messages: [...this.state.messages, message]
  //   });
  // }
}

export default App;
