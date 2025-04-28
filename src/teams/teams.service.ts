import { Injectable, NotFoundException } from '@nestjs/common';
import { TeamModel } from './entities/team.entity';
import { CreateTeamRequestDto } from './dto/create-team-request.dto';
import { UpdateTeamRequestDto } from './dto/update-team-request.dto';
import crypto from 'node:crypto';
import { GetTeamRequestDto } from './dto/get-team-request.dto';
import { UpdateTeamResponseDto } from './dto/update-team-response.dto';
import { CreateTeamResponseDto } from './dto/create-team-response.dto';
import { GetTeamResponseDto } from './dto/get-team-response.dto';
import { GetTeamsResponseDto } from './dto/get-teams-response.dto';
import { StandardResponse } from '../common/entities/StandardResponse';

@Injectable()
export class TeamsService {
  private teams: TeamModel[] = [];

  findAll(): GetTeamsResponseDto {
    return {
      status: 200,
      message: 'Success',
      payload: this.teams,
    };
  }

  findOne({ id }: GetTeamRequestDto): GetTeamResponseDto {
    const team = this.teams.find((t) => t.id === id);
    if (!team) {
      throw new NotFoundException(`Team ${id} not found`);
    }
    return { status: 200, message: 'Success', payload: team };
  }

  create(createTeamDto: CreateTeamRequestDto): CreateTeamResponseDto {
    const team: TeamModel = { id: crypto.randomUUID(), ...createTeamDto };
    this.teams.push(team);
    return { status: 200, message: 'Success', payload: team };
  }

  update(id: string, rest: UpdateTeamRequestDto): UpdateTeamResponseDto {
    const team = this.findOne({ id });
    // update object in memory.
    Object.assign(team, rest);
    return { status: 200, message: 'Success', payload: team.payload };
  }

  remove(id: string): StandardResponse {
    const index = this.teams.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Team ${id} not found`);
    }
    this.teams.splice(index, 1);
    return {
      status: 204,
      message: 'Success',
    };
  }
}
