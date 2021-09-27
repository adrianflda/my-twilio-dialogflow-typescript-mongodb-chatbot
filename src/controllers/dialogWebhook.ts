import { Request, Response } from "express";
import { Controller, Post } from "@overnightjs/core";
import { getProduct, getProducts } from "../services";
import { Product } from "src/models";

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
        console.log(`${ENDPOINT}`, { body: request.body });
        
        let fulfillmentText: string = '';

        const queryResult: any = request.body.queryResult;

        if (queryResult){
            const action: string | undefined = queryResult?.action;
           
            switch (action) {
                case Action.Product:
                    fulfillmentText = await this.getProduct(queryResult);
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

    private async getProduct(queryResult: any) {
        // Here we get the product number like #411.
        console.log(`${ENDPOINT}/product`, { queryResult });

        const productCode: string = queryResult?.parameters?.Product ? queryResult?.parameters?.Product : '';

        const product: Product | null = productCode ? await getProduct(parseInt(productCode)) : null;

        const fulfillmentText = `${product?.code || 'NONE'} was found.\n Description: ${product?.description || 'NONE'}.`

        return fulfillmentText;
    }

}