import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class CreateReportDto {
  @IsNotEmpty()
  brand: string

  @IsNotEmpty()
  model: string

  @IsNotEmpty()
  @IsNumber()
  @Min(1930)
  @Max(2023)
  year: number

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number

  @IsNotEmpty()
  @Min(0)
  @Max(1000000)
  price: number

  @IsNotEmpty()
  @IsLatitude()
  lat: string

  @IsNotEmpty()
  @IsLongitude()
  lng: string
}