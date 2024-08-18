import React, { useEffect, useState } from 'react'
import './form.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {
  const [username,setUsername] = useState("")
  const [userInfo,setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')))

  const navigate = useNavigate()

  const Login = (async(e)=>{
    e.preventDefault()
    await axios.post('https://render-express-cm89.onrender.com/api/v1/Login',{
      username : username
    }).then((res)=>{
      localStorage.setItem('userInfo',JSON.stringify(res.data))
      toast.error(res.data?.message)
      navigate('/')
    }).catch((error)=>{
      console.log(error);
    })
  })

  useEffect(()=>{
    if(userInfo?.token){
      navigate('/')
    }
  },[])
  return (
    <div className="navbar">
     <div className="container">
        <div className="form-login">
          <form onSubmit={Login} action="">
            <h1>Login</h1>
            <div className="input">
            <input value={username} type="text" placeholder='username' onChange={(e)=>setUsername(e.target.value)}  />
              <button type='submit'>Login</button>
            </div>
          </form>
          <Link to={'/register'}>
          <p>Register</p>
          </Link>
        </div>
        </div>
    </div>
  )
}

export default Login
