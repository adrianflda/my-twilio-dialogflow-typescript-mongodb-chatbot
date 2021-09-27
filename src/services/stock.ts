import { Stock, StockModel } from "../models";

export const getStock = async (stockCode: number): Promise<Stock | null> => {
    const stock: Stock | null = await StockModel.findOne({ticketId: stockCode});
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