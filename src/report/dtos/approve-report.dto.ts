import { IsBoolean, IsNotEmpty } from "class-validator";

export class ApproveReportDto {
  @IsNotEmpty()
  @IsBoolean()
  is_approve: boolean
}