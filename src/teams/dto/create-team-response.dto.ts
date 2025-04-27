import { StandardResponse } from '../../common/entities/StandardResponse';
import { TeamModel } from '../entities/team.entity';

export class CreateTeamResponseDto extends StandardResponse<TeamModel> {}
