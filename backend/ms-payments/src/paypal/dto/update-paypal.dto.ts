import { PartialType } from '@nestjs/mapped-types';
import { CreatePaypalDto } from './create-paypal.dto';

export class UpdatePaypalDto extends PartialType(CreatePaypalDto) {}
