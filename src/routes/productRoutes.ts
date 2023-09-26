import { Router, Request, Response } from "express";
import { product } from "../interfaces";
import { market } from "../databases";
import { checkProductNameExist, checkProductIdExists } from "../middlewares";

const router = Router();
let productIdCounter = 1;

router.post('/products', checkProductNameExist, (req: Request, res: Response) => {
    const { name, price, weight, section, calories } = req.body;


    const product: product = {
        id: market.length + 1,
        name,
        price,
        weight,
        section,
        calories,
        expirationDate: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000)
    };
    
    market.push(product);
    res.status(201).json(product)

});

router.get('/products', (req: Request, res: Response) => {
    const total = market.reduce((acc, product) => acc + product.price, 0) 
    res.json({total, products: market});
});

router.get('/products/:id', checkProductIdExists, (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const product = market.find(p => p.id === id);
    res.json(product);
})

router.patch('/products/:id', checkProductIdExists , checkProductNameExist ,(req: Request, res: Response) => {
    const id = req.params;
    const productIndex = market.find(product => product.id === Number(id));
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

    return res.json(200).json(market[productIndex]);
});

router.delete('/products/id:', checkProductIdExists ,(req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const productIndex = market.findIndex(product => product.id === id);

    if (productIndex === -1) {
        market.splice(productIndex, 1);
    }
    res.status(204).send();
});

export default router

