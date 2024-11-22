import Login from "./components/Login"
import Profile from "./components/Profile"
import UserContextProvider from "./context/UserContextProvider"

function App() {
  return (

 <UserContextProvider>
  <div>react context based</div>
       <Login/>
      <Profile/>
      
 </UserContextProvider>

  )
}

export default App