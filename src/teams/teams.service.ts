import { Injectable, NotFoundException } from '@nestjs/common';
import { TeamModel } from './entities/team.entity';
import { CreateTeamRequestDto } from './dto/create-team-request.dto';
import { UpdateTeamRequestDto } from './dto/update-team-request.dto';
import crypto from 'node:crypto';
import { GetTeamRequestDto } from './dto/get-team-request.dto';

@Injectable()
export class TeamsService {
  private teams: TeamModel[] = [];

  findAll(): TeamModel[] {
    return this.teams;
  }

  findOne({ id }: GetTeamRequestDto): TeamModel {
    const team = this.teams.find((t) => t.id === id);
    if (!team) {
      throw new NotFoundException(`Team ${id} not found`);
    }
    return team;
  }

  create(createTeamDto: CreateTeamRequestDto): TeamModel {
    const team: TeamModel = { id: crypto.randomUUID(), ...createTeamDto };
    this.teams.push(team);
    return team;
  }

  update({ id, ...rest }: UpdateTeamRequestDto): TeamModel {
    const team = this.findOne({ id });
    // update object in memory.
    Object.assign(team, rest);
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
