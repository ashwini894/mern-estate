import { useSelector } from "react-redux";
import {useRef} from 'react';

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user);
  const fileRef = useRef(null);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept='image/*' />
        <img src={currentUser.avatar} alt="your profile" className="rounded-full h-25 w-25 object-cover cursor-pointer self-center mt-2"  />
        <input type="text" placeholder="username" className="border p-3 rounded-lg" id="username" />
        <input type="email" placeholder="email" className="border p-3 rounded-lg" id="email" />
        <input type="password" placeholder="password" className="border p-3 rounded-lg" id="password" />
        <button className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Update</button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">SignOut</span>
      </div>
    </div>
  )
}
