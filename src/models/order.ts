import { Schema, model, Document } from 'mongoose';

export interface Order extends Document {
    ticketId: number
    productId: number
    quantity: number
    description: string
    netPrice: number
    phone: string
}

const OrderSchema = new Schema<Order>({
    ticketId: { type: Number },
    productId: { type: Number },
    description: { type: String },
    quantity: { type: Number },
    netPrice: { type: Number },
    phone: { type: String },
});

export const OrderModel = model<Order>('Order', OrderSchema);
