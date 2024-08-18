import React from 'react'

function Card({userInfo ,userById }) {



  return (
    <div className='card'>
      <h2>totale : <span>{userById?.mony} $</span>  </h2>
      <p>ID  : <span>{userInfo?._id} </span></p>
    </div>
  )
}

export default Card
