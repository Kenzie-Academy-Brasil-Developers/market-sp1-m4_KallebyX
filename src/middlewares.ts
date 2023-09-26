import { Request, Response, NextFunction } from "express";
import { market } from "./databases";

export const checkProductNameExist = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const productExists = market.some(product => product.name === name);
    if (productExists) {
        return res.status(409).json({ message: 'Product alread registered'});
    }
    next();
}

export const checkProductIdExists = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const product = market.find(product => product.id === parseInt(id));
    if(!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    next();
;}