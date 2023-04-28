import React, { useState, useEffect } from "react";
import mqtt from "mqtt";

interface Props {
  isConnected: boolean;
}

const Messaging: React.FC<Props> = ({ isConnected }) => {
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [incomingMessages, setIncomingMessages] = useState<string[]>([]);

  const client = mqtt.connect("mqtt://test.mosquitto.org");

  useEffect(() => {
    if (isConnected) {
      client.subscribe(topic);
    }
  }, [client, topic, isConnected]);

  useEffect(() => {
    client.on("message", (topic, message) => {
      setIncomingMessages((prevMessages) => [
        ...prevMessages,
        message.toString(),
      ]);
    });
  }, [client]);

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    client.publish(topic, message);
    setMessage("");
  };

  return (
    <>
      <div>
        <label htmlFor="topic">Topic:</label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={handleTopicChange}
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <input
          id="message"
          type="text"
          value={message}
          onChange={handleMessageChange}
        />
      </div>
      <button onClick={handleSendMessage}>Send</button>
      <div>
        <h3>Publish Messages:</h3>
        <ul>
          {incomingMessages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Messaging;
