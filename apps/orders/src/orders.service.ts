import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BILLING_SERVICE } from './constants/services';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
    private readonly orderRepository: OrdersRepository,
  ) { }

  async createOrder(order: CreateOrderRequest, auth: string) {

    // DB transaction only if success
    const session = await this.orderRepository.startTransaction();
    try {
      const newOrder = await this.orderRepository.create(order, { session });

      await lastValueFrom(
        this.billingClient.emit('order_created', {
          order,
          Authentication: auth
        })
      )

      await session.commitTransaction();
      return newOrder;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }

  async getOrders() {
    return this.orderRepository.find({});
  }
}
