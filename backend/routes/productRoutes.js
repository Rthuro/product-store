import express from 'express';
import { getAllProduct, getProduct, createProduct, updateProduct,deleteProduct } from '../controllers/productController.js';

const router = express.Router();

// example 
router.get("/test", (req,res) =>{
    res.send("test route [product route]")
})

router.get("/", getAllProduct);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;