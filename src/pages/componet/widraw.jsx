import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'

function Widraw({userInfo,userById,socket}) {


  const [idUser,setUserId] = useState("")
  const [amount,setamount] = useState("")
  
  const [monyUserById,setmonyUserById] = useState(userById)


  const userTrim = idUser.trim()
  const amountNumber = parseFloat(amount)

  //send mony ---->
    const sendMony = (async(e)=>{
        e.preventDefault()

        const audio = document.getElementById('audioErro')
        const audio1 = document.getElementById('audio1')

        if (!/^\d+$/.test(amount)) {
          return toast.error( ' يجب إدخال أرقام فقط دون شارات ط' );
      }
      console.log("|"+userTrim+"|");

      
       await axios.post('https://render-express-cm89.onrender.com/api/v1/send',{
          from : userInfo._id,
          to : userTrim,
          ment: amountNumber
       }).then((res)=>{

        if(res.data.sendMony){
          audio1.play()
          console.log(res.data);
        }
        if(res.data.sendMony){
          socket.current.emit("send-mony",{
            from : userInfo._id,
            to : idUser,
            ment: amountNumber
          })
        }

        if(res.data.message){
          toast.error(res.data.message)
          audio.play()
        }

        if(res.data.sendMony){
          toast.success('operation accomplished successfully')
          setTimeout(()=>{
         setamount("")
            setUserId("")
          },2000)
        }


        monyUserById.mony = monyUserById.mony - amountNumber

        
       }).catch((error)=>{
        console.log(error);
       })
    })

  
  return (
    <div className='card'>
      <audio  id='audio1' src="./notifAudio.wav"></audio>
      <audio id='audioErro' src="./error.mp3"></audio>
      <form onSubmit={sendMony} action="">
          <h4>amount : <span>{monyUserById.mony}</span> $</h4>
          <p>Get client id !</p>
          <div style={{display:'flex'}}>
          <input id='inp' placeholder='Id User' value={idUser} onChange={(e)=>setUserId(e.target.value)} type="text" />
          </div>
          <input placeholder='Amount' value={amount} onChange={(e)=>setamount(e.target.value)} type="number" />
      <button id='btnWidraw' >Widraw</button>
      </form>
    </div>
  )
}

export default Widraw
