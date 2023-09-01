import React from 'react'
import loadings from './load.gif' 

 const Spiner =()=> {
  
    return (
      <div className="text-center">
        
        <img className='my-4' src={loadings} alt="Loading..." />
        </div>
    )
  }

  export default Spiner