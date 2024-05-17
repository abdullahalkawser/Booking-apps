import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';


import facilities from '../addItems/data.js'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form';
import app from '../../../FireBase/fire.config.js';


const AddItems = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [amenities, setAmenities] = useState([]);
  const [type, setType] = useState("");
  const [files, setFiles] = useState(undefined);
  const [formdata, setFormdata] = useState({
    imageUrl: []

  })
  console.log(formdata)


  const handleUploadImage = () => {
    // Assuming setuploading state is defined elsewhere
    // setuploading(true);
    if (files.length > 0 && files.length < 7) {
      const promises = [];
      for (let i = 0; i < files.length && i < 7; i++) {
        promises.push(storageImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          // Assuming setFormdata and imageUrl are defined elsewhere
          setFormdata({ ...formdata, imageUrl: formdata.imageUrl.concat(urls) });
        })
        .catch((err) => {
          console.log("Image upload failed. Please make sure each image is less than 2MB.");
        });
    } else {
      console.log("Please select between 1 and 6 images to upload.");
    }
  };


// firebase store file image

// allow read;
// allow  write : if
// request.resource.size < 2 *1024 *1024 &&
// request.resource.contentType.matches('image/.*')


const storageImage = async (file) => {
  return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
          (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(progress);
          },
          (error) => {
              reject('Error uploading file:', error);
          },
          () => {
              getDownloadURL(uploadTask.snapshot.ref)
                  .then((downloadUrl) => {
                      resolve(downloadUrl);
                  });
          }
      );
  });
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
 
      data.image = formdata
      
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
   className={`type ${type === item.name ? "selected" : ""} bg-red-600 p-3`}
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
<div>
            <input id="image" type="file" accept="image/*" onChange={(e) => setFiles(e.target.files)} multiple />
            <button onClick={handleUploadImage}>Upload</button>
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