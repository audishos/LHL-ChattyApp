import React, { Component } from 'react';

const imageRegex = /\bhttps?:\/\/\S+\.\S+\/\S+\.(jpg|png|gif)\b/i;

class Message extends Component {
  render() {
    if (this.props.content.match(imageRegex)) { //contains an image
      return (
        <div className='message'>
          <span className='message-username' style={{color: this.props.colour}}>{this.props.username}</span>
          <span className='message-content'>
            {this.props.content.replace(imageRegex, '')}
            <br />
            <img className='message-image' src={this.props.content.match(imageRegex)[0]}></img>
          </span>
        </div>
      );
    } else {
      return (
        <div className='message'>
          <span className='message-username' style={{color: this.props.colour}}>{this.props.username}</span>
          <span className='message-content'>{this.props.content}</span>
        </div>
      );
    }
  }
}

export default Message;
