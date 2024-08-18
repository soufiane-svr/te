import React, { useEffect, useRef, useState } from 'react'
import './Dashbord.css'
import Card from '../componet/card'
import Widraw from '../componet/widraw'
import Nofif from '../componet/ntification'
import axios from 'axios'
import {io} from 'socket.io-client'

function Daschbord() {

    const socket = useRef()

    

    const [newnotification,setnewnotification] = useState(false)
    const [rose,setrose] = useState(true)
    const [account,setaccount] = useState()
    const [widraw,setwidraw] = useState()
    const [deposit,setdeposit] = useState()
    const [siting,setsiting] = useState()
    const [notification,setNotifion] = useState(false)
    const [userInfo,setUserInfo] = useState(JSON.parse(localStorage.
    getItem('userInfo')))

    const [userById,setUserByid]= useState("")
    const [ment,setMont] = useState()

     useEffect(()=>{

        const audio = document.getElementById('audio')
        
        const getUserBy = async()=>{
         await axios.get(`https://render-express-cm89.onrender.com/api/v1/user/${userInfo?._id}`)
        .then((res)=>{
        setUserByid(res.data)
        
        
        socket.current.on('mony-reicive',(data)=>{
            setMont(data)
            setnewnotification(true)
            audio.play();
        })
        
    }).catch((error)=>{
            console.log(error);
        })
        }
        getUserBy()
     },[ment])   


    const accountTrue = ()=>{
        setaccount(true)
        setwidraw(false)
        setdeposit(false)
        setsiting(false)
        setrose(false)
    }
    const widrawTrue = ()=>{
        setaccount(false)
        setwidraw(true)
        setdeposit(false)
                setrose(false)

        setsiting(false)
    }
    const depositTrue = ()=>{
        setaccount(false)
        setwidraw(false)
        setdeposit(true)
        setsiting(false)
         setrose(false)

    }
    const sitingTrue = ()=>{
        setaccount(false)
        setwidraw(false)
        setdeposit(false)
        setsiting(true)
         setrose(false)

    }

    const Logout = (()=>{
        localStorage.removeItem('userInfo')
        window.location.reload()
    })

    const notificationClick = (()=>{
        setnewnotification(false)
        setNotifion(true)
    })






    //socket io
     useEffect(()=>{
        socket.current = io ('https://render-express-cm89.onrender.com')
        socket.current.emit('add-user',userInfo._id)
        return ()=>{
            socket.current.off('onlineUsers')
        }
    },[socket])


  return (
    <div className="navbar">
        <audio  id='audio' src="./notifAudio.wav"></audio>
     <div className="container">
        <div className="dashbor-left">
            <h1>{userInfo?.username} </h1>
            <div className="componant">
                <h3 title='account' onClick={accountTrue}>account</h3>
                <h3 title='widraw' onClick={widrawTrue}>widraw</h3>
                <h3 title='deposit' onClick={depositTrue}>deposit</h3>
                <h3 title='siting' onClick={sitingTrue}>siting</h3>
            </div>
            </div>
            <div className="dashbor-Right">
                {rose && 
                            <img style={{height:'70%'}} src="./rose-6870_128.gif" alt="" />
                }
               {account && <Card userInfo={userInfo}  userById={userById} />}
               {widraw && <Widraw setUserByid={setUserByid} socket={socket} userById={userById} userInfo={userInfo} />}
            </div>
            <div className="btn">
            <button onClick={notificationClick} className='btn-notification'>notification <span> {userById?.notifications?.length } </span> </button>
            <button onClick={Logout} className='btn-logout'>Logout</button>
            </div>
            {notification && <div onClick={()=>setNotifion(false)} className='notification'>
                <Nofif userById={userById} />
            </div>}
            <div>
               {newnotification && <p className='animate__heartBeat' id='new-notification'>You have a new batch</p>}
            </div>
        </div>
    </div>
  )
}

export default Daschbord
