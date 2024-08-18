import React from 'react'

function Nofif({userById}) {


  return (
    <div style={{gap:'15px'}} className='card'>
     {userById.notifications?.map(notif=>{
      return(
        <p key={notif._id} id='nitifP'> User-Id : {notif?.idSendMony} send you amount : <span >{notif?.ment} $</span> </p>
      )
     })},
    </div> 
  )
}

export default Nofif
