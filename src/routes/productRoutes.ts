import { Router, Request, Response } from "express";
import { Product } from "../interfaces";
import { market } from "../databases";
import { checkProductName, checkProductId } from "../middlewares";

const router = Router();
let productIdCounter = market.length + 1; 

router.post('/products', checkProductName, (req: Request, res: Response) => {
    const { name, price, weight, section, calories } = req.body;

    const newProduct: Product = {
        id: productIdCounter++,
        name,
        price,
        weight,
        section,
        calories,
        expirationDate: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000)
    };
    
    market.push(newProduct);
    res.status(201).json(newProduct);
});

router.get('/products', (req: Request, res: Response) => {
    const total = market.reduce((acc, product) => acc + product.price, 0);
    res.json({ total, products: market });
});

router.get('/products/:id', checkProductId, (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const productItem = market.find(p => p.id === id);
    res.json(productItem);
});

router.patch('/products/:id', checkProductId, checkProductName, (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const productIndex = market.findIndex(product => product.id === id);
    const { name, price, weight, calories } = req.body;

    if (name) {
        market[productIndex].name = name;
    }
    if (price) {
        market[productIndex].price = price;
    }
    if (weight) {
        market[productIndex].weight = weight;
    }
    if (calories) {
        market[productIndex].calories = calories;
    }

    res.status(200).json(market[productIndex]);
});

router.delete('/products/:id', checkProductId, (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const productIndex = market.findIndex(product => product.id === id);

    if (productIndex !== -1) {
        market.splice(productIndex, 1);
    }
    res.status(204).send();
});

export default router;
