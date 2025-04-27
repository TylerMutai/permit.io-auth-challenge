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
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Permission } from '../permit/permit.guard';
import { Team } from './entities/team.entity';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  @Permission('Team', 'read')
  findAll(): Team[] {
    return this.teamsService.findAll();
  }

  @Get(':id')
  @Permission('Team', 'read', 'id')
  findOne(@Param('id') id: string): Team {
    return this.teamsService.findOne(id);
  }

  @Post()
  @Permission('Team', 'create')
  create(@Body() createTeamDto: CreateTeamDto): Team {
    return this.teamsService.create(createTeamDto);
  }

  @Patch(':id')
  @Permission('Team', 'update', 'id')
  update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Team {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  @Permission('Team', 'delete', 'id')
  remove(@Param('id') id: string): void {
    return this.teamsService.remove(id);
  }
}