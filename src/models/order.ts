import { Schema, model, Document } from 'mongoose';

export interface Order extends Document {
    ticketId: string
    productId: number
    quantity: number
    description: string
    netPrice: number
    phone?: string
    createdAt: Date
}

const OrderSchema = new Schema<Order>(
    {
        ticketId: { type: String },
        productId: { type: Number },
        description: { type: String },
        quantity: { type: Number },
        netPrice: { type: Number },
        phone: { type: String, required: false },
        createdAt: { type: Date }
    },
    { timestamps: { createdAt: 'created_at' } }
);

export const OrderModel = model<Order>('Order', OrderSchema);
