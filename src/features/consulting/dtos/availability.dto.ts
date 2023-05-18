import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';



export default class AvailabilityDto {
    // Define properties of AvailabilitySchema here
    @IsNotEmpty()
    day: string;
  
    @IsNotEmpty()
    startTime: string;
  
    @IsNotEmpty()
    endTime: string;
}