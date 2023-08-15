import { Expose, Transform } from "class-transformer";

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  brand: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  mileage: number;

  @Expose()
  price: number;

  @Expose()
  lat: string;

  @Expose()
  lng: string;

  @Expose()
  is_approve: boolean;

  @Transform(({obj}) => obj.user.id)
  @Expose()
  user_id: number
}