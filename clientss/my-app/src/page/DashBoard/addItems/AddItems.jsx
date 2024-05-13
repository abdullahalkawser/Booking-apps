import React, { useState } from 'react'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';

import facilities from '../addItems/data.js'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form';


const AddItems = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [amenities, setAmenities] = useState([]);
  const [type, setType] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (event) => {
    const files = event.target.files;
    const uploadedPhotos = Array.from(files);
    setPhotos(prevPhotos => [...prevPhotos, ...uploadedPhotos]);
  };

  const handleRemovePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;
    const updatedPhotos = [...photos];
    const [reorderedPhoto] = updatedPhotos.splice(result.source.index, 1);
    updatedPhotos.splice(result.destination.index, 0, reorderedPhoto);
    setPhotos(updatedPhotos);
  };

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities(prevAmenities => prevAmenities.filter(option => option !== facility));
    } else {
      setAmenities(prev => [...prev, facility]);
    }
  };


  const onSubmit = async (data) => {
    console.log(data)
    try {
      data.amenities = amenities;
 
      data.photos = photos
      
     // Make a POST request to the server

     const response = await fetch(`http://localhost:3000/carpost`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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
       <h1 className="text-4xl text-center font-bold">
        Add Car Items
       </h1>

       <div>
       <form onSubmit={handleSubmit(onSubmit)}>
                {/* Row 1 */}
                <div className="flex gap-2">
                <div className="form-control md:w-1/2">
                    <label className="label">
                      <span className="label-text text-[20px]">
                       Car **
                      </span>
                    </label>
                    <input
                      {...register("carName", { required: true })}
                      type="text"
                      placeholder="Car Name"
                      className="input input-bordered w-full"
                    />
                    {errors.jobTitle && <span className="text-red-500">This field is required</span>}
                  </div>
                  <div className="form-control md:w-1/2">
                    <label className="label">
                      <span className="label-text text-[20px]">
                       Location**
                      </span>
                    </label>
                    <input
                      {...register("location", { required: true })}
                      type="text"
                      placeholder="Location*"
                      className="input input-bordered w-full"
                    />
                    {errors.jobTitle && <span className="text-red-500">This field is required</span>}
                  </div>
                  <div className="form-control md:w-1/2">
                    <label className="label">
                      <span className="label-text text-[20px]">
                       Country **
                      </span>
                    </label>
                    <input
                      {...register("countery", { required: true })}
                      type="text"
                      placeholder="Country *"
                      className="input input-bordered w-full"
                    />
                    {errors.jobTitle && <span className="text-red-500">This field is required</span>}
                  </div>
                  <div className="form-control md:w-1/2 ml-4">
                    <label className="label">
                      <span className="label-text text-[20px]">
                      Title**
                      </span>
                    </label>
                    <input
                      {...register("Title", { required: true })}
                      type="text"
                      placeholder="Title*"
                      className="input input-bordered w-full"
                    />
                    {errors.country && <span className="text-red-500">This field is required</span>}
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex gap-3">
                <div className="form-control md:w-1/2">
                    <label className="label">
                      <span className="label-text text-[20px]">
                        City**
                      </span>
                    </label>
                    <input
                      {...register("city", { required: true })}
                      type="text"
                      placeholder="City*"
                      className="input input-bordered w-full"
                    />
                    {errors.city && <span className="text-red-500">This field is required</span>}
                  </div>
                  <div className="form-control md:w-1/2">
                    <label className="label">
                      <span className="label-text text-[20px] ">
                        Milege**
                      </span>
                    </label>
                    <input
                      {...register("Milege", { required: true })}
                      type="text"
                      placeholder="Milege*"
                      className="input input-bordered w-full"
                    />
                    {errors.city && <span className="text-red-500">This field is required</span>}
                  </div>
                  <div className="form-control md:w-1/2">
                    <label className="label">
                      <span className="label-text text-[20px]">
                        Seat *
                      </span>
                    </label>
                    <input
                      {...register("Seat", { required: true })}
                      type="text"
                      placeholder="Seat*"
                      className="input input-bordered w-full"
                    />
                    {errors.city && <span className="text-red-500">This field is required</span>}
                  </div>
                  <div className="form-control md:w-1/2 ml-4">
                    <label className="label">
                      <span className="label-text text-[20px]">
                        Colour **
                      </span>
                    </label>
                    <input
                      {...register("Colour", { required: true })}
                      type="text"
                      placeholder="Colour "
                      className="input input-bordered w-full"
                    />
                    {errors.location && <span className="text-red-500">This field is required</span>}
                  </div>
                </div>

                  {/* Row 2 */}
                  <div className="flex gap-3">
                <div className="form-control md:w-1/2">
                    <label className="label">
                      <span className="label-text text-[20px]">
                         price **
                      </span>
                    </label>
                    <input
                      {...register("price", { required: true })}
                      type="number"
                      placeholder="price"
                      className="input input-bordered w-full"
                    />
                    {errors.city && <span className="text-red-500">This field is required</span>}
                  </div>
                  <div className="form-control md:w-1/2">
                    <label className="label">
                      <span className="label-text text-[20px] ">
                        Location**
                      </span>
                    </label>
                    <input
                      {...register("city", { required: true })}
                      type="text"
                      placeholder="Location"
                      className="input input-bordered w-full"
                    />
                    {errors.city && <span className="text-red-500">This field is required</span>}
                  </div>
                  <div className="form-control md:w-1/2">
                    <label className="label">
                      <span className="label-text text-[20px]">
                        Retings **
                      </span>
                    </label>
                    <input
                      {...register("Retings", { required: true })}
                      type="text"
                      placeholder="Retings*"
                      className="input input-bordered w-full"
                    />
                    {errors.city && <span className="text-red-500">This field is required</span>}
                  </div>
                  <div className="form-control md:w-1/2 ml-4">
                    <label className="label">
                      <span className="label-text text-[20px] text-white">
                        Discout**
                      </span>
                    </label>
                    <input
                      {...register("Discout", { required: true })}
                      type="text"
                      placeholder="Discout*"
                      className="input input-bordered w-full"
                    />
                    {errors.location && <span className="text-red-500">This field is required</span>}
                  </div>
                </div>


         

              

                
      
                  {/* Job Description */}
                  <div className="mt-3 w-3/5 ">
                  <label className="label">
                    <span className="label-text text-[20px] ">Car Description*</span>
                  </label>
                  <textarea
                    {...register("description", { required: true })}
                    placeholder="Write Car Description here"
                    className="textarea w-4/5 h-[100px]"
                  ></textarea>
                  {errors.description && <span className="text-red-500">This field is required</span>}
                </div>



                <h1 className='text-4xl mt-3 mb-5 '>Car Fecilitis</h1>
                <div class="flex flex-wrap  "> 
                
  {facilities?.map((item, index) => (
   <div
   className={`type ${type === item.name ? "selected" : ""} bg-white p-3`}
   key={index}
   onClick={() => {
     setType(item.name);
     handleSelectAmenities(item.name);
   }}
 >
      <div class="text-gray-700">{item.icon}</div>
      <p class="font-semibold">{item.name}</p>
    </div>
  ))}
</div>
<h3 className="text-lg font-semibold mb-4">Add some photos of your place</h3>
          <div className="flex items-center w-6/12">
            <input id="image" type="file" className="hidden" accept="image/*" onChange={handleUploadPhotos} multiple />
            <label htmlFor="image" className="flex flex-col items-center cursor-pointer border border-gray-300 rounded-lg p-4 mr-4">
     
              <p>Upload from your device</p>
            </label>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="flex gap-4"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.map((photo, index) => (
                      <Draggable key={index} draggableId={index.toString()} index={index}>
                        {(provided) => (
                          <div
                            className="relative w-64 h-40 cursor-move"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <img src={URL.createObjectURL(photo)} alt="place" className="w-full h-full object-cover rounded-lg" />
                            <button type="button" className="absolute top-0 right-0 p-2 bg-white bg-opacity-80" onClick={() => handleRemovePhoto(index)}>
                             
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
           

                {/* Submit Button */}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-warning w-full mt-7"
                />
              </form>
       </div>
    </div>
  )
}

export default AddItems