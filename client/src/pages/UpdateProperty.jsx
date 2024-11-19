import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";

function UpdateProperty() {
    const { currentUser } = useSelector((state) => state.user);
    const [formData,setFormData] = useState({
        name:"",
        description:"",
        address:"",
        type:"rent",
        bedrooms:1,
        bathrooms:1,
        regularPrice:50,
        discountPrice:0,
        offer:false,
        parking:false,
        furnished:false, 
    });

    const[error,setError] = useState(false);
    const[loading,setLoading]= useState(false); 
    const navigate = useNavigate(); 
    const params = useParams();
    const handleChange = (e) =>{
        if(e.target.id==='sale' || e.target.id==='rent'){
            setFormData({
                ...formData,
                type: e.target.id
            })
        }

        if(e.target.id==="parking" || e.target.id==="furnished" || e.target.id==='offer'){
            setFormData({
                ...formData,
                [e.target.id]:e.target.checked
            })
        }

        if(e.target.type==='number' || e.target.type==="text" || e.target.type==="textarea"){
            setFormData({
                ...formData,
                [e.target.id]:e.target.value
            })
        }
    };

    useEffect(() => {
      const fetchListing = async () => {
        const listingId =params.listingId;
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if(data.success===false){
          console.log(data.messaage);
          return;
        }
        setFormData(data);
        console.log(listingId);
      }

      fetchListing();
    },[])
    const handleSubmit = async(e) =>{
     
        e.preventDefault();
        try {
            
            //to convert number string to integer used + here
            if(formData.regularPrice < formData.discountPrice)
                return setError("Discount price must be lower than regular price");

            setLoading(true);
            setError(false);
            const res = await fetch(`/api/listing/update/${params.listingId}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...formData,userRef:currentUser._id}), 
            });

            const data = await res.json();
         
            setLoading(false);
            if(data.success===false){
                setError(data.message);
            }
            navigate('/property-listing');
        } catch (error) {
            setError(error.messaage);
            setLoading(false);
        }
    }


  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Update your property</h1>
        {error && <p className="text-red-700 text-sm">{error}</p>}
        <form  onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength={62} minLength={5} required onChange={handleChange} value={formData.name}/>
                <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required onChange={handleChange} value={formData.description} />
                <input type="test" placeholder='Address' className='border p-3 rounded-lg' id='address' required  onChange={handleChange} value={formData.address} />

                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                         <input type='checkbox' id="sale" className='w-5' onChange={handleChange} checked={formData.type==='sale'} />
                         <span>Sell</span>
                    </div>

                    <div className='flex gap-2'>
                         <input type='checkbox' id="rent" className='w-5'
                          onChange={handleChange} 
                          checked={formData.type==='rent'}
                           />
                         <span>Rent</span>
                    </div>


                    <div className='flex gap-2'>
                         <input type='checkbox' id="parking" className='w-5'
                          onChange={handleChange} 
                          checked={formData.parking} 
                         />
                         <span>Parking Spot</span>
                    </div>

                    <div className='flex gap-2'>
                         <input type='checkbox' id="furnished" className='w-5' 
                         onChange={handleChange} 
                         checked={formData.furnished} 
                         />
                         <span>Furnished</span>
                    </div>

                    <div className='flex gap-2'>
                         <input type='checkbox' id="offer" className='w-5'
                         onChange={handleChange} 
                         checked={formData.offer} 
                          />
                         <span>Offer</span>
                    </div>
                </div>

                <div className='flex flex-wrap gap-6'>
                    <div className='flex items-center gap-2'>
                        <input type="number" id="bedrooms" min="1" max="10" className='p-2 border border-gray-300 rounded-lg' required
                         onChange={handleChange} 
                         value={formData.bedrooms} 
                          />
                        <p>Beds</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <input type="number" id="bathrooms"  min='1' max='10' className='p-2 border border-gray-300 rounded-lg'
                          onChange={handleChange} 
                          value={formData.bathrooms} 
                          required />
                        <p>Baths</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <input type="number" id="regularPrice" min="50" max="10000000" className='p-2 border border-gray-300 rounded-lg'
                         onChange={handleChange} 
                         value={formData.regularPrice} 
                         required />
                        <div className='flex flex-col items-center'>
                            <p>Regular Price</p>
                            <span className='text-xs'> (Rs/month)</span>
                        </div>
                    </div>

                    {formData.offer && (
                        <div className='flex items-center gap-2'>
                            <input type="number" id="discountedPrice" min='0' max='10000000' className='p-2 border border-gray-300 rounded-lg' 
                            onChange={handleChange} 
                            value={formData.discountPrice} 
                            required />
                        <div className='flex flex-col items-center'>
                                <p>Discounted Price</p>
                                <span className='text-xs'> (Rs/month)</span>
                            </div>
                        </div>
                    )}

                </div>  
            </div>

            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'> Images:
                <span className="font-normal text-gray-600 ml-2">The First image will be the cover (max 6)</span>
                </p>
                <div className="flex gap-4">
                    <input className="p-2 border border-gray-300 rounded- w-full" type="file" id="images" accept="images/*" multiple />
                    <button className="p-2 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:*:opacity-80">Upload</button> 
                </div>
                 <button disabled={loading} type="submit" className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading? 'Updating..':'Update'}</button>
            </div>
            
        </form>
    </main>
  )
}

export default UpdateProperty
