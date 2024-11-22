import { useState, useContext } from "react";
import UserContext from "../context/UserContext";

// send data
function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ userName, password });
  };

  return (
    <div>
      <h2>Login Page</h2>
      <input
        type="text"
        value={userName}
        placeholder="username"
        onChange={(e) => setUserName(e.target.value)}
      ></input>
      <input
        type="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>

      <button onClick={handleSubmit}> Submit</button>
    </div>
  );
}

export default Login;
