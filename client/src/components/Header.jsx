import {FaSearch} from 'react-icons/fa';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { useSelector,useDispatch  } from 'react-redux';
import { useEffect, useState } from 'react';
import { 
    signOutUserFailure, 
    signOutUserStart, 
    signOutUserSuccess,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess
 } from '../redux/user/userSlice';

  
function Header() {
    const {currentUser} =  useSelector(state=>state.user);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const handleSignOut = async() => {
        try {
            signOutUserStart();

            const res = await fetch('api/auth/signout');
            const data = await res.json();
           
            setIsOpen(false);
            if(data.success===false){
                dispatch(signOutUserFailure(data.message));
                return;
            }
            dispatch(signOutUserSuccess(data))
        } catch (error) {
            dispatch(signOutUserFailure(error.message));
        }
    }


    const handleDeleteUser = async () =>{ 
        setIsOpen(false);
        try {
          dispatch(deleteUserStart());
          const res = await fetch(`/api/user/delete/${currentUser._id}`,{
            method:'DELETE',
          });
  
          const data = await res.json();
          if(data.success===false){
            dispatch(deleteUserFailure(data.message));
            return;
          }
  
          dispatch(deleteUserSuccess(data));
        } catch (error) {
          dispatch(deleteUserFailure(error.message));
        }
  
    }

    const handleSubmit = (e) =>{
      e.preventDefault();
      //get url parameters
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('searchTerm',searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    }

    //to show search term selected in input box
    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');
      if(searchTermFromUrl){
        setSearchTerm(searchTermFromUrl);
      }
    },[location.search])

    return (
    <header className='bg-slate-200 shadow-sm'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to="/">
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>Real</span>
                <span className='text-slate-700'>Estate</span>
            </h1>  
        </Link>  
        <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button>
              <FaSearch className='text-slate-600' />
            </button>
        </form>
        <ul className='flex gap-4'>
            <Link to="/"><li className={`hidden sm:inline text-slate-700 hover:underline ${isActive("/") ? "active" : ""}`}> Home</li></Link>
            <Link to="/about"><li className={`hidden sm:inline text-slate-700 hover:underline  ${isActive("/about") ? "active" : ""}`}>About</li></Link>

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
                      to='/property-listing'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      onClick={() => setIsOpen(false)}
                    >
                      Property List
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    >
                      Sign Out
                    </button>
                    <button
                      onClick={handleDeleteUser}
                      className='w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100'
                    >
                      Delete Account
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link to='/sign-in'>
                <li className={`hidden sm:inline text-slate-700 hover:underline ${isActive("/sign-in") ? "active" : ""}`}>Login</li>
              </Link>
            )}
          </div>
        </ul>
        </div>
    </header>
  )
}

export default Header
