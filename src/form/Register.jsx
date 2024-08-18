import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'

function Register() {
  const [username,setUsername] = useState("")
  const navigate = useNavigate()
  const createAcount = (async(e)=>{
    e.preventDefault()
      await axios.post('https://render-express-cm89.onrender.com/api/v1/register',{
        username : username
      }).then((res)=>{
        toast.success('account is creacted')
        console.log(res.data.message || res.data.user);
        setTimeout(()=>{
          navigate('/login')
        },2000)
      }).catch((error)=>{
        console.log(error);
      })

  })
  return (
    <div className="navbar">
     <div className="container">
        <div className="form-login">
          <form onSubmit={createAcount} action="">
            <h1>Register</h1>
            <div className="input">
              <input value={username} type="text" placeholder='username' onChange={(e)=>setUsername(e.target.value)}  />
              <button type='submit'>Create account</button>
            </div>
          </form>
          <Link to={'/login'}>
          <p>Login</p>
          </Link>
        </div>
        </div>
    </div>
  )
}

export default Register
