import { StandardResponse } from '../../common/entities/StandardResponse';
import { TeamModel } from '../entities/team.entity';

export class GetTeamResponseDto extends StandardResponse<TeamModel> {}
