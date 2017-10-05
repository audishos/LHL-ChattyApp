import React, { Component } from 'react';

const IMAGEREGEX = /\bhttps?:\/\/\S+\.\S+\/\S+\.(jpg|png|gif)\b/i;

class Message extends Component {
  render() {
    if (this.props.content.match(IMAGEREGEX)) { //contains an image
      return (
        <div className='message'>
          <span className='message-username' style={{color: this.props.colour}}>{this.props.username}</span>
          <span className='message-content'>
            {this.props.content.replace(IMAGEREGEX, '')}
            <br />
            <img className='message-image' src={this.props.content.match(IMAGEREGEX)[0]}></img>
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
