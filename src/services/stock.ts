import { Stock, StockModel } from "../models";

export const getStock = async (productCode: number): Promise<Stock | null> => {
    const stock: Stock | null = await StockModel.findOne({ code: productCode });
    return stock;
}

export const getStocks = async (): Promise<Stock[] | null> => {
    const stocks: Stock[] | null = await StockModel.find({});
    return stocks;
}

export const createStock = async (stock: Stock): Promise<Stock | undefined> => {
    try {
        const newStock: any = await StockModel.create(stock);
        return newStock;
    } catch (error) {
        console.log('create stock error: ', error);
    }
}

export const updateStock = async (productCode: number, amount: number): Promise<Stock | undefined> => {
    try {
        const newStock: any = await StockModel.updateOne({ code: productCode }, { stock: amount });
        return newStock;
    } catch (error) {
        console.log('update stock error: ', error);
    }
}