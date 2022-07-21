import { JwtAuthGuard } from '@app/common';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrdersService } from './orders.service';

@Controller({
  path: 'orders',
})
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  createOrder(@Body() orderRequest: CreateOrderRequest, @Req() req: any) {
    return this.ordersService.createOrder(orderRequest, req.cookies?.Authentication);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getOrders(@Req() req: any) {
    console.log(req.user);
    return this.ordersService.getOrders();
  }

}
