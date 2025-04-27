import { IsIn } from 'class-validator';

export class StandardRequest {
  @IsIn(['ios', 'android', 'web'])
  source?: 'ios' | 'android' | 'web';
}
