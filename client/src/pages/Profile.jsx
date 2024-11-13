import { useSelector } from "react-redux";
import {useRef, useState} from 'react';
import { 
  updateUserStart,
  updateUserSuccess,
  updateUserFailure
} from '../redux/user/userSlice';

import { useDispatch } from "react-redux";

export default function Profile() {
  const {currentUser,loading,error} = useSelector((state) => state.user);

  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess,setUpdateSuccess] = useState(false); 
  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]:e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json();
      if(data.success===false){
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <p className="text-red-700 mt-5">{error ? error : ''}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? 'User Updated Successfully.!' : ''}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept='image/*' />
        <img src={currentUser.avatar} alt="your profile" className="rounded-full h-25 w-25 object-cover cursor-pointer self-center mt-2"  />
        <input type="text" placeholder="username" className="border p-3 rounded-lg" id="username" defaultValue={currentUser.username} onChange={handleChange} />
        <input type="email" placeholder="email" className="border p-3 rounded-lg" id="email" defaultValue={currentUser.email} onChange={handleChange}/>
        <input type="password" placeholder="password" className="border p-3 rounded-lg" id="password"  onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
        {loading? 'Loading..':  'Update'}
        </button>
      </form>
   
    </div>
  )
}
