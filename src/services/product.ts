import { Product, ProductModel } from "../models";

export const getProduct = async (productCode: number): Promise<Product | null> => {
    const product: Product | null = await ProductModel.findOne({ code: productCode });
    return product;
}

export const getProducts = async (): Promise<Product[] | undefined> => {
    console.log('get products');
    try {
        const products: Product[] = await ProductModel.find({});
        console.log('get products: ', { products });
        return products;
    } catch (error: any) {
        console.error('get products error: ', { error });
    }
}

export const createProduct = async (product: Product): Promise<Product | undefined> => {
    try {
        const newProduct: any = await ProductModel.create(product);
        return newProduct;
    } catch (error: any) {
        console.log('create product error: ', { error });
    }
}