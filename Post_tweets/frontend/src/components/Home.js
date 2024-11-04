import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div>
      <h2>Home Page</h2>

      <br>
      </br>
      <br>
      </br>
      <br>
      </br>

 <h3>click on below link to visit Post page</h3>
        <Link to="/posts"> Posts Page </Link>

    </div>
  )
}

export default Home