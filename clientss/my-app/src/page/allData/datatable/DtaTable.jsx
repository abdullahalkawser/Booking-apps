import React from 'react'
import { Link } from 'react-router-dom'

const DtaTable = ({ dta }) => {
  console.log(dta.image.imageUrl)




  return (
    <div>

      <div className='flex border rounded-2xl border-slate-500 p-5 mb-7 '>
        <div className='mr-10 w-4/12'>

          <img className='w-full h-full rounded-lg' src={dta.image.imageUrl[1]} alt="" />
        
        </div>
        <div className='space-y-2 mt-20'>
          <h2 className='text-3xl font-semibold text-blue-600'>{dta.carName}</h2>
          <p className='text-lg font-serif'>{dta.countery}</p>
          <p className=' text-center bg-green-500 text-gray-50 border rounded-lg w-40 font-semibold'>{dta.location}</p>
         
          <h3>{dta.seat} seater  </h3>
       
     
          <p className='text-slate-500'>Free Cancelation</p>

        </div>

        <div className='ml-40  mt-20'>
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