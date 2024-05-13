import React from 'react'
import { Link } from 'react-router-dom'

const DtaTable = ({ dta }) => {
  console.log(dta)




  return (
    <div>

      <div className='flex border rounded-2xl border-slate-500 p-5 mb-7 '>
        <div className='space-y-2 '>
          <h2 className='text-3xl font-semibold text-blue-600'>{dta.carName}</h2>
          <p className='text-lg font-serif'>{dta.countery}</p>
          <p className=' text-center bg-green-500 text-gray-50 border rounded-lg w-40 font-semibold'>{dta.location}</p>
         
          <h3>{dta.seat} seater  </h3>
       
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae numquam soluta labore odio <br /> possimus minus quidem sapiente reiciendis placeat mollitia dolor tempore praesentium quos accusamus libero, qui debitis incidunt. Distinctio?</p>
          
          <p className='text-slate-500'>Free Cancelation</p>

        </div>

        <div className='ml-40'>
          {/* 
                constent */}

          <h2 >Excellant <span><p>{dta.
            ratings}</p></span></h2>
          <div className='mt-16'>
            <p > {dta.price}</p>
            <p>includes taxt and fees</p>
            <Link to={`/details/${dta._id}`}>

           <button className='btn btn-primary text-white'> See Availability</button></Link>

          </div>


        </div>


      </div>

    </div>
  )
}

export default DtaTable