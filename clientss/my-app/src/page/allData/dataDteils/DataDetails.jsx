import React, { useContext, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range'; // Import DateRangePicker component
import { AuthContext } from '../../../provider/Provider';
import Swal from 'sweetalert2';

const DataDetails = () => {
  const { user } = useContext(AuthContext)
  console.log(user.email)
  // Fetching data from the loader hook
  const data = useLoaderData();
  console.log(data);

  const [selectedRange, setSelectedRange] = useState({

    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  // Define handleSelect function
  const handleSelect = (ranges) => {
    setSelectedRange(ranges.selection);
  }

  // Calculate dayCount
  const startDate = selectedRange.startDate;
  const endDate = selectedRange.endDate;
  const dayCount = startDate && endDate ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) : 0; // Ensure at least one day is counted

  // Calculate total price
  ;



  // Handle booking submission
  const handleSubmitBooking = async () => {
    try {
      const booking = {
        email: user.email,
        car: data.carName,
        contry:data.countery,
        
        startDate: startDate && startDate.toDateString(),
        endDate: endDate && endDate.toDateString(),
        totalPrice: data.price * dayCount
      };

      const response = await fetch(`http://localhost:3000/bookings`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking) // Sending booking data instead of data
      });

      const responseData = await response.json();

      if (responseData.acknowledged === true) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Data is submitted',
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  return (
    <div>
      {/* Displaying data properties */}
      <p>Car Name: {data.carName}</p>
      <p>Description: {data.description}</p>
      <p>Price per night: ${data.price}</p>
      {/* Rendering the DateRangePicker component */}

      <div className=' flex justify-evenly '>
        <div className='mt-40'>
          <h2>{dayCount > 1 ? `${dayCount} DAYS` : `${dayCount} Day`}</h2>

          <h2>{dayCount > 1 ? `$${data.price} * ${dayCount} DAY` : `$${data.price} * ${dayCount} DAY`}</h2>
          <h2>Total price : {data.price * dayCount}</h2>
          <p>Start Day : {startDate ? startDate.toLocaleString(undefined, { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : "Not selected"}</p>
          <p>Last Day : {endDate ? endDate.toLocaleString(undefined, { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : "Not selected"}</p>



          <Link to={'/payments'}>
            <button onClick={handleSubmitBooking} className="px-10 btn btn-outline">Order</button>

          </Link>
        </div>

        <div >
          <h2>How long do you want to stay?</h2>
          <DateRange
            ranges={[selectedRange]}
            onChange={handleSelect}
          />

        </div>
      </div>

    </div>
  );
}

export default DataDetails;
