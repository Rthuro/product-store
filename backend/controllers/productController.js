import { sql } from "../config/db.js";

export const getAllProduct = async (req,res) => {
    try{
        const products = await sql`
            SELECT * FROM  products
            ORDER BY create_at DESC
        `;

        res.status(200).json({success: true, data: products})
        
    }catch(err){
        res.status(500).json({success: false, message: "failed to get all product"})
    }
};
export const getProduct = async (req,res) => {
    const  { id } = req.params
    try {
        const getProd = await sql`
            SELECT * FROM products WHERE id = ${id}
        `
        res.status(200).json({success: true, data: getProd[0]}) 
    } catch (error) {
        res.status(500).json({success: false, message: "failed to get product"})
        
    }
};

export const createProduct = async (req,res) => {
    const {name,price,image} = req.body;

    if(!name || !price || !image ){
        return res.status(400).json({success:false,message:"All field are required"})
    }

    try {
        // await sql`
        //     INSERT INTO products (name,price,image) VALUES (${name},${price},${image});
        // `

        // Other way Example
        const newProd = await sql`
            INSERT INTO products (name,image,price) 
            VALUES (${name},${image},${price})
            RETURNING *
        ` 
        // console.log("New product added:" + newProd);

        // 201 means resource has been created
        // newProd[0] because it returns an array
        res.status(201).json({success: true, data: newProd[0]})


    } catch (err) {
        res.status(500).json({success: false, message: "failed to create product"})
    }
};

export const updateProduct = async (req,res) => {
    const  { id } = req.params
    const {name, price, image} = req.body
    try {
        const updateProduct = await sql`
            UPDATE products
            SET name=${name}, price=${price}, image=${image}
            WHERE id=${id}
            RETURNING *
        `

        if(updateProduct.length === 0){
            // 404 = not found
            return res.status(404).json({success: failed, message:"Product not found"});
        }

        res.status(200).json({success: true, data: updateProduct[0]})


    } catch (error) {
        res.status(500).json({success: false, message: "failed to update product"})
        
    }
};

export const deleteProduct = async (req,res) => {
    const  { id } = req.params
    try {
        const deletedProd = await sql`
            DELETE FROM products WHERE id=${id}
            RETURNING *
        `
        if(deletedProd.length === 0){
            // 404 = not found
            return res.status(404).json({success: failed, message:"Product not found"});
        }
        res.status(200).json({success: true, data: deletedProd[0]})
    } catch (error) {
        res.status(500).json({success: false, message: "failed to get product"})
    }
};
