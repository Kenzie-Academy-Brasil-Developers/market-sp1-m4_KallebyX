import { Request, Response, NextFunction } from "express";
import { market } from "./databases";

export const checkProductName = (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name;
    const productExists = market.some(product => product.name === name);
    
    if (productExists) {
        return res.status(409).json({ message: "Product already registered." });
    }
    
    next();
};

export const checkProductId = (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const productExists = market.some(product => product.id === id);

    if (!productExists) {
        return res.status(404).json({ message: "Product not found." });
    }

    next();
};
