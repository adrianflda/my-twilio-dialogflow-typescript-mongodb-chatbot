
import { Schema, model, Document } from 'mongoose';

export interface Product extends Document {
    code: number;
    unit: number;
    description: string;
    value: number;
    rest: number;
    unipaq: number;
    unidmin: number;
    weigh: number;
    codprecan: string;
    codpreres: string;
    factor: number;
}

export enum SpanishProduct {
    codart = "code",
    descrip = "description",
    resto = "rest",
    peso = "weigh",
    stock = "stock",
    fecha = "date",
    uniart = "unit",
    valor = "value",
    unipaq = "unipaq",
    unidmin = "unidmin",
    codprecan = "codprecan",
    codpreres = "codpreres",
    factor = "factor"
}

const ProductSchema = new Schema<Product>({
    code: { type: Number },
    unit: { type: Number },
    description: { type: String },
    value: { type: Number },
    rest: { type: Number },
    unipaq: { type: Number },
    unidmin: { type: Number },
    weigh: { type: Number },
    codprecan: { type: String },
    codpreres: { type: String },
    factor: { type: Number },
});

export const ProductModel = model<Product>('Product', ProductSchema);
