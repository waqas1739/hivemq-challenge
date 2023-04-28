import React from 'react';

interface Props {
  messages: string[];
}

const MessageList: React.FC<Props> = ({ messages }) => {
  return (
    <ul>
      {messages.map((message, index) => (
        <li key={index}>{message}</li>
      ))}
    </ul>
  );
};

export default MessageList;
