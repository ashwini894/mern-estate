import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';

function PropertyListing() {
  // Define states at the top level of the component
  const [userListings, setUserListings] = useState([]);
  const [showPropertyListingError, setShowPropertyListingError] = useState(false);
  
  const { currentUser } = useSelector((state) => state.user);

  // Function to fetch property listings
  const handlePropertyShowListing = async () => {
    try {
      setShowPropertyListingError(false); // Reset error state
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setShowPropertyListingError(true);
        return;
      }

      setUserListings(data); // Update listings state
    } catch (error) {
      console.error('Error fetching property listings:', error);
      setShowPropertyListingError(true);
    }
  };

  // Fetch property listings on page load
  useEffect(() => {
    console.log('currentUser:', currentUser);
    if (currentUser?._id) {
      handlePropertyShowListing();
    }
  }, [currentUser]);

  const handleListingDelete = async (listingId)=>{
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method:"DELETE",
      });

      const data = await res.json();
      if(data.success===false){
        console.log(data.message);
        return;
      }

      setUserListings((prev) => 
      prev.filter((listing)=>listing._id !==listingId));
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Property Listing</h1>

      <Link
        className=' max-w-lg bg-green-700 text-white p-2 w-24 rounded-lg uppercase text-center hover:opacity-95'
        to='/add-property'
      >
        Create
      </Link>


      <p className='text-red-700 mt-5'>
        {showPropertyListingError ? 'Error showing lists' : ''}
      </p>
  
      {userListings && userListings.length > 0 ? (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center my-7 text-2xl font-semibold'>Your property listing</h1>
        {userListings.map((listing) => (
          <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4'>
            <Link to={`/listing/${listing._id}`}>
              <img
                src={Array.isArray(listing.imageUrls) ? listing.imageUrls[0] : listing.imageUrls} // Handle array or string
                alt='listing cover'
                className='h-16 w-16 object-contain'
              />
            </Link>
            
            <Link to={`/listing/${listing._id}`} className='text-slate-700 font-semibold flex-1 hover:underline'>
              <p>{listing.name}</p>
            </Link>

            <div className="flex space-x-4">
              {/* Edit Button */}
              <Link to={`/update-property/${listing._id}`} >
              <button
                className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                <FaEdit className="text-xl" />
              </button>
              </Link>

              {/* Delete Button */}
              <button 
                onClick={()=>handleListingDelete(listing._id)}
                className="flex items-center justify-center p-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-200"
              >
                <FaTrash className="text-xl" />
              </button>
            </div>

          </div>
        ))
        }
      </div>

      ) : (
        <p>No listings found.</p>
      )}
    </div>
  );
}

export default PropertyListing;
