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
import { PermissionDecorator } from '../permissions/permissions.decorator';
import { GetTeamRequestDto } from './dto/get-team-request.dto';
import { GetTeamsResponseDto } from './dto/get-teams-response.dto';
import { GetTeamResponseDto } from './dto/get-team-response.dto';
import { CreateTeamResponseDto } from './dto/create-team-response.dto';
import { UpdateTeamResponseDto } from './dto/update-team-response.dto';
import { StandardResponse } from '../common/entities/StandardResponse';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  @PermissionDecorator({ resource: 'Team', action: 'read' })
  findAll(): GetTeamsResponseDto {
    return this.teamsService.findAll();
  }

  @Get(':id')
  @PermissionDecorator({ resource: 'Team', action: 'read' })
  findOne(@Param() req: GetTeamRequestDto): GetTeamResponseDto {
    return this.teamsService.findOne(req);
  }

  @Post()
  @PermissionDecorator({ resource: 'Team', action: 'create' })
  create(@Body() createTeamDto: CreateTeamRequestDto): CreateTeamResponseDto {
    return this.teamsService.create(createTeamDto);
  }

  @Patch(':id')
  @PermissionDecorator({ resource: 'Team', action: 'update' })
  update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamRequestDto,
  ): UpdateTeamResponseDto {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  @PermissionDecorator({ resource: 'Team', action: 'delete' })
  remove(@Param('id') id: string): StandardResponse {
    return this.teamsService.remove(id);
  }
}
