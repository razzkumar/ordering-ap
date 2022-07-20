import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {

  constructor(private readonly orderRepository: OrdersRepository) { }

  async createOrder(order: CreateOrderRequest) {
    return this.orderRepository.create(order);
  }

  async getOrders() {
    return this.orderRepository.find({});
  }
}
