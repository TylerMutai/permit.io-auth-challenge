import { IsIn, IsOptional } from 'class-validator';

export class StandardRequest {
  @IsOptional()
  @IsIn(['ios', 'android', 'web'], { always: false })
  source?: 'ios' | 'android' | 'web';
}
