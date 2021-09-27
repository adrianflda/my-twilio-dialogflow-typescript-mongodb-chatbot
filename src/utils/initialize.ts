import { Product, Stock } from '../models'
import { createProduct, createStock, getProduct, getStock } from '../services'

const products: Product[] = [
    {
        code: 100,
        unit: 1,
        description: 'articulo numero 100',
        value: 0.98,
        rest: 10,
        unipaq: 1,
        unidmin: 0,
        weigh: 1,
        codprecan: 'CJ',
        codpreres: 'UN',
        factor: 0,
    } as Product,
    {
        code: 200,
        unit: 1,
        description: 'articulo numero 200',
        value: 1.35,
        rest: 15,
        unipaq: 1,
        unidmin: 0,
        weigh: 1,
        codprecan: 'CJ',
        codpreres: 'UN',
        factor: 0,
    } as Product,
];

const stocks: Stock[] = [
    {
        code: 100,
        description: 'stock del articulo 100',
        rest: 20,
        weigh: 1,
        stock: 2,
        date: '2/29/20'
    } as Stock,
    {
        code: 200,
        description: 'stock del articulo 200',
        rest: 20,
        weigh: 1,
        stock: 2,
        date: '2/29/20'
    } as Stock,
];

export const run = () => {
    products.forEach(async (p: Product) => {
        const product: Product | null = await getProduct(p.code);
        if (!product){
            await createProduct(p);
        }
    });

    stocks.forEach(async (s: Stock) => {
        const stock: Stock | null = await getStock(s.code);
        if (!stock){
            await createStock(s);
        }
    });
}