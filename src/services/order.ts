import { Order, OrderModel } from "../models";

export const getOrder = async (orderCode: string): Promise<Order | null> => {
    const order: Order | null = await OrderModel.findOne({ticketId: orderCode});
    return order;
}

export const getOrders = async (): Promise<Order[] | null> => {
    const orders: Order[] | null = await OrderModel.find({});
    return orders;
}

export const createOrder = async (order: Order): Promise<Order | undefined> => {
    try {
        const newOrder: any = await OrderModel.create(order);
        return newOrder;
    } catch (error) {
        console.log('create order error: ', error);
    }
}