import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { useSelector,useDispatch  } from 'react-redux';
import { useState } from 'react';

function Header() {
    const {currentUser} =  useSelector(state=>state.user);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    return (
    <header className='bg-slate-200 shadow-sm'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to="/">
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>Real</span>
                <span className='text-slate-700'>Estate</span>
            </h1>  
        </Link>  
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
            <FaSearch className='text-slate-600' />
        </form>
        <ul className='flex gap-4'>
            <Link to="/"><li className='hidden sm:inline text-slate-700 hover:underline'>Home</li></Link>
            <Link to="/about"><li className='hidden sm:inline text-slate-700 hover:underline'>About</li></Link>

            <div className='relative'>
            {currentUser ? (
              <>
                <img
                  className='rounded-full h-7 w-7 object-cover cursor-pointer'
                  src={currentUser.avatar}
                  alt='profile'
                  onClick={() => setIsOpen(!isOpen)}
                />
                {isOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg'>
                    <Link
                      to='/profile'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to='/userlist'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      onClick={() => setIsOpen(false)}
                    >
                      User List
                    </Link>
                    <button
                      onClick=""
                      className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    >
                      Sign Out
                    </button>
                    <button
                      onClick={() => {
                        // Add delete account functionality
                        setIsOpen(false);
                      }}
                      className='w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100'
                    >
                      Delete Account
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link to='/sign-in'>
                <li className='text-slate-700 hover:underline'>Login</li>
              </Link>
            )}
          </div>
        </ul>
        </div>
    </header>
  )
}

export default Header
