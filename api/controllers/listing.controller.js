import Listing from "../models/listing.model.js";
import multer from "multer";
import { errorHandler } from "../utils/error.js";
import path from "path";

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "api/public/uploads/"); // Save files in the uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit files to 2 MB each
}).array("images", 6);

export const createListing = [
  async (req, res, next) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      
      try {
        
        const imageUrls = req.files.map(
          (file) => `${req.protocol}://${req.get("host")}/${file.path}`
        );

        const listingData = {
          ...req.body,
          imageUrls, // Store the uploaded file URLs
        };

        const listing = await Listing.create(listingData);
        return res.status(201).json({ success: true, listing });
      } catch (error) {
        console.error(error);
        next(error);
      }
    });
  },
];

export const deleteListing = async (req,res,next)=>{
    const listing = await Listing.findById(req.params.id);
    
    if(!listing){
        return next(errorHandler(404,"Listing not found!"));
    }

    if(req.user.id !== listing.userRef){
        return next(errorHandler(401,"You can only delete your own listings!"));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json(("Record has been deleted!"));
    } catch (error) {
        next(error);
    }
}

export const updateListing = async (req, res, next) => {
    // Handle file uploads
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }

        try {
            const listing = await Listing.findById(req.params.id);

            if (!listing) {
                return res.status(404).json({ success: false, message: "Listing not found!" });
            }

            // Ensure the current user is updating their own listing
            if (req.user.id !== listing.userRef.toString()) {
                return res.status(401).json({ success: false, message: "You can only update your own listings!" });
            }

            // Get existing images (if any)
            let imageUrls = listing.imageUrls || [];

            // Add new images if any are uploaded
            if (req.files && req.files.length > 0) {
                const newImages = req.files.map(
                    (file) => `${req.protocol}://${req.get("host")}/${file.path}`
                );
                // Combine the existing image URLs with the new ones
                imageUrls = [...imageUrls, ...newImages];
            }

            // Ensure userRef is a single string and not an array
            const userRef = Array.isArray(req.body.userRef) ? req.body.userRef[0] : req.body.userRef;

            // Update the listing data with imageUrls
            const updatedData = {
                ...req.body,
                userRef: userRef,  // Ensure userRef is a string
                imageUrls,  // Updated image URLs
            };

            // Update the listing in the database
            const updatedListing = await Listing.findByIdAndUpdate(req.params.id, updatedData, { new: true });

            return res.status(200).json({ success: true, listing: updatedListing });
        } catch (error) {
            console.error(error);
            next(error);
        }
    });
};




export const getListing = async (req,res,next) => {
    try {
        const listing  = await Listing.findById(req.params.id);
        if(!listing){
            return next(errorHandler(404,'Listing not found'))
        }
        res.status(200).json(listing); 
    } catch (error) {
        next(error);
    }
}

export const getListings = async (req,res,next) => {
    try {
        console.log("Received query:", req.query);

        const limit  = parseInt(req.query.limit) || 9;
        const startIndex  = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;
        let furnished = req.query.furnished;
        let parking = req.query.parking;
        let type = req.query.type;
        const searchTerm = req.query.searchTerm ? req.query.searchTerm.trim() : '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        if(offer=== undefined || offer === false){
            offer= { $in:[false,true] };
        }

        if(furnished=== undefined  || furnished === false){
            furnished= { $in:[false,true] };
        }

        if(parking=== undefined || parking === false){
            parking= { $in:[false,true] };
        }

        if(type=== undefined || type === 'all'){
            type= { $in:['sale','rent'] };
        }

        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' },    // case-insensitive search
            offer,
            furnished,
            parking,
            type,
        }).sort(
            {[sort]:order}
        ).limit(limit).skip(startIndex);

        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
}