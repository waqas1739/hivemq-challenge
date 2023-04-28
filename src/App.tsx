import React, { useState } from "react";
import Form from "./components/Form";
import MessageList from "./components/MessageList";
import Messaging from "./components/Messaging";
import mqtt from "mqtt";


const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const handleConnect = (hostname: string, username: string, password: string) => {
    // Connect to MQTT broker and set isConnected to true
    setIsConnected(true);

    // Subscribe to a topic and listen for incoming messages
    // Replace the hostname, username, and password with actual values
    const client = mqtt.connect({
      protocol: "wss",
      hostname: hostname,
      port: 8884,
      path: "/mqtt",
      username: username,
      password: password,
    });

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
    });

    client.on("message", (topic, message) => {
      setMessages((prevMessages) => [...prevMessages, message.toString()]);
    });
  };

  return (
    <>
      <Form onConnect={handleConnect} />

      {isConnected && <Messaging isConnected={isConnected} />}

      {messages.length > 0 && <MessageList messages={messages} />}
    </>
  );
};

export default App;
