
import { useContext } from "react";
import UserContext from "../context/UserContext";

//receive data

function Profile() {
  const {user}  = useContext(UserContext)

  if (!user) return <div>Please login</div>;
  return <div> welcome {user.userName}</div>;
}

export default Profile

