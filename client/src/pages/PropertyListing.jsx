import {Link} from 'react-router-dom';

function PropertyListing() {
  return (
    <div className='p-3 max-w-lg mx-auto'> 
     <h1 className='text-3xl font-semibold text-center my-7'>Property Listing</h1>
      <Link className="bg-green-700 text-white p-2 w-24 rounded-lg uppercase text-center hover:opacity-95 float-right" to="/add-property">Create</Link>
    </div>
  )
}

export default PropertyListing;
