import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className='messages'>
      {this.props.messages.map( (message) => {
        switch(message.type) {
          case 'incomingMessage':
            return <Message key={message.id} username={message.username} content={message.content} colour={message.colour} />

          case 'incomingNotification':
            return <Notification key={message.id} username={message.username} content={message.content} />

          default:
            throw new Error('Unknown event type:', event.data.type);
        }
      })}
      </main>
    );
  }
}

export default MessageList;
