import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error,setError] = useState(null);
  const[loading,setloading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();  
    try {
      setloading(true);         
      const res = await fetch('/api/auth/signup',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(formData),
      });

    
      const data = await res.json(); // Parse JSON if response is ok
      if(data.success===false){
        setError(data.message);
        setloading(false);
        return;
      }

      console.log(data);
      setloading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setloading(false);
      setError(error.message)
    }
    

  };
  
  console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='Username' className='border p-3 rounded-lg' id="username" onChange={handleChange}/>
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id="email" onChange={handleChange}/>
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id="password" onChange={handleChange}/>

        <button disabled={loading} className='bg-slate-700 p-3 text-white rounded-lg hover:opacity-95 disabled:opacity-80'>{loading? 'Loading..' : 'Sign Up'}</button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Already have an account?</p>
        <Link to={'/sign-in'}>
        <span className='text-blue-700'>Sign in</span></Link>
      </div>
    </div>
  )
}
