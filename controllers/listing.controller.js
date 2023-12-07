import Listing from "../models/listing.model.js"


export const createlist = async(req, res)=>{
   
    try {
        const list = await Listing.create(req.body)
       return  res.status(201).json(list)
    } catch (error) {
        console.log(error)
       res.status(500).json(error) 
    }
}


export const deletelist = async (req, res) => {
    const list = await Listing.findById(req.params.id);
  
    if (!list) {
          res.status(404).json('lists are not found')
    }
  
    if (req.user.id !== list.userRef) {
        return  res.status(401).json('You can only delete your own listings!')

    }
  
    try {
      await Listing.findByIdAndDelete(req.params.id);
      res.status(200).json('Listing has been deleted!');
    } catch (error) {
        res.status(500).json(error) 
    }
  };




  export const updateListing = async(req, res)=>{

    const list = await Listing.findById(req.params.id);
  
    if (!list) {
          res.status(404).json('lists are not found')
    }
  
    if (req.user.id !== list.userRef) {
        return  res.status(401).json('You can only update your own listings!')

    }
  
    try {
      const updatedlist = await Listing.findByIdAndUpdate(
        req.params.id,
         req.body,
         {new : true});
      res.status(200).json(updatedlist);
    } catch (error) {
        res.status(500).json(error) 
    }
  }



    export const getOneListing = async(req, res)=>{
try {
  const listing = await Listing.findById(req.params.id)
  if(!listing) {
    return res.status(404).json('listing not found')
  }
res.status(200).json(listing)
  
} catch (error) {
  console.log(error)
  res.status(500).json(error) 

}      
    }














    export const searchListings = async(req, res)=>{
      try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;
    
        if (offer === undefined || offer === 'false') {
          offer = { $in: [false, true] };
        }
    
        let furnished = req.query.furnished;
    
        if (furnished === undefined || furnished === 'false') {
          furnished = { $in: [false, true] };
        }
    
        let parking = req.query.parking;
    
        if (parking === undefined || parking === 'false') {
          parking = { $in: [false, true] };
        }
    
        let type = req.query.type;
    
        if (type === undefined || type === 'all') {
          type = { $in: ['sale', 'rent'] };
        }
    
        const searchTerm = req.query.searchTerm || '';
    
        const sort = req.query.sort || 'createdAt';
    
        const order = req.query.order || 'desc';
    
        const listings = await Listing.find({
          name: { $regex: searchTerm, $options: 'i' },
          offer,
          furnished,
          parking,
          type,
        })
          .sort({ [sort]: order })
          .limit(limit)
          .skip(startIndex);
    
        return res.status(200).json(listings);
      } catch (error) {
        res.status(500).json(error) 
      }
    }