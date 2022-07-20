import { IsNotEmpty, IsPhoneNumber, IsPositive, IsString } from "class-validator";

export class CreateOrderRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsPhoneNumber('NP')
  phoneNumber: string;

  @IsPositive()
  price: number;
}
