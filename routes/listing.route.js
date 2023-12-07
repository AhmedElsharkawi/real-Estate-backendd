import express from 'express' 
import { createlist, deletelist, getOneListing, searchListings, updateListing} from '../controllers/listing.controller.js'
import { verifyToken } from "../utils/VerifyToken.js";

const router = express.Router()


router.post('/create' , verifyToken , createlist)
router.delete('/:id' , verifyToken , deletelist)
router.put('/:id' , verifyToken , updateListing)
router.get('/get/:id'  , getOneListing)
router.get("/get", searchListings);




 
export default router