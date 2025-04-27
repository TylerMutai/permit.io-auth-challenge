import { Injectable, NotFoundException } from '@nestjs/common';
import { Team } from './entities/team.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  private teams: Team[] = [];

  findAll(): Team[] {
    return this.teams;
  }

  findOne(id: string): Team {
    const team = this.teams.find((t) => t.id === id);
    if (!team) {
      throw new NotFoundException(`Team ${id} not found`);
    }
    return team;
  }

  create(createTeamDto: CreateTeamDto): Team {
    const team: Team = { id: uuidv4(), ...createTeamDto };
    this.teams.push(team);
    return team;
  }

  update(id: string, updateTeamDto: UpdateTeamDto): Team {
    const team = this.findOne(id);
    Object.assign(team, updateTeamDto);
    return team;
  }

  remove(id: string): void {
    const index = this.teams.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Team ${id} not found`);
    }
    this.teams.splice(index, 1);
  }
}