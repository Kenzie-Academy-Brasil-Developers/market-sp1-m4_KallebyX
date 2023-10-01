import { Request, Response } from "express";
import { market } from "./databases";

export const createProduct = (req: Request, res: Response) => {
    const { name, price, weight, calories, section } = req.body;
    const product = {
        id: market.length + 1, 
        name,
        price,
        weight,
        calories,
        section,
        expirationDate: new Date().toISOString()
    };
    
    market.push(product);
    
    res.status(201).json(product);
};
