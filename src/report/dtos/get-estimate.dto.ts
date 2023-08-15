import { IsLatitude, IsLongitude, IsNumber, IsOptional, Max, Min } from "class-validator";
import { Transform } from "class-transformer";

export class GetEstimateDto {
  @IsOptional()
  brand: string

  @IsOptional()
  model: string

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  @Min(1930)
  @Max(2023)
  year: number

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number

  // @Transform(({ value }) => parseFloat(value))
  @IsOptional()
  @IsLatitude()
  lat: string

  // @Transform(({ value }) => parseFloat(value))
  @IsOptional()
  @IsLongitude()
  lng: string

  @IsOptional()
  is_approve: boolean
}