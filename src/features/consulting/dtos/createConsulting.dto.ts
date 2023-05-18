import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

import AvailabilityDto from "./availability.dto";


export default class ConsultantDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString({ each: true })
  areasOfExpertise: string[];

  @IsNotEmpty()
  @IsString({ each: true })
  spokenLanguages: string[];

  @IsString()
  bio: string;

  @IsNotEmpty()
  availability: AvailabilityDto[];

  @IsBoolean()
  isBanned: boolean;
}