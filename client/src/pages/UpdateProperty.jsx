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
     //Create a state uploadedFiles to store the list of currently uploaded files. Initially, it is empty.
     const [uploadedFiles, setUploadedFiles] = useState([])

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

            // Create FormData object to send images and other form data
            const formDataToSend = new FormData();
            uploadedFiles.forEach((file) => formDataToSend.append("images", file)); // Append new images
            Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key])); // Append text fields

            // Ensure userRef is a single string
            formDataToSend.append("userRef", currentUser._id); // Add userRef to formData

            // Only append existing images if they are present and not empty
            if (formData.existingImages && formData.existingImages.length > 0) {
                formDataToSend.append("existingImages", JSON.stringify(formData.existingImages));
            }

            const res = await fetch(`/api/listing/update/${params.listingId}`,{
                method: 'POST',
                body: formDataToSend,
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

    
    const handleFileChange = (e) => {
        //convert file object to array
        const files = Array.from(e.target.files);
        //array destructuring, which creates a new array by combining
        //...prevFiles: The existing array of uploaded files.
        //...files: The new array of files selected from the input.
        setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
    };

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
                            <input type="number" id="discountPrice" min='0' max='10000000' className='p-2 border border-gray-300 rounded-lg' 
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

       
            <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">
                Images:
                <span className="font-normal text-gray-600 ml-2">
                The First image will be the cover (max 6)
                </span>
            </p>
            <div className="flex flex-col gap-4">
                <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="p-2 border border-gray-300 rounded"
                />
                 
                <div className="flex gap-4 flex-wrap">
                {uploadedFiles.map((file, index) => (
                    <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-20 h-20 object-cover border rounded-lg"
                    />
                ))}

                    {/* Show already saved images */}
                    {formData.imageUrls && formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                        <img
                        key={index}
                        src={url} // URL of the already saved image
                        alt={`saved-preview-${index}`}
                        className="w-20 h-20 object-cover border rounded-lg"
                        />
                    ))}
                </div>
            </div>
            <button
                disabled={loading}
                type="submit"
                className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
                {loading ? "Updating..." : "Update"}
            </button>
            </div>
            
        </form>
    </main>
  )
}

export default UpdateProperty
