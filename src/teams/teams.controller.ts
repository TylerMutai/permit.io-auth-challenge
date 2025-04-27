import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamRequestDto } from './dto/create-team-request.dto';
import { UpdateTeamRequestDto } from './dto/update-team-request.dto';
import { TeamModel } from './entities/team.entity';
import { PermissionDecorator } from '../permissions/permissions.decorator';
import { GetTeamRequestDto } from './dto/get-team-request.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  @PermissionDecorator({ resource: 'Team', action: 'read' })
  findAll(): TeamModel[] {
    return this.teamsService.findAll();
  }

  @Get(':id')
  @PermissionDecorator({ resource: 'Team', action: 'read' })
  findOne(@Param() req: GetTeamRequestDto): TeamModel {
    return this.teamsService.findOne(req);
  }

  @Post()
  @PermissionDecorator({ resource: 'Team', action: 'create' })
  create(@Body() createTeamDto: CreateTeamRequestDto): TeamModel {
    return this.teamsService.create(createTeamDto);
  }

  @Patch(':id')
  @PermissionDecorator({ resource: 'Team', action: 'update' })
  update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamRequestDto,
  ): TeamModel {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  @PermissionDecorator({ resource: 'Team', action: 'delete' })
  remove(@Param('id') id: string): void {
    return this.teamsService.remove(id);
  }
}
