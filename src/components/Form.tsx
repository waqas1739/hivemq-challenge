import React, { useState } from "react";

interface Props {
  onConnect: (hostname: string, username: string, password: string) => void;
}

const Form: React.FC<Props> = ({ onConnect }) => {
  const [hostname, setHostname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleHostnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHostname(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConnect(hostname, username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="hostname">Hostname:</label>
      <input
        type="text"
        id="hostname"
        value={hostname}
        onChange={handleHostnameChange}
      />

      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={handleUsernameChange}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
      />

      <button type="submit">Connect</button>
    </form>
  );
};

export default Form;
