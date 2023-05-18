import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

import AvailabilityDto from "./availability.dto";


export default class UpdateConsultantDto {
  @IsNotEmpty()
  @IsString({ each: true })
  areasOfExpertise: string[];

  @IsNotEmpty()
  @IsString({ each: true })
  spokenLanguages: string[];

  @IsString()
  bio: string;

  @IsBoolean()
  isBanned: boolean;
}