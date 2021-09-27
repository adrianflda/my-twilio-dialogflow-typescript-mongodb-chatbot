import { Schema, model, Document } from 'mongoose';

export interface Stock extends Document {
    code: number
    description: string
    rest: number
    weigh: number
    stock: number
    date: string
}

export enum SpanishStock {
    codart = "code",
    descrip = "description",
    resto = "rest",
    peso = "weigh",
    stock = "stock",
    fecha = "date",
}

const StockSchema = new Schema<Stock>({
    code: { type: Number },
    description: { type: String },
    rest: { type: Number },
    weigh: { type: Number },
    stock: { type: Number },
    date: { type: String }
});

export const StockModel = model<Stock>('Stock', StockSchema);