// Application entrypoint.

// Load up the application styles
require('../styles/application.scss');

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';

ReactDOM.render(<MessageList />, document.getElementById('message-list'));
ReactDOM.render(<Message />, document.getElementById('messages'));
ReactDOM.render(<ChatBar />, document.getElementById('chat-bar'));
