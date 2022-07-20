import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';

@Controller({
  path: 'orders',
})
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  createOrder(@Body() req: CreateOrderRequest) {
    return this.ordersService.createOrder(req);
  }

  @Get()
  getOrders() {
    return this.ordersService.getOrders();
  }

}
