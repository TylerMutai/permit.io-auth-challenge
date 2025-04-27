import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamRequestDto } from './dto/create-team-request.dto';
import { UpdateTeamRequestDto } from './dto/update-team-request.dto';
import { Permission } from '../permit/permit.guard';
import { TeamModel } from './entities/team.entity';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  @Permission('Team', 'read')
  findAll(): TeamModel[] {
    return this.teamsService.findAll();
  }

  @Get(':id')
  @Permission('Team', 'read', 'id')
  findOne(@Param('id') id: string): TeamModel {
    return this.teamsService.findOne(id);
  }

  @Post()
  @Permission('Team', 'create')
  create(@Body() createTeamDto: CreateTeamRequestDto): TeamModel {
    return this.teamsService.create(createTeamDto);
  }

  @Patch(':id')
  @Permission('Team', 'update', 'id')
  update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamRequestDto,
  ): TeamModel {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  @Permission('Team', 'delete', 'id')
  remove(@Param('id') id: string): void {
    return this.teamsService.remove(id);
  }
}
