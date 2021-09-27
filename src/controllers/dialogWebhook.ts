import { Request, Response } from "express";
import { Controller, Post } from "@overnightjs/core";
import { getProduct, createOrder, getStock, updateStock } from "../services";
import { Order, Product, Stock } from "src/models";
import { v4 as uuidv4 } from 'uuid';

enum Action {
    Product = 'Product',
    Order = 'Order'
}

const ENDPOINT: string = 'api/dialog/webhook'
@Controller(ENDPOINT)
export class DialogWebhookController {

    @Post()
    private async webhook(request: Request, response: Response) {
        // Here we get the product number like #411.
        console.log(`${ENDPOINT}`, {
            body: request.body,
            outputContexts: request.body.queryResult.outputContexts,
        });

        let fulfillmentText: string = 'No action found for this message, please use a synonym';

        const queryResult: any = request.body.queryResult;
        const phoneNumber: string = request.body.session?.split('whatsapp:')[1] || 'NONE';

        if (queryResult) {
            const action: string | undefined = queryResult?.action;

            switch (action) {
                case Action.Product:
                    fulfillmentText = await this.getProductAndStock(queryResult);
                    break;
                case Action.Order:
                    fulfillmentText = await this.processOrder(queryResult, phoneNumber);
                    break;
                default:
                    break;
            }
        }

        return response.json({
            fulfillmentText,
            source: queryResult.intent.displayName
        });
    }

    private async getProductAndStock(queryResult: any): Promise<string> {
        // Here we get the product number like #411.
        console.log(`${ENDPOINT}/product`, { queryResult });

        const productCode: string = queryResult?.parameters?.Product ? queryResult?.parameters?.Product : '';

        let fulfillmentText: string = 'No product found';

        try {
            const product: Product | null = productCode ? await getProduct(parseInt(productCode)) : null;

            if (product) {
                const stock: Stock | null = await getStock(product.code)
                fulfillmentText = `${product?.code || 'NONE'} was found.\n Description: ${product?.description || 'NONE'}, price: ${product?.value}, stock: ${stock?.stock || 0}.`
            }
        } catch (error) {
            console.log('get product error: ', { error });
        }

        return fulfillmentText;
    }

    private async processOrder(queryResult: any, phoneNumber: string): Promise<string> {
        // Here we will create new Order for product like Order n of #411.
        console.log(`${ENDPOINT}/orders`, { queryResult });

        const orderQueries: string = queryResult?.parameters?.Order ? queryResult?.parameters?.Order : '';
        console.log('Order from dialogflow: ', { orderQueries });

        const orderQueryDetected: string[] = orderQueries.split(',')

        let fulfillmentText: string = '';

        if (!orderQueryDetected.length) {
            console.log('No order found on this message', { orderQueries, orderQueryDetected });
            return 'No order was created';
        }

        for (const orderQuery of orderQueryDetected) {
            fulfillmentText += await this.createOrder(orderQuery, phoneNumber);
        }

        return fulfillmentText;
    }

    private async createOrder(orderQuery: string, phoneNumber: string): Promise<string> {
        let fulfillmentText: string = 'No order was created';

        try {
            const [quantity, productCode] = orderQuery.split(' of ');
            console.log('Order parsed: ', { quantity, productCode });
            console.log(productCode?.split('#'));

            const orderProduct: number = parseInt(productCode?.split('#')[1] || '0');
            if (!orderProduct) {
                console.warn('no valid order product', { productCode, orderProduct });
                fulfillmentText = 'No product code found, please try with an other product number'
                return fulfillmentText;
            }

            const orderQuantity: number = parseInt(quantity || '1');
            const product: Product | null = await getProduct(orderProduct);
            if (!product) {
                console.warn('no valid product', { orderQuantity, product });
                fulfillmentText = 'No product found, please try with an other product number.'
                return fulfillmentText;
            }

            const stock: Stock | null = await getStock(product.code);
            if (!stock?.stock || stock.stock < orderQuantity) {
                console.warn('no product available', { stock });
                fulfillmentText = 'No product on stock, please try with an other product number.'
                return fulfillmentText;
            }

            const newOrder: Order = {
                ticketId: uuidv4(),
                productId: product.code,
                quantity: orderQuantity,
                description: JSON.stringify(orderQuery),
                netPrice: product.value,
                phone: phoneNumber
            } as Order;
            const order: Order | undefined | null = await createOrder(newOrder);
            if (order) {
                await updateStock(stock.code, stock.stock - orderQuantity)
                fulfillmentText = `New Order was created ticket: ${order?.ticketId || 'NONE'}.\n Description: ${order?.description || 'NONE'}.`
            }
        } catch (error) {
            console.log('get product error: ', { error });
        }

        return fulfillmentText;
    }

}